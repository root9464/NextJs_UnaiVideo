import { getVideoShotFromSupabaseB64 } from '@/shared/lib/supabase';
import prisma from '@/shared/utils/db';
import { PredictionResponse } from '@shared/types/types';
import { axiosInstance } from '@shared/utils/axios';
import { NextResponse } from 'next/server';

type Body = {
  prompt: string;

  video_id?: string;
  time_start?: number;

  first_frame_image: null | string | File | Blob | Buffer;
  prompt_optimizer: boolean;
};

export async function POST(req: Request) {
  const body: Body = await req.json();

  if (!body) {
    return NextResponse.json({ error: 'Field "input" is required' }, { status: 400 });
  }
  if (!body.prompt) {
    return NextResponse.json({ error: 'Field "prompt" is required' }, { status: 400 });
  }

  if (body.video_id && body.time_start && !body.first_frame_image) {
    const videoData = await prisma.video.findFirst({
      where: {
        id: body.video_id,
      },
    });

    if (!videoData) return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    const fileName = `${videoData.username}_${videoData.id}`;

    const videoBuffer = (await getVideoShotFromSupabaseB64(fileName, body.time_start)).toString('base64');
    if (!videoBuffer) return NextResponse.json({ error: 'Video not found' }, { status: 404 });

    const { data, status, statusText } = await axiosInstance.post<PredictionResponse>('/models/minimax/video-01/predictions', {
      input: {
        prompt: body.prompt,
        prompt_optimizer: body.prompt_optimizer,
        first_frame_image: `data:application/octet-stream;base64,${videoBuffer}`,
      },
    });
    if (!data) return NextResponse.json({ error: statusText }, { status: status });

    return NextResponse.json({
      id: data.id,
      status: data.status,
      prompt: data.input.prompt,
      error: data.error,
      video: data.urls.stream,
    });
  } else if (!body.video_id && !body.time_start) {
    const { data, status, statusText } = await axiosInstance.post<PredictionResponse>('/models/minimax/video-01/predictions', {
      input: {
        prompt: body.prompt,
        prompt_optimizer: body.prompt_optimizer,
      },
    });
    if (!data) return NextResponse.json({ error: statusText }, { status: status });

    return NextResponse.json({
      id: data.id,
      status: data.status,
      prompt: data.input.prompt,
      error: data.error,
      video: data.urls.stream,
    });
  }
  return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const response = await axiosInstance.get<PredictionResponse>(`/predictions/${id}`);
  if (!response) return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });

  const data = {
    id: response.data.id,
    status: response.data.status,
    prompt: response.data.input.prompt,
    error: response.data.error,
    video: response.data.urls.stream,
  };

  return NextResponse.json(data);
}
