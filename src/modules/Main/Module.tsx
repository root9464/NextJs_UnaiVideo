'use client';
import { axiosFrontend } from '@/shared/utils/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ChooseBlock } from './components/ChooseBlock';
import { InputsBlock } from './components/InputsBlock';
import { Limits } from './components/Limits';
import { Modal } from './components/Modal';
import { SettingsButtons } from './components/SettingsButtons';
import { useCheckVideo } from './hooks/useCheckVIdeo';
import { BacketFileResponse } from './hooks/useSaveVideo';

export type Prompt = {
  prompt: string;
  first_frame_image: null | string | File | Blob | Buffer;
  prompt_optimizer: null | boolean;
};

export type SetValuePromptFunction = (value: Partial<Prompt>) => void;

export type ResponseGenerateVideo = {
  id: string;
  status: 'succeeded' | 'processing' | 'failed';
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

  const queryClient = useQueryClient();

  const setValuePrompt = (value: Partial<Prompt>) => {
    setCreatePrompt((prev) => ({ ...prev, ...value }));
  };

  const generateVideo = async () => {
    // const { data, status } = await axiosFrontend.post<ResponseGenerateVideo>('/generate', createPrompt);
    // if (status !== 200) return console.error('Oops, что-то пошло не так');
    // console.log(data);
    localStorage.setItem('video_id', '83d6g6c5csrg80cknxv9q4njaw');
  };

  const generateVideoData = localStorage.getItem('video_id');

  const { data: RawVideoData, isLoading } = useCheckVideo(generateVideoData ?? '');
  const isDataSuccess = RawVideoData && generateVideoData !== '' ? RawVideoData.status === 'succeeded' : false;
  if (RawVideoData) console.log(`Data isDonwload ${isDataSuccess}`, RawVideoData);

  const saveVideo = (videoUrl: string) => {
    console.log('saveVideo', videoUrl);
    return axiosFrontend.post<BacketFileResponse>('/generate/backet', {
      username: 'demo1',
      video_url: videoUrl,
    });
  };
  const { data: Video, isSuccess } = useQuery({
    queryKey: ['video'],
    queryFn: () => saveVideo(RawVideoData!.video),
    enabled: isDataSuccess,
    select: (data) => data.data,
  });

  return (
    <div className='relative h-[calc(100%-113px)] w-full px-4 py-5'>
      <Limits tokenValue={2} />
      <div className='mt-[14px] flex h-72 w-full items-center justify-center rounded-xl border border-uiLime/30 bg-uiDarkGray outline-none'>
        {Video && isSuccess ? (
          <video src={Video.data} controls className='h-full w-full rounded-xl border border-uiLime/30 bg-lime-400 object-cover outline-none' />
        ) : isLoading || RawVideoData?.status === 'processing' ? (
          <div className='text-2xl font-bold text-uiPrimaryLightGray'>Loading...</div>
        ) : (
          <div className='text-2xl font-bold text-uiPrimaryLightGray'>Your video will appear here</div>
        )}
      </div>

      <div className='absolute bottom-5 left-0 flex h-fit w-full flex-col gap-y-4 px-4'>
        <ChooseBlock visible={isDataSuccess} />
        <SettingsButtons isDownload={isDataSuccess} openModal={setIsOpenModal} />
        <InputsBlock setterPrompt={setValuePrompt} submitPrompt={generateVideo} value={createPrompt.prompt} />
      </div>

      <Modal visible={isOpenModal} setterPrompt={setValuePrompt} closeModal={setIsOpenModal} />
    </div>
  );
};
