import { PredictionResponse } from '@/shared/types/types';
import { axiosInstance } from '@/shared/utils/axios';
import { getVideoFromSupabase, uploadVideoToSupabase } from '@shared/lib/supabase';
import prisma from '@shared/utils/db';
import { NextResponse } from 'next/server';

type BacketFile = {
  username: string;
  video_url: string;
  id: string;
};

const bucketName = 'videos';
const typeFile = 'video/mp4';

export async function POST(req: Request) {
  const body: BacketFile = await req.json();
  if (!body) return NextResponse.json({ error: 'Field add data in bucket' }, { status: 400 });

  const { video_url, username, id } = body;

  const fileName = `${username}_${id}`;

  const checkStatusVideo = await axiosInstance.get<PredictionResponse>(`/predictions/${id}`);
  if (!checkStatusVideo) return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });

  const { status, error, logs } = checkStatusVideo.data;
  if (status !== 'succeeded' && status !== 'failed') {
    return NextResponse.json({ id, status });
  }

  if (status === 'failed') {
    return NextResponse.json({ error, logs, status });
  }

  const checkVideoInDb = await prisma.video.findFirst({
    where: {
      id: id,
    },
  });
  if (checkVideoInDb) {
    const { publicUrl } = await getVideoFromSupabase(fileName);
    return NextResponse.json({
      id,
      status: status,
      video_url: publicUrl,
    });
  }

  const supabaseResponse = await uploadVideoToSupabase(video_url, bucketName, fileName, typeFile);
  if (!supabaseResponse || !supabaseResponse.id) return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });

  await prisma.video.create({
    data: {
      id: id,
      file_name: supabaseResponse.id,
      username: username,
    },
  });

  const { publicUrl } = await getVideoFromSupabase(fileName);

  if (!publicUrl) return NextResponse.json({ error: 'Dont get video from storage' }, { status: 500 });

  return NextResponse.json({
    id,
    status: status,
    video_url: publicUrl,
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const videoId = searchParams.get('id');
  const username = searchParams.get('username');

  if (videoId) {
    const response = await prisma.video.findFirst({
      where: {
        id: videoId,
      },
    });
    if (!response) return NextResponse.json({ error: 'Video not found' });

    const videoUrl = await getVideoFromSupabase(response.file_name);

    return NextResponse.json(videoUrl);
  }

  if (username) {
    const response = await prisma.video.findMany({
      where: {
        username: username,
      },
    });
    if (!response) return NextResponse.json({ error: 'Videos not found' });
    return NextResponse.json(response);
  }

  return NextResponse.json({ error: 'Either video_id or username is required' }, { status: 400 });
}
