'use server';

import { axiosFrontend } from '@shared/utils/axios';

export type Video = {
  id: string;
  file_name: string;
  video_url: string;
};

export type UserVideoResponse = {
  date: string;
  videos: Video[];
};

export const getUserVideos = async (userName: string) => {
  const { data, statusText, status } = await axiosFrontend.get<UserVideoResponse[]>(`/videos?name=${userName}`);
  if (status !== 200) throw new Error(statusText);

  return data;
};