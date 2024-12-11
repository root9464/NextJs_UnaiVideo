/* eslint-disable @tanstack/query/exhaustive-deps */
import { axiosFrontend } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

export type BacketFileResponse = {
  id: string;
  status: 'succeeded' | 'processing' | 'failed';
  video_url: string;
};

export const useVideo = (videoId: string, videoUrl: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['video'],
    queryFn: async () => {
      console.log('saveVideo', { videoUrl, videoId });

      const { data } = await axiosFrontend.post<BacketFileResponse>('/generate/backet', {
        username: 'demo1',
        video_url: videoUrl,
        id: videoId,
      });

      return data;
    },
    enabled: enabled,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data && data.status === 'succeeded') {
        return false;
      }

      return 1000 * 30;
    },
    retry: false,
    refetchOnMount: false,
    select: (data) => ({
      ...data,
      isVideo: data.status === 'succeeded' && !!data.video_url,
    }),
  });
};
