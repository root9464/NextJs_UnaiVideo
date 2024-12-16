/* eslint-disable @tanstack/query/exhaustive-deps */
import { axiosFrontend } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

export type BacketFileResponse = {
  id: string;
  status: 'succeeded' | 'processing' | 'failed';
  video_url: string;
};

export const useVideo = (videoId: string, videoUrl: string, enabled: boolean, userName: string, time_start?: number) => {
  return useQuery({
    queryKey: ['video'],
    queryFn: async () => {
      console.log('saveVideo', { videoUrl, videoId });

      const { data, status, statusText } = await axiosFrontend.post<BacketFileResponse>('/generate/backet', {
        username: userName,
        video_url: videoUrl,
        id: videoId,
        time_start: time_start,
      });

      // const { data, status, statusText } = (await new Promise((resolve) =>
      //   resolve({
      //     data: {
      //       id: '0',
      //       status: 'processing',
      //       video_url: 'fff',
      //     },
      //     status: 200,
      //     statusText: '',
      //   }),
      // )) as { data: BacketFileResponse; status: number; statusText: string };

      if (status !== 200) throw new Error(statusText);

      return data;
    },
    enabled: enabled,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: (query) => {
      const data = query.state.data;

      if (!!data && data.status === 'succeeded') {
        return false;
      }

      return 1000 * 3;
    },
    select: (data) => ({
      ...data,
      isVideo: data.status === 'succeeded' && !!data.video_url,
    }),
  });
};
