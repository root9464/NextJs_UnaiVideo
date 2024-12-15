'use client';
import { useAppKit, useAppKitAccount, useDisconnect } from '@reown/appkit/react';
import { ReactNode } from 'react';

export const WalletButton = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();

  const { isConnected } = useAppKitAccount();

  if (isConnected)
    return (
      <button
        onClick={disconnect}
        className='h-fit w-full rounded-[8px] border border-uiLime bg-transparent px-3 py-[14px] text-sm font-bold text-uiLime'
      >
        Disconnect Wallet
      </button>
    );

  return (
    <button
      onClick={() => open({ view: 'Connect' })}
      className='h-fit w-full rounded-[8px] bg-uiLime px-3 py-[14px] text-sm font-bold text-uiDarkGray'
    >
      {children}
    </button>
  );
};
