import { axiosFrontend } from '@/shared/utils/axios';
import { Prompt, ResponseGenerateVideo } from '@modules/Main/Module';
import { useMutation } from '@tanstack/react-query';

export const useGenerateVideo = () =>
  useMutation({
    mutationKey: ['video_id'],
    mutationFn: async (prompt: Prompt) => {
      console.log('generateVideo', prompt);

      const { data } = await axiosFrontend.post<ResponseGenerateVideo>('/generate', prompt);

      if (!data) throw new Error('Something went wrong');

      return data;
    },

    onSuccess: (data) => {
      console.log('generateVideo', data);
    },

    onError: (error) => {
      console.error('Ошибка:', error);
    },
  });
