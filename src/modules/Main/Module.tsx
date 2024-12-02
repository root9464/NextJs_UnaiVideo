'use client';
import { useState } from 'react';
import { ChooseBlock } from './components/ChooseBlock';
import { InputsBlock } from './components/InputsBlock';
import { Limits } from './components/Limits';
import { Modal } from './components/Modal';
import { SettingsButtons } from './components/SettingsButtons';

export type Prompt = {
  prompt: string;
  first_frame_image: null | string | File | Blob | Buffer;
  prompt_optimizer: null | boolean;
  watermark: null | boolean;
};

export type SetValuePromptFunction = (value: Partial<Prompt>) => void;

export const MainPageFlow = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [createPrompt, setCreatePrompt] = useState<Prompt>({
    prompt: '',
    first_frame_image: null,
    prompt_optimizer: false,
    watermark: false,
  });

  const setValuePrompt = (value: Partial<typeof setCreatePrompt>) => {
    setCreatePrompt((prev) => ({ ...prev, ...value }));
  };

  return (
    <div className='relative h-[calc(100%-113px)] w-full px-4 py-5'>
      <Limits />
      <div className='mt-[14px] flex h-60 w-full items-center justify-center rounded-xl border border-uiLime/30 bg-uiDarkGray outline-none'>
        <p className='text-base'> Submit a text prompt to create a video</p>
      </div>

      <div className='absolute bottom-5 left-0 flex h-fit w-full flex-col gap-y-4 px-4'>
        <ChooseBlock visible={false} />
        <SettingsButtons isDownload={false} openModal={setIsOpenModal} />
        <InputsBlock setterPrompt={setValuePrompt} />
      </div>

      <Modal visible={isOpenModal} setterPrompt={setValuePrompt} closeModal={setIsOpenModal} />
    </div>
  );
};
