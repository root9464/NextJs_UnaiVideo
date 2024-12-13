import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { extractSnapshot } from './ffmpeg';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const subaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string;

export const supabase = createClient(supabaseUrl, subaseKey);

export const uploadVideoToSupabase = async (url: string, bucketName: string, fileName: string, typeFile: string) => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer', // Ожидаем бинарные данные
  });

  const fileBuffer = Buffer.from(response.data); // Преобразуем данные в буфер

  // Загружаем файл в Supabase Storage
  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, fileBuffer, {
    contentType: typeFile, // Укажите MIME-тип
    upsert: true, // Заменяет файл, если он уже существует
  });

  if (error) {
    throw error;
  }

  return data;
};

export const uploadVideoToSupabaseB64 = async (fileBuffer: Buffer, bucketName: string, fileName: string, typeFile: string) => {
  const { data, error } = await supabase.storage.from(bucketName).upload(fileName, fileBuffer, {
    contentType: typeFile, // Укажите MIME-тип
    upsert: true, // Заменяет файл, если он уже существует
  });

  if (error) {
    throw error;
  }

  return data;
};

export const getVideoFromSupabase = async (fileName: string) => {
  const { data } = supabase.storage.from('videos').getPublicUrl(fileName);

  if (!data) throw new Error('Video not found');

  return data;
};

export const getVideoShotFromSupabaseB64 = async (fileName: string, timeTick: number) => {
  const { data } = supabase.storage.from('videos').getPublicUrl(fileName);

  if (!data) throw new Error('Video not found');

  const response = await axios.get(data.publicUrl, {
    responseType: 'arraybuffer',
  });

  if (!response) throw new Error('Something went wrong video not found');

  const fileBuffer = Buffer.from(response.data);

  const videoFrame = await extractSnapshot(fileBuffer, timeTick);

  return videoFrame;
};

export const getVideoFromSupabaseB64 = async (fileName: string) => {
  const { data } = supabase.storage.from('videos').getPublicUrl(fileName);

  if (!data) throw new Error('Video not found');

  const response = await axios.get(data.publicUrl, {
    responseType: 'arraybuffer',
  });

  if (!response) throw new Error('Something went wrong video not found');

  const fileBuffer = Buffer.from(response.data);

  return fileBuffer;
};
