import { Tier } from '@/shared/types/types';

export const TIERS_DATA: Array<{
  tier: Tier;
  headerText: string;
  startFrom: number;
  limits: number;
}> = [
  {
    tier: null,
    headerText: 'NO TIER',
    startFrom: 0,
    limits: 2,
  },
  {
    tier: 'Pioneer',
    headerText: 'Pioneer',
    startFrom: 50_000,
    limits: 2,
  },
  {
    tier: 'Champion',
    headerText: 'Champion',
    startFrom: 250_000,
    limits: 5,
  },
  {
    tier: 'Hero',
    headerText: 'Hero',
    startFrom: 500_000,
    limits: 10,
  },
  {
    tier: 'Legend',
    headerText: 'Legend',
    startFrom: 900_000,
    limits: 20,
  },
];
