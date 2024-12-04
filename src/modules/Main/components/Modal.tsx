'use client';
import { Switch } from '@/components/ui/switch';
import { CrossIcon } from '@public/tsx/CrossIcon';
import { AnimatePresence, motion } from 'motion/react';
import { Dispatch, SetStateAction } from 'react';
import { SetValuePromptFunction } from '../Module';

type ModalProps = {
  visible: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  setterPrompt: SetValuePromptFunction;
};

export const Modal = ({ visible, closeModal, setterPrompt }: ModalProps) => {
  const close = () => closeModal(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className='absolute bottom-0 left-0 h-3/4 w-full rounded-t-[18px] bg-uiDarkGray px-6 py-5'
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <button className='absolute right-6 top-5' onClick={close}>
            <CrossIcon width='22px' height='22px' stroke='white' />
          </button>

          <div className='h-max w-full'>
            <h2 className='text-center text-xl font-semibold'>Settings</h2>
            <div className='mt-4 flex h-full w-full flex-col gap-y-5 text-base font-semibold'>
              <div className='h-px w-full bg-uiPrimaryLightGray' />
              <div className='flex h-fit w-full flex-row items-center justify-between'>
                <p>Prompt optimizer</p>
                <Switch
                  className='h-6 w-10 data-[state=checked]:bg-uiLime'
                  onCheckedChange={(check) => setterPrompt({ prompt_optimizer: check })}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
