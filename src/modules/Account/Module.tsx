'use client';
import { axiosFrontend } from '@/shared/utils/axios';

export const AccountPageFlow = () => {
  const checkApi = () => {
    axiosFrontend.get('/?name=123').then((res) => console.log(res.data));
  };
  return (
    <div className='relative h-[calc(100%-113px)] w-full px-4 py-5'>
      <button onClick={checkApi}>Check api</button>
    </div>
  );
};
