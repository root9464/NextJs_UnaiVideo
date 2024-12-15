/* eslint-disable @next/next/no-img-element */
'use client';
import LabelLogo from '@public/svg/LabelLogo.svg';
import Link from 'next/link';

export const Limits = ({ tokenValue }: { tokenValue: number }) => (
  <div className='relative flex h-[100px] w-full flex-row justify-between gap-x-1 bg-[#09090B]'>
    <div className='flex h-full w-full flex-col rounded-bl-xl rounded-tl-xl bg-uiDarkGray px-5 py-4 text-start font-semibold'>
      <h3 className='text-base'>Limits remaining:</h3>
      <h2 className='text-[32px]'>{tokenValue}</h2>
    </div>
    <img src={LabelLogo.src} alt='' className='absolute left-1/2 h-[43px] w-[60px] -translate-x-1/2 transform' />
    <div className='flex h-full w-full flex-col items-center justify-center rounded-br-xl rounded-tr-xl bg-uiDarkGray px-5 py-4'>
      <Link href='/' className='flex h-12 w-[100px] items-center justify-center rounded-lg bg-uiLime text-sm font-bold text-uiDarkGray'>
        Upgrade
      </Link>
    </div>
  </div>
);
