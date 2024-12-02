import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || 'Guest';
  return NextResponse.json({ message: `Hello, ${name}` });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.message === 'ping') {
    return NextResponse.json({ message: 'pong' });
  } else {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
