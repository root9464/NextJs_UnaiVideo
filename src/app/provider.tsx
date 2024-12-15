'use client';

import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5';
import { arbitrum, mainnet } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const metadata = {
  name: 'unaivideos',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit',
  icons: ['https://assets.reown.com/reown-profile-pic.png'],
};

createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata,
  networks: [mainnet, arbitrum],
  projectId,
  features: {
    analytics: true,
    email: false,
    socials: false,
    smartSessions: false,
    swaps: false,
  },
  enableWalletConnect: false,
  debug: true,
});

export const GLobalProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
