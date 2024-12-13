import { axiosFrontend } from '@/shared/utils/axios';
import { Prompt, ResponseGenerateVideo } from '@modules/Main/Module';
import { useMutation } from '@tanstack/react-query';

export const useGenerateVideo = () =>
  useMutation({
    mutationKey: ['video_id'],
    mutationFn: async (promptObject: Prompt & { video_id?: string; time_start?: number }) => {
      console.log('generate video data', promptObject);

      const { prompt, time_start, video_id, prompt_optimizer, first_frame_image } = promptObject;

      if (video_id && time_start) {
        console.log('generateNewVideo', {
          prompt: prompt,
          video_id: video_id,
          time_start: time_start,
        });

        const { data } = await axiosFrontend.post<ResponseGenerateVideo>('/generate', {
          prompt: prompt,
          video_id: video_id,
          time_start: time_start,
        });

        if (!data) throw new Error('Something went wrong');

        return data;
      } else if (!video_id && !time_start) {
        console.log('generateVideo', {
          prompt: prompt,
          prompt_optimizer: prompt_optimizer,
          first_frame_image: first_frame_image,
        }); // ЕСЛИ ЧТО ВОТ ТУТ ВОЗМОЖНО ОШИБКА

        const { data } = await axiosFrontend.post<ResponseGenerateVideo>('/generate', {
          prompt: prompt,
          prompt_optimizer: prompt_optimizer,
          first_frame_image: first_frame_image,
        });

        if (!data) throw new Error('Something went wrong');

        return data;
      }
    },

    onSuccess: (data) => {
      console.log('video generated successfully', data);
    },

    onError: (error) => {
      console.error('video generation error:', error);
    },
  });
