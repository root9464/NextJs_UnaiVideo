import { Tier, User } from '@/shared/types/types';

export const getTier = (user: User): Tier => {
  switch (true) {
    case user.wallet && user.wallet.startsWith('0x'):
      return 'Hero';

    default:
      return null;
  }
};
