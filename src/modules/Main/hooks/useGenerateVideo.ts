import { axiosFrontend } from '@/shared/utils/axios';
import { Prompt, ResponseGenerateVideo } from '@modules/Main/Module';
import { useMutation } from '@tanstack/react-query';

export const useGenerateVideo = () =>
  useMutation({
    mutationKey: ['video_id'],
    mutationFn: async (prompt: Prompt & { id?: string; time_start?: number }) => {
      console.log('generateVideo', prompt);

      if (prompt.id && prompt.time_start) {
        console.log('generateNewVideo', prompt);

        const { data } = await axiosFrontend.post<ResponseGenerateVideo>('/generate/extension', {
          id: prompt.id,
          time_start: prompt.time_start,
          ...prompt,
        });

        if (!data) throw new Error('Something went wrong');

        return data;
      } else if (!prompt.id && !prompt.time_start) {
        const { data } = await new Promise<{ data: ResponseGenerateVideo }>((resolve) => {
          resolve({
            data: {
              id: 'sd19wbz1e9rg80ckpx5ahjckmr',
              status: 'succeeded',
              prompt: '',
              error: '',
              video: '',
            },
          });
        });

        if (!data) throw new Error('Something went wrong');

        return data;
      }
    },

    onSuccess: (data) => {
      console.log('generateVideo', data);
    },

    onError: (error) => {
      console.error('Ошибка:', error);
    },
  });
