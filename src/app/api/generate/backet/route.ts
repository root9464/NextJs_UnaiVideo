import { generateId } from '@/shared/lib/generateId';
import prisma from '@/shared/utils/db';
import { uploadVideoToSupabase } from '@shared/lib/upload.supabase';
import { NextResponse } from 'next/server';

type BacketFile = {
  username: string;
  video_url: string;
};

const bucketName = 'videos';
const typeFile = 'video/mp4';

export async function POST(req: Request) {
  const body: BacketFile = await req.json();
  if (!body) {
    return NextResponse.json({ error: 'Field add data in bucket' }, { status: 400 });
  }

  const { video_url, username } = body;
  if (!video_url) {
    return NextResponse.json({ error: 'Field video_url is required' }, { status: 400 });
  }

  const uniqueId = generateId();
  const fileName = `video_${uniqueId}_${username}`;

  const supabaseResponse = await uploadVideoToSupabase(video_url, bucketName, fileName, typeFile);
  if (!supabaseResponse || !supabaseResponse.id) return NextResponse.json({ error: 'Failed to save data in bucket' }, { status: 500 });

  const savedRecord = await prisma.video.create({
    data: {
      id: supabaseResponse.id,
      file_name: fileName,
      username: username,
    },
  });

  if (!savedRecord) return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });

  return NextResponse.json({ success: true, data: savedRecord });
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
    return NextResponse.json(response);
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
