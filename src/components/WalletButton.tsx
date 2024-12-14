'use client';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { ReactNode } from 'react';

export const WalletButton = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  const { address, isConnected, status } = useAppKitAccount();
  console.log('GalleryPageFlow', { address, isConnected, status });

  if (isConnected)
    return (
      <button onClick={disconnect} className='h-fit w-fit rounded-[8px] border border-uiLime bg-transparent p-3 text-sm font-bold text-uiLime'>
        Disconnect Wallet
      </button>
    );

  return (
    <button onClick={() => open({ view: 'Connect' })} className='h-fit w-fit rounded-[8px] bg-uiLime p-3 text-sm font-bold text-uiDarkGray'>
      {children}
    </button>
  );
};
