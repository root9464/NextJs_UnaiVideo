import { use } from 'react';
import { VideoInfo } from './Components/VideoInfo';
import { getUserVideos } from './func/getUserVideos';

export const GalleryPageFlow = () => {
  const videos = use(getUserVideos('demo1'));

  return (
    <div className='relative h-[calc(100%-113px)] w-full overflow-y-scroll px-5 py-4'>
      <h3 className='m-auto h-fit w-[320px] text-center text-sm'>
        Videos created in the free version are stored for <span className='text-uiLime'>24 hours.</span> With a connected wallet, storage is
        extended to <span className='text-uiLime'>3 days</span>.
      </h3>

      <div className='mt-[14px] flex h-max w-full flex-col gap-[14px]'>
        <VideoInfo userVideo={videos} />
      </div>
    </div>
  );
};
