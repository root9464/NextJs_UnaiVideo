'use client';
import { GalleryIcon } from '@public/tsx/GalleryIco';
import { GenerateIcon } from '@public/tsx/GenerateIcon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    name: 'Generator',
    icon: <GenerateIcon width='24' height='24' stroke='white' />,
    path: '/',
  },
  {
    name: 'Gallery',
    icon: <GalleryIcon width='24' height='24' stroke='white' />,
    path: '/gallery',
  },
  {
    name: 'Account',
    icon: <GenerateIcon width='24' height='24' stroke='white' />,
    path: '/account',
  },
];

export const Menu = () => {
  const pathname = usePathname();

  return (
    <div className='absolute bottom-0 left-0 flex h-fit w-full flex-row items-center justify-between gap-x-[26px] bg-uiDarkGray px-4 pb-[calc(16px+21px)] pt-4'>
      {menuItems.map(({ icon, name, path }) => (
        <Link
          href={path}
          key={name}
          className={`flex h-full w-full flex-grow flex-col items-center justify-center gap-y-1 rounded-[8px] p-2 text-xs font-bold text-white ${
            pathname === path ? 'bg-uiPrimaryLightGray' : ''
          }`}
        >
          {icon}
          <p>{name}</p>
        </Link>
      ))}
    </div>
  );
};
