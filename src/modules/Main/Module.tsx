'use client';
import { useState } from 'react';
import { ChooseBlock } from './components/ChooseBlock';
import { InputsBlock } from './components/InputsBlock';
import { Limits } from './components/Limits';
import { Modal } from './components/Modal';
import { SettingsButtons } from './components/SettingsButtons';
import { useGenerateVideo } from './hooks/useGenerateVideo';
import { useVideo } from './hooks/useVideo';

export type Prompt = {
  prompt: string;
  first_frame_image: null | string | File | Blob | Buffer;
  prompt_optimizer: null | boolean;
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
  const [createPrompt, setCreatePrompt] = useState<Prompt>({
    prompt: '',
    first_frame_image: null,
    prompt_optimizer: false,
  });

  const setValuePrompt = (value: Partial<Prompt>) => {
    setCreatePrompt((prev) => ({ ...prev, ...value }));
  };

  const { data, mutate } = useGenerateVideo(createPrompt);

  const { data: Video, isSuccess, isLoading, isError } = useVideo(data?.id || '', data?.video || '', !!data);
  if (isSuccess) console.log('Video data', Video);

  return (
    <div className='relative h-[calc(100%-113px)] w-full px-4 py-5'>
      <Limits tokenValue={2} />
      <div className='mt-[14px] flex h-72 w-full items-center justify-center rounded-xl border border-uiLime/30 bg-uiDarkGray outline-none'>
        {Video && Video.isVideo ? (
          <video
            src={Video.video_url}
            controls
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
        <ChooseBlock visible={isSuccess && Video.isVideo} />
        <SettingsButtons isDownload={isSuccess && Video.isVideo} openModal={setIsOpenModal} />
        <InputsBlock setterPrompt={setValuePrompt} submitPrompt={mutate} value={createPrompt.prompt} />
      </div>

      <Modal visible={isOpenModal} setterPrompt={setValuePrompt} closeModal={setIsOpenModal} />
    </div>
  );
};
