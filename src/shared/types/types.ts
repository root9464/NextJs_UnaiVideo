export type SvgIcon = {
  width: string;
  height: string;
  fill?: string;
  stroke?: string;
  className?: string;
};

export type Tier = null | 'Pioneer' | 'Champion' | 'Hero' | 'Legend';

export type User = {
  id: number;
  tier: Tier;
  username: string;
  firstName: string;
  lastName: string;
  hash: string;
  wallet: string;
};
