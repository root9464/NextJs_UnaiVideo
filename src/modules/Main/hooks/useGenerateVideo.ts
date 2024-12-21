import { Prompt, ResponseGenerateVideo } from '@modules/Main/Module';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useGenerateVideo = () =>
  useMutation({
    mutationKey: ['video_id'],
    mutationFn: async (promptObject: Prompt & { video_id?: string; time_start?: number; user_id: number }) => {
      console.log('generate video data', promptObject);

      const { prompt, time_start, video_id, prompt_optimizer, first_frame_image, user_id } = promptObject;

      if (video_id && time_start) {
        console.log('generateNewVideo', {
          prompt: prompt,
          id: video_id,
          time_start: time_start,
        });

        const { data } = await axios.post<ResponseGenerateVideo>('/api/generate', {
          prompt: prompt,
          video_id: video_id,
          time_start: time_start,
          user_id: user_id,
        });

        if (!data) throw new Error('Something went wrong');

        return data;
      } else if (!video_id && !time_start) {
        console.log('generateVideo', {
          prompt: prompt,
          prompt_optimizer: prompt_optimizer,
          first_frame_image: first_frame_image,
          user_id: user_id,
        }); // ЕСЛИ ЧТО ВОТ ТУТ ВОЗМОЖНО ОШИБКА

        const { data } = await axios.post<ResponseGenerateVideo>('/api/generate', {
          prompt: prompt,
          prompt_optimizer: prompt_optimizer,
          first_frame_image: first_frame_image,
          user_id: user_id,
        });

        // const { data } = (await new Promise((resolve) => {
        //   resolve({
        //     data: {
        //       id: '2r6h9z67tdrge0cksba84fd5cc',
        //       status: 'processing',
        //       prompt: 'не важно',
        //       error: 'не важно',
        //       video: 'https://wycoeqwvjrozfkekkhyq.supabase.co/storage/v1/object/public/videos/demo.mp4',
        //     },
        //   });
        // })) as { data: ResponseGenerateVideo };

        if (!data) throw new Error('Something went wrong');

        return data;
      }
    },

    gcTime: Infinity,

    onSuccess: (data) => {
      console.log('video generated successfully', data);
    },

    onError: (error) => {
      console.error('video generation error:', error);
    },
  });
