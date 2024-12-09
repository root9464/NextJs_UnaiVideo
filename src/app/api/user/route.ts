import { User } from '@/shared/types/types';
import prisma from '@shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const user: User = await req.json();

  if (!user) return NextResponse.json({ status: 'Error', success: false, error: 'User data is required' }, { status: 400 });

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ id: user.id }, { username: user.username }],
    },
  });

  if (existingUser) {
    if (
      existingUser.firstName !== user.firstName ||
      existingUser.lastName !== user.lastName ||
      existingUser.tier !== user.tier ||
      existingUser.wallet !== user.wallet
    ) {
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          tier: user.tier,
          wallet: user.wallet,
        },
      });
      return NextResponse.json({
        status: 'User updated',
        success: true,
        user: updatedUser,
      });
    }
    return NextResponse.json({
      status: 'User already exists',
      success: true,
      user: existingUser,
    });
  }

  const newUser = await prisma.user.create({ data: user });
  return NextResponse.json({
    status: 'User created',
    success: true,
    user: newUser,
  });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json({ status: 'Error', success: false, error: 'User ID is required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { id: parseInt(userId) } });

    if (!user) {
      return NextResponse.json({
        status: 'User not found',
        success: true,
        user: null,
      });
    }

    return NextResponse.json({
      status: 'User found',
      success: true,
      user: user,
    });
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json({ status: 'Error', success: false, error: 'Failed to get user from the database.' }, { status: 500 });
  }
}
