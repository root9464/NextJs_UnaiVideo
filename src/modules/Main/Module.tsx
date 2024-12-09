'use client';
import { axiosFrontend } from '@/shared/utils/axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ChooseBlock } from './components/ChooseBlock';
import { InputsBlock } from './components/InputsBlock';
import { Limits } from './components/Limits';
import { Modal } from './components/Modal';
import { SettingsButtons } from './components/SettingsButtons';

export type Prompt = {
  prompt: string;
  first_frame_image: null | string | File | Blob | Buffer;
  prompt_optimizer: null | boolean;
};

export type SetValuePromptFunction = (value: Partial<Prompt>) => void;

type ResponseGenerateVideo = {
  id: string;
  status: 'succeeded' | 'processing' | 'failed';
  prompt: string;
  error: string;
  video: string;
};

type BacketFileResponse = {
  success: boolean;
  data: {
    id: string;
    username: string;
    file_name: string;
    createdAt: Date;
  };
};
const TIMER_BLYAT = 1000 * 60;

export const MainPageFlow = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [createPrompt, setCreatePrompt] = useState<Prompt>({
    prompt: '',
    first_frame_image: null,
    prompt_optimizer: false,
  });

  const [startGenerate, setStartGenerate] = useState('');

  const setValuePrompt = (value: Partial<Prompt>) => {
    setCreatePrompt((prev) => ({ ...prev, ...value }));
  };

  const generateVideo = async () => {
    const response = await axiosFrontend.post<ResponseGenerateVideo>('/generate', createPrompt);
    if (response.status !== 200) return console.error('Oops, что-то пошло не так');
    console.log(response.data);
    setStartGenerate(response.data.id);
  };

  const checkStatusVideo = () => {
    console.log('checkStatusVideo');
    return axiosFrontend.get<ResponseGenerateVideo>(`/generate/?id=${startGenerate}`);
  };

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ['video_data'],
    queryFn: checkStatusVideo,
    enabled: startGenerate !== '',
    select: (data) => data.data,
    refetchInterval: 1000 * 60,
  });

  const isDataSuccess = data && startGenerate !== '' ? data.status === 'succeeded' : false;

  const querryClient = useQueryClient();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data && data.status === 'succeeded') {
        console.log('clear video');
        querryClient.removeQueries({ queryKey: ['video_data'] });
        setStartGenerate('');
      }
    }, TIMER_BLYAT);

    return () => clearTimeout(timeout);
  }, [data, isSuccess, querryClient]);

  const saveVideo = () => {
    return axiosFrontend.post<BacketFileResponse>('/generate/backet', {
      username: 'demo1',
      video_url: data!.video,
    });
  };

  useQuery({
    queryKey: ['video_data_save'],
    queryFn: saveVideo,
    enabled: isDataSuccess,
    select: (data) => data.data,
  });

  return (
    <div className='relative h-[calc(100%-113px)] w-full px-4 py-5'>
      <Limits tokenValue={2} />
      <div className='mt-[14px] flex h-72 w-full items-center justify-center rounded-xl border border-uiLime/30 bg-uiDarkGray outline-none'>
        {isSuccess && isDataSuccess && (
          <video src={data.video} controls className='h-full w-full rounded-xl border border-uiLime/30 bg-lime-400 object-cover outline-none' />
        )}
        {isLoading || (data?.status === 'processing' && <div className='text-2xl font-bold text-uiPrimaryLightGray'>Loading...</div>)}
        {isError && <div className='text-2xl font-bold text-uiPrimaryLightGray'>{`Error generation video: ${error.message}`}</div>}
        {!data && <div className='text-2xl font-bold text-uiPrimaryLightGray'>Your video will appear here</div>}
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
