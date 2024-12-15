import { User } from '@/shared/types/types';
import { retrieveLaunchParams } from '@modules/Account/Module';
import { ArrowUoIcon } from '@public/tsx/ArrowUoIcon';
import { useAppKitAccount } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { SetValuePromptFunction } from '../Module';
import { ImageINput } from '../widgets/ImageInput';

type InputsBlockProps = {
  value: string;
  setterPrompt: SetValuePromptFunction;
  submitPrompt: () => void;
};

export const InputsBlock = ({ setterPrompt, submitPrompt, value }: InputsBlockProps) => {
  const queryClient = useQueryClient();
  const { initData } = retrieveLaunchParams();

  const user: User | undefined = queryClient.getQueryData(['user' + initData?.user?.id]);
  const { address } = useAppKitAccount();

  return (
    <div className='flex h-[40px] w-full flex-row items-center justify-between gap-x-4'>
      {!!user && user.limits > 0 ? (
        <>
          <ImageINput setterPrompt={setterPrompt} />
          <input
            type='text'
            placeholder='Submit a text prompt'
            className='h-full flex-grow rounded-[4px] bg-white px-4 py-2 text-black outline-none'
            onChange={(e) => setterPrompt({ prompt: e.target.value })}
            value={value}
          />
          <button
            onClick={() => {
              submitPrompt();
              setterPrompt({ prompt: '', first_frame_image: null, prompt_optimizer: false });
            }}
            className='flex h-full w-[40px] items-center justify-center rounded-[4px] bg-white'
          >
            <ArrowUoIcon fill='black' />
          </button>
        </>
      ) : !!(initData && initData.user) && !address ? (
        <div className='flex h-14 w-full items-center justify-center rounded-lg border border-uiLime bg-transparent'>
          <Link href='/account' className='text-base text-uiLime'>
            You not connect wallet
          </Link>
        </div>
      ) : !!user && user.limits === 0 ? (
        <div className='flex h-14 w-full items-center justify-center rounded-lg border border-[#CF3B3B] bg-[#5D4141]'>
          <p className='text-base font-semibold text-[#CF3B3B]'>You have no tokens left</p>
        </div>
      ) : (
        <div className='flex h-14 w-full items-center justify-center rounded-lg border border-uiLime bg-transparent'>
          <Link href='/account' className='text-base text-uiLime'>
            You not connect wallet
          </Link>
        </div>
      )}
    </div>
  );
};
