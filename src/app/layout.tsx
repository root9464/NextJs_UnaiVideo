/* eslint-disable react-refresh/only-export-components */
import { Menu } from '@/components/Menu';
import type { Metadata } from 'next';
import './globals.css';
import { GLobalProvider } from './provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className='min-h-screen w-full bg-[#0F0F0F] text-white no-underline'>
        <GLobalProvider>
          {children}
          <Menu />
        </GLobalProvider>
      </body>
    </html>
  );
}
