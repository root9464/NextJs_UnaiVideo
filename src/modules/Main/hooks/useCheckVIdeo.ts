/* eslint-disable @tanstack/query/exhaustive-deps */
import { axiosFrontend } from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { ResponseGenerateVideo } from '../Module';

const checkStatusVideo = (id: string) => {
  console.log('checkStatusVideo', id);
  return axiosFrontend.get<ResponseGenerateVideo>(`/generate/?id=${id}`);
};

export const useCheckVideo = (id: string) => {
  return useQuery({
    queryKey: ['raw_video'],
    queryFn: () => checkStatusVideo(id),
    enabled: id !== '',
    select: (data) => data.data,
    refetchInterval: 1000 * 30,
  });
};
