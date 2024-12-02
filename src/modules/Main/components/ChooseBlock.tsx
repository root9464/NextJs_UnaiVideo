import { ChooseIcon } from '@public/tsx/ChooseIcon';

export const ChooseBlock = ({ visible }: { visible: boolean }) => (
  <>
    {visible && (
      <div className='flex h-[72px] w-full flex-row items-center justify-between rounded-xl bg-uiDarkGray px-5 py-4'>
        <p className='w-[135px]'>Choose the frame to continue from</p>
        <button className='flex h-10 w-[112px] items-center justify-center rounded-lg border border-uiLime bg-[#415D46]'>
          <ChooseIcon width='38' height='24' stroke='#42CF3B' />
        </button>
      </div>
    )}
  </>
);
