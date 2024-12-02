'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const GLobalProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
