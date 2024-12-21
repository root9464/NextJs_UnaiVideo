'use client';
import { SwipeCarousel } from '@/components/Carousel';
import { WalletButton } from '@/components/WalletButton';
import { useAppKitAccount } from '@reown/appkit/react';
import { retrieveLaunchParams } from '@telegram-apps/bridge';
import { TiersBlock } from './components/TIers';
import { TIERS_DATA } from './constants/const';
import { useAuth } from './hooks/useAuth';

// export const retrieveLaunchParams = () => ({
//   initData: {
//     user: {
//       id: 99281932,
//       firstName: 'Andrew',
//       lastName: 'Rogue',
//       username: 'rogue',
//       languageCode: 'en',
//       isPremium: true,
//       allowsWriteToPm: true,
//     },
//     hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
//     authDate: new Date(1716922846000),
//     startParam: 'debug',
//     chatType: 'sender',
//     chatInstance: '8428209589180549439',
//   },
// });

export const AccountPageFlow = () => {
  const { address } = useAppKitAccount();

  const { initData } = retrieveLaunchParams();

  const { data } = useAuth({ initData, wallet: address });

  return (
    <div className='relative h-[calc(100%-113px)] w-full overflow-y-scroll px-5 py-4'>
      <WelcomeText userName={data ? data.username : null} wallet={address} />
      <TiersBlock tier={data && data.tier ? data.tier : null} unaiTokens={data ? data.balance : 0} />

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

const WelcomeText = ({ userName, wallet }: { userName: string | null; wallet: string | undefined }) => {
  return (
    <>
      {userName && wallet ? (
        <div className='h-fit w-full p-5 text-center'>
          <h2 className='text-xl font-semibold'>
            Hello, <span className='text-uiLime'>{userName}</span>
          </h2>
        </div>
      ) : userName ? (
        <div className='h-fit w-full p-5 text-center'>
          <h2 className='text-xl font-semibold'>
            Hello, <span className='text-uiLime'>{userName}</span>
          </h2>
          <p className='text-base'>Connect your wallet to log in.</p>
        </div>
      ) : (
        <div className='h-fit w-full p-5 text-center'>
          <h2 className='text-xl font-semibold'>Welcome to UNAI video!</h2>
          <p className='text-base'>Connect your wallet to log in.</p>
        </div>
      )}
    </>
  );
};
