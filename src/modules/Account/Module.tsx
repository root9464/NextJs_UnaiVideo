import { SwipeCarousel } from '@/components/Carousel';
import { WalletButton } from '@/components/WalletButton';
import { TiersBlock } from './components/TIers';
import { TIERS_DATA } from './constants/const';

export const AccountPageFlow = () => {
  return (
    <div className='relative h-[calc(100%-113px)] w-full overflow-y-scroll px-5 py-4'>
      <WelcomeText />

      <TiersBlock tier={'Legend'} unaiTokens={1_000_000} />

      <SwipeCarousel blockContent={TIERS_DATA} />

      <div className='mt-5 flex h-max w-full flex-col gap-[14px] rounded-xl bg-uiDarkGray p-5'>
        <h3 className='text-base'>Connect your wallet and buy $UNAI to unleash full power of UNAI VIDEO!</h3>
        <div className='flex h-fit w-full flex-row gap-[14px]'>
          <WalletButton>Connect Wallet</WalletButton>
          <button className='h-fit w-full rounded-[8px] border border-uiLime bg-transparent px-3 py-[14px] text-sm font-semibold'>Docs</button>
        </div>
      </div>
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
