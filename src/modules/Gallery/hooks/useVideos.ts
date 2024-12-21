import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
      const { data, statusText, status } = await axios.get<UserVideoResponse[]>(`/api/videos?name=${userName}`);
      if (status !== 200) throw new Error(statusText);

      return data;
    },
    select: (data) => data,
    enabled: !!userName,
  });
};
