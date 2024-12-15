import { Tier } from '@/shared/types/types';

export const calculateTier = (tokens: number, wallet: string): { tier: Tier; limit: number } | null => {
  const required = !!(wallet && wallet.startsWith('0x'));
  switch (true) {
    case required && tokens >= 50_000:
      return {
        tier: 'Pioneer',
        limit: 2,
      };

    case required && tokens >= 250_000:
      return {
        tier: 'Champion',
        limit: 5,
      };

    case required && tokens >= 500_000:
      return {
        tier: 'Hero',
        limit: 10,
      };

    case required && tokens >= 900_000:
      return {
        tier: 'Legend',
        limit: 20,
      };
    default:
      return null;
  }
};
