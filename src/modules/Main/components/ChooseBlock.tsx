import { ChooseIcon } from '@public/tsx/ChooseIcon';
import { Dispatch, SetStateAction } from 'react';

export const ChooseBlock = ({
  visible,
  isOpenModal,
  setIsOpenModal,
}: {
  visible: boolean;
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) => (
  <>
    {visible && !isOpenModal ? (
      <div className='flex h-[72px] w-full flex-row items-center justify-between rounded-xl bg-uiDarkGray px-5 py-4'>
        <p className='w-[135px]'>Choose the frame to continue from</p>
        <button
          className='flex h-10 w-[112px] items-center justify-center rounded-lg border border-uiLime bg-[#415D46]'
          onClick={() => setIsOpenModal((prev) => !prev)}
        >
          <ChooseIcon width='38' height='24' stroke='#42CF3B' />
        </button>
      </div>
    ) : (
      visible &&
      isOpenModal && (
        <div className='flex h-[72px] w-full flex-row items-center justify-between rounded-xl bg-uiDarkGray px-5 py-4'>
          <p className='w-[135px]'>Rewind the video</p>
          <button
            className='flex h-10 w-[112px] items-center justify-center rounded-lg border border-[#CF3B3B] bg-[#5D4141]'
            onClick={() => setIsOpenModal((prev) => !prev)}
          >
            <ChooseIcon width='38' height='24' stroke='#CF3B3B' />
          </button>
        </div>
      )
    )}
  </>
);
