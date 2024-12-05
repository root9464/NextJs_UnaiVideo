'use server';

import { User } from '@/shared/types/types';
import prisma from '../utils/db';

export const saveUserDb = async (user: User) => {
  try {
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
        return { status: 'User updated', success: true, user: updatedUser };
      }
      return { status: 'User already exists', success: true, user: existingUser };
    }

    const newUser = await prisma.user.create({ data: user });
    return { status: 'User created', success: true, user: newUser };
  } catch (error) {
    console.error('Error saving user:', error);
    return { status: 'Error', success: false, error: 'Failed to save user to the database.' };
  }
};

export const getUserDb = async (user_id: number) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: user_id } });
    if (!user) return { status: 'User not found', success: true, user: user };
    return { status: 'User found', success: true, user: user };
  } catch (error) {
    console.error('Error getting user:', error);
    return { status: 'Error', success: false, error: 'Failed to get user from the database.' };
  }
};
