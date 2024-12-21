'use client';
import { useQueryClient } from '@tanstack/react-query';
import { retrieveLaunchParams, User } from '@telegram-apps/bridge';
import { VideoInfo } from './Components/VideoInfo';
import { useVideos } from './hooks/useVideos';

export const GalleryPageFlow = () => {
  const queryClient = useQueryClient();
  const { initData } = retrieveLaunchParams();
  const user: User | undefined = queryClient.getQueryData(['user' + initData?.user?.id]);

  const { data: videos, isSuccess, isLoading, isError, error } = useVideos(user && user.username ? user.username : '');

  return (
    <div className='relative h-[calc(100%-113px)] w-full overflow-y-scroll px-5 py-4'>
      <h3 className='m-auto h-fit w-[320px] text-center text-sm'>
        Videos created in the free version are stored for <span className='text-uiLime'>24 hours.</span> With a connected wallet, storage is
        extended to <span className='text-uiLime'>3 days</span>.
      </h3>

      <div className='mt-[14px] flex h-max w-full flex-col gap-[14px]'>
        {videos && isSuccess ? <VideoInfo userVideo={videos} /> : isLoading ? <h3>Loading...</h3> : isError ? <h3>{error.message}</h3> : null}
      </div>
    </div>
  );
};
