import { Prompt } from '@/modules/Main/Module';
import { NextResponse } from 'next/server';

type Body = {
  id: string;
  time_start: number;
} & Prompt;

export async function POST(req: Request) {
  const body: Body = await req.json();
  return NextResponse.json({
    id: body.id,
    status: 'succeeded',
    prompt: body.prompt,
    error: '',
    video: 'https://wycoeqwvjrozfkekkhyq.supabase.co/storage/v1/object/public/videos/demo1_wtz33c0499rge0ckptzrcehb9m',
  });
}
