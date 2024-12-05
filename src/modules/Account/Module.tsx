import { SwipeCarousel } from '@/components/Carousel';
import { TIERS_DATA } from './constants/const';

export const AccountPageFlow = () => {
  return (
    <div className='relative h-[calc(100%-113px)] w-full px-4 py-5'>
      <WelcomeText />

      <div className='grid h-fit w-full grid-cols-2 rounded-xl bg-uiDarkGray p-5'>
        <div className='flex h-full w-full flex-col gap-y-2'>
          <p className='text-base font-semibold'>UNAI Balance:</p>
          <p className='text-xl font-semibold'>
            <span className='text-uiLime'>0.00</span> UNAI
          </p>
        </div>
        <div className='rounded-[6px] bg-uiPrimaryLightGray p-4 text-center'>
          <p className='text-xl font-semibold'>NO TIER</p>
        </div>
      </div>

      <SwipeCarousel blockContent={TIERS_DATA} />
    </div>
  );
};

const WelcomeText = () => {
  return (
    <div className='h-fit w-full p-5 text-center'>
      <h2 className='text-xl font-semibold'>Welcome to UNAI video!</h2>
      <p className='text-base'>Connect your wallet to log in.</p>
    </div>
  );
};
