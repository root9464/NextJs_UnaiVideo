'use client';
import { User } from '@/shared/types/types';
import { useQueryClient } from '@tanstack/react-query';
import { retrieveLaunchParams } from '@telegram-apps/bridge';
import { SyntheticEvent, useState } from 'react';
import { ChooseBlock } from './components/ChooseBlock';
import { InputsBlock } from './components/InputsBlock';
import { Limits } from './components/Limits';
import { Modal } from './components/Modal';
import { useGenerateVideo } from './hooks/useGenerateVideo';
import { useVideo } from './hooks/useVideo';

export type Prompt = {
  prompt: string;
  first_frame_image: null | string | File | Blob | Buffer;
  prompt_optimizer: boolean;
};

export type SetValuePromptFunction = (value: Partial<Prompt>) => void;

export type ResponseGenerateVideo = {
  id: string;
  status: 'start' | 'succeeded' | 'processing' | 'failed';
  prompt: string;
  error: string;
  video: string;
};

export const MainPageFlow = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isChooseModal, setIsChooseModal] = useState(false);

  const queryClient = useQueryClient();
  const { initData } = retrieveLaunchParams();
  const user: User | undefined = queryClient.getQueryData(['user' + initData?.user?.id]);

  const [createPrompt, setCreatePrompt] = useState<Prompt>({
    prompt: '',
    first_frame_image: '',
    prompt_optimizer: false,
  });

  const [timeStartVideo, setTimeStartVideo] = useState(0);

  const setValuePrompt = (value: Partial<Prompt>) => {
    setCreatePrompt((prev) => ({ ...prev, ...value }));
  };

  const { data, mutate, isSuccess: isMutateSuccess } = useGenerateVideo();

  // костыль но рабочий
  if (isMutateSuccess && data) {
    queryClient.setQueryData(['video_generate'], data);
  }

  const videoGenerateData: ResponseGenerateVideo | undefined = queryClient.getQueryData(['video_generate']);

  const {
    data: Video,
    isSuccess,
    isLoading,
    isError,
  } = useVideo(
    videoGenerateData?.id ?? '',
    videoGenerateData?.video ?? '',
    !!videoGenerateData && videoGenerateData.status !== 'succeeded', //сомнительный вариант
    user?.username ?? '',
    isChooseModal ? timeStartVideo : undefined,
  );

  const videoTimeTick = (event: SyntheticEvent<HTMLVideoElement, Event>): void => {
    const currentTime: number = Math.floor(event.currentTarget.currentTime);
    console.log(`Current minute: ${currentTime}`);
    if (isChooseModal) setTimeStartVideo(currentTime);
  };

  if (isSuccess && Video.status === 'succeeded') {
    queryClient.refetchQueries({ queryKey: ['user' + initData?.user?.id] });
  }

  return (
    <div className='relative h-[calc(100%-113px)] w-full px-5 py-4'>
      <Limits tokenValue={user?.limits ?? 0} />
      <div className='mt-[14px] flex h-72 w-full items-center justify-center rounded-xl border border-uiLime/30 bg-uiDarkGray outline-none'>
        {Video && Video.isVideo ? (
          <video
            src={Video.video_url}
            controls
            onTimeUpdate={isChooseModal ? videoTimeTick : undefined}
            className='h-full w-full rounded-xl border border-uiLime/30 bg-lime-400 object-cover outline-none'
          />
        ) : isLoading || Video?.status === 'processing' ? (
          <div className='text-2xl font-bold text-uiPrimaryLightGray'>Loading...</div>
        ) : isError ? (
          <div className='text-2xl font-bold text-uiPrimaryLightGray'>Error</div>
        ) : (
          <div className='text-2xl font-bold text-uiPrimaryLightGray'>Your video will appear here</div>
        )}
      </div>

      <div className='absolute bottom-5 left-0 flex h-fit w-full flex-col gap-y-4 px-4'>
        <ChooseBlock visible={isSuccess && Video.isVideo} isOpenModal={isChooseModal} setIsOpenModal={setIsChooseModal} />
        {/* <SettingsButtons isDownload={isSuccess && Video.isVideo} openModal={setIsOpenModal} /> */}
        {isLoading || Video?.status === 'processing' ? (
          <div className='flex h-[40px] w-full flex-row items-center justify-between gap-x-4'>
            <p>Your video generated</p>
          </div>
        ) : (
          <InputsBlock
            setterPrompt={setValuePrompt}
            submitPrompt={() => mutate({ video_id: Video ? Video.id : '', time_start: timeStartVideo, ...createPrompt, user_id: user?.id ?? 0 })}
            value={createPrompt.prompt}
          />
        )}
      </div>

      <Modal visible={isOpenModal} setterPrompt={setValuePrompt} closeModal={setIsOpenModal} />
    </div>
  );
};
