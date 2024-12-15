import { actualVideoFromB64 } from '@shared/lib/axios';
import { cutAndConcatVideos, extractSnapshot } from '@shared/lib/ffmpeg';
import { getVideoFromSupabase, getVideoFromSupabaseB64, uploadVideoToSupabase, uploadVideoToSupabaseB64 } from '@shared/lib/supabase';
import { PredictionResponse } from '@shared/types/types';
import { axiosInstance } from '@shared/utils/axios';
import prisma from '@shared/utils/db';
import { NextResponse } from 'next/server';

type BacketFile = {
  username: string;
  video_url: string;
  id: string;

  time_start?: number;
};

const bucketName = 'videos';
const typeFile = 'video/mp4';

export async function POST(req: Request) {
  const body: BacketFile = await req.json();
  if (!body) {
    return NextResponse.json({ error: 'Field add data in bucket' }, { status: 400 });
  }

  const { video_url, username, id, time_start } = body;

  if (!video_url || !username || !id) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  const fileName = `${username}_${id}`;

  const checkStatusVideo = await axiosInstance.get<PredictionResponse>(`/predictions/${id}`);
  if (!checkStatusVideo.data) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }

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

  if (checkVideoInDb && !time_start) {
    const { publicUrl } = await getVideoFromSupabase(fileName);
    return NextResponse.json({
      id,
      status,
      video_url: publicUrl,
    });
  }

  if (!checkVideoInDb && time_start) {
    const userVideos = await prisma.video.findMany({
      where: { username },
      orderBy: { createdAt: 'desc' },
    });

    if (!userVideos || userVideos.length === 0) {
      return NextResponse.json({ error: 'User has no videos 1' }, { status: 404 });
    }

    const lastVideo = userVideos[0];
    const oldFileName = `${lastVideo.username}_${lastVideo.id}`;

    const oldVideoBuffer = await getVideoFromSupabaseB64(oldFileName);
    const oldVideoBufferShot = await extractSnapshot(oldVideoBuffer, time_start);

    if (!oldVideoBuffer || !oldVideoBufferShot) {
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    const actualVideoBuffer = await actualVideoFromB64(video_url);

    if (!actualVideoBuffer) {
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    const newVideoBuffer = await cutAndConcatVideos(oldVideoBuffer, actualVideoBuffer, time_start);
    if (!newVideoBuffer) {
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    const supabaseResponse = await uploadVideoToSupabaseB64(newVideoBuffer, bucketName, fileName, typeFile);
    if (!supabaseResponse || !supabaseResponse.id) {
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }

    const { publicUrl } = await getVideoFromSupabase(fileName);

    if (!publicUrl) {
      return NextResponse.json({ error: 'Dont get video from storage' }, { status: 500 });
    }

    await prisma.video.create({
      data: {
        id,
        file_name: fileName,
        username,
      },
    });

    return NextResponse.json({
      id,
      status,
      video_url: publicUrl,
    });
  }

  const supabaseResponse = await uploadVideoToSupabase(video_url, bucketName, fileName, typeFile);
  if (!supabaseResponse || !supabaseResponse.id) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }

  const videoExists = await prisma.video.findUnique({ where: { id } });
  if (videoExists) {
    return NextResponse.json({ error: 'Video with this ID already exists' }, { status: 400 });
  }

  await prisma.video.create({
    data: {
      id,
      file_name: fileName,
      username,
    },
  });

  const { publicUrl } = await getVideoFromSupabase(fileName);

  if (!publicUrl) {
    return NextResponse.json({ error: 'Dont get video from storage' }, { status: 500 });
  }

  return NextResponse.json({
    id,
    status,
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
