import { Prompt } from '@modules/Main/Module';
import { axiosInstance } from '@shared/utils/axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body: Prompt = await req.json();

  if (!body) {
    return NextResponse.json({ error: 'Field "input" is required' }, { status: 400 });
  }
  if (!body.prompt) {
    return NextResponse.json({ error: 'Field "prompt" is required' }, { status: 400 });
  }

  const filteredInput: Partial<Prompt> = { ...body };
  if (filteredInput.first_frame_image === null) {
    delete filteredInput.first_frame_image;
  }

  const { data } = await axiosInstance.post<PredictionResponse>('/models/minimax/video-01/predictions', {
    input: filteredInput,
  });

  return NextResponse.json({
    id: data.id,
    status: data.status,
    prompt: data.input.prompt,
    error: data.error,
    video: data.urls.stream,
  });
}

type PredictionResponse = {
  id: string;
  model: string;
  version: string;
  input: {
    prompt: string;
  };
  logs: string;
  output: string;
  data_removed: boolean;
  error: null | string;
  status: string;
  created_at: string;
  started_at: string;
  completed_at: string;
  urls: {
    cancel: string;
    get: string;
    stream: string;
  };
  metrics: {
    predict_time: number;
  };
};

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
