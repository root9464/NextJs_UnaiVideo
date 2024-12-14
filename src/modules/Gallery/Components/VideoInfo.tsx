import Link from 'next/link';
import { UserVideoResponse, Video } from '../func/getUserVideos';

export const VideoInfo = ({ userVideo }: { userVideo: UserVideoResponse[] }) => (
  <>
    {userVideo.map(({ date, videos }) => (
      <div className='flex h-max w-full flex-col gap-y-2 rounded-xl bg-uiDarkGray p-5' key={date}>
        <h3>{date}</h3>
        <div className='flex h-fit w-full flex-col gap-y-2'>
          <VideoInfoFragmet videos={videos} />
        </div>
      </div>
    ))}
  </>
);

const VideoInfoFragmet = ({ videos }: { videos: Omit<Video, 'file_name'>[] }) => (
  <>
    {videos.map(({ id, video_url }) => (
      <div key={id} className='flex h-fit w-full flex-col items-start gap-y-4 rounded-[8px] bg-uiPrimaryLightGray px-3 py-2'>
        <div className='flex h-full w-full flex-row items-center justify-between'>
          <h4>Video Id</h4>
          <p>{id}</p>
        </div>
        <div className='flex h-full w-full flex-row items-center justify-between'>
          <h4>Video Url</h4>
          <Link href={video_url} className='rounded-[8px] bg-uiLime px-5 py-2 text-sm font-semibold text-uiDarkGray'>
            View
          </Link>
        </div>
      </div>
    ))}
  </>
);
