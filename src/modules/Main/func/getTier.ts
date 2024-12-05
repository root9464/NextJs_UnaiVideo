import { Tier, User } from '@/shared/types/types';

export const calculateTier = (user: User, tokens: number): Tier => {
  const required = user.wallet && user.wallet.startsWith('0x') ? true : false;
  switch (true) {
    case required && tokens >= 50_000:
      return 'Pioneer';

    case required && tokens >= 250_000:
      return 'Champion';

    case required && tokens >= 500_000:
      return 'Hero';

    case required && tokens >= 900_000:
      return 'Legend';
    default:
      return null;
  }
};
