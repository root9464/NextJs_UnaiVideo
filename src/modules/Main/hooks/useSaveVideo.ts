/* eslint-disable @tanstack/query/exhaustive-deps */
import { axiosFrontend } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

export type BacketFileResponse = {
  success: boolean;
  data: string;
};

const saveVideo = (videoUrl: string) => {
  console.log('saveVideo', videoUrl);
  return axiosFrontend.post<BacketFileResponse>('/generate/backet', {
    username: 'demo1',
    video_url: videoUrl,
  });
};

export const useSaveVideo = (videoUrl: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['video'],
    queryFn: () => saveVideo(videoUrl),
    enabled: enabled,
    select: (data) => data.data,
  });
};
