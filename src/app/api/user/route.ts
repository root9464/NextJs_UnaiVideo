import { calculateTier } from '@/modules/Main/func/getTier';
import { getUserBalance } from '@/shared/utils/userHandler';
import prisma from '@shared/utils/db';
import { NextRequest, NextResponse } from 'next/server';

type Request = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  hash: string;
  wallet: string;
};

export async function POST(req: NextRequest) {
  const body: Request = await req.json();

  if (!body) return NextResponse.json({ status: 'Error', success: false, error: 'User data is required' }, { status: 400 });

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ id: body.id }, { username: body.username }],
    },
  });

  const userBalance = await getUserBalance(body.wallet);
  if (userBalance === null) return NextResponse.json({ status: 'Error', success: false, error: 'User balance is required' }, { status: 400 });

  const getTier = calculateTier(userBalance, body.wallet);

  if (existingUser) {
    const isNeedUpdate =
      existingUser.wallet?.toLowerCase() !== body.wallet?.toLowerCase() ||
      (getTier?.limit !== undefined && existingUser.limits !== getTier?.limit) ||
      (getTier?.tier !== undefined && existingUser.tier !== getTier?.tier) ||
      existingUser.username !== body.username;

    if (isNeedUpdate) {
      const updateUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          username: body.username,
          wallet: body.wallet,
          tier: getTier?.tier,
          limits: getTier?.limit,
          balance: userBalance,
        },
      });
      if (!updateUser) return NextResponse.json({ status: 'Error', success: false, error: 'Failed to update user' }, { status: 500 });

      const { id, tier, limits, username, firstName, lastName, hash, balance } = updateUser;

      return NextResponse.json(
        { status: 'Updated', success: userBalance, user: { id, tier, limits, username, firstName, lastName, hash, balance } },
        { status: 200 },
      );
    }

    const user = await prisma.user.update({
      where: { id: existingUser.id },
      data: body,
    });
    if (!user) return NextResponse.json({ status: 'Error', success: false, error: 'Failed to update user' }, { status: 500 });
    const { id, tier, limits, username, firstName, lastName, hash, balance } = user;
    return NextResponse.json(
      { status: 'Get', success: true, user: { id, tier, limits, username, firstName, lastName, hash, balance } },
      { status: 200 },
    );
  }

  const user = await prisma.user.create({
    data: {
      ...body,
      tier: getTier?.tier,
      limits: getTier?.limit,
      balance: userBalance,
    },
  });

  if (!user) return NextResponse.json({ status: 'Error', success: false, error: 'Failed to create user' }, { status: 500 });

  const { id, tier, limits, username, firstName, lastName, hash, balance } = user;

  return NextResponse.json(
    { status: 'Created', success: userBalance, user: { id, tier, limits, username, firstName, lastName, hash, balance } },
    { status: 200 },
  );
}
