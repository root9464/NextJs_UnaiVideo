import { Prompt } from '@modules/Main/Module';
import { axiosFrontend } from '@shared/utils/axios';
import { useMutation } from '@tanstack/react-query';
import { ResponseGenerateVideo } from '../Module';

export const useGenerateVideo = (Prompt: Prompt) =>
  useMutation({
    mutationKey: ['video_id'],
    mutationFn: async () => {
      if (!Prompt) throw new Error('Prompt is required');

      const { data, status } = await axiosFrontend.post<ResponseGenerateVideo>('/generate', Prompt);

      if (status !== 200) return console.error('Oops, что-то пошло не так');

      return data;
    },

    onSuccess: (data) => {
      console.log('generateVideo', data);
    },

    onError: (error) => {
      console.error('Ошибка:', error);
    },
  });
