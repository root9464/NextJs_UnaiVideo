import { getVideoFromSupabase } from '@shared/lib/supabase';
import prisma from '@shared/utils/db';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

type GroupedVideo = {
  date: string;
  videos: { id: string; file_name: string; video_url: string }[];
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userName = searchParams.get('name');

  if (!userName) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const userVideos = await prisma.video.findMany({
    where: { username: userName },
    orderBy: { createdAt: 'desc' },
  });

  const groupedVideos: GroupedVideo[] = [];

  for (const video of userVideos) {
    const formattedDate = format(new Date(video.createdAt), 'yyyy-MM-dd');
    const { publicUrl } = await getVideoFromSupabase(video.file_name);

    let group = groupedVideos.find((g) => g.date === formattedDate);
    if (!group) {
      group = { date: formattedDate, videos: [] };
      groupedVideos.push(group);
    }

    group.videos.push({
      id: video.id,
      file_name: video.file_name,
      video_url: publicUrl,
    });
  }

  return NextResponse.json(groupedVideos);
}
