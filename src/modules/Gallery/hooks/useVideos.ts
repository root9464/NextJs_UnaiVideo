import { axiosFrontend } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

export type Video = {
  id: string;
  file_name: string;
  video_url: string;
};

export type UserVideoResponse = {
  date: string;
  videos: Video[];
};

export const useVideos = (userName: string) => {
  return useQuery({
    queryKey: ['videos', userName],
    queryFn: async () => {
      const { data, statusText, status } = await axiosFrontend.get<UserVideoResponse[]>(`/videos?name=${userName}`);
      if (status !== 200) throw new Error(statusText);

      return data;
    },
    select: (data) => data,
    enabled: !!userName,
  });
};
