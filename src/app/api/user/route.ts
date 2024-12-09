import { User } from '@/shared/types/types';
import prisma from '@shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const user: User = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ id: user.id }, { username: user.username }],
      },
    });

    if (existingUser) {
      if (existingUser.firstName !== user.firstName || existingUser.lastName !== user.lastName || existingUser.tier !== user.tier) {
        const updatedUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            firstName: user.firstName,
            lastName: user.lastName,
            tier: user.tier,
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
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      {
        status: 'Error',
        success: false,
        error: 'Failed to save user to the database.',
      },
      { status: 500 },
    );
  }
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
