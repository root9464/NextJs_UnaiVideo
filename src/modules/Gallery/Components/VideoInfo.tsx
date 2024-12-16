import { UserVideoResponse, Video } from '../hooks/useVideos';

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
        <video src={video_url} controls className='h-max w-full rounded-[8px]' />
      </div>
    ))}
  </>
);
