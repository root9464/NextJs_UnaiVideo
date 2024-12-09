import { Tier } from '@shared/types/types';

export const calculateColor = (tier: Tier) => {
  const colors = {
    null: '[#8E939C]',
    Pioneer: '[#54E584]',
    Champion: '[#79CEFF]',
    Hero: '[#BD6DFF]',
    Legend: '[#FFA459]',
  };
  return colors[tier as keyof typeof colors] || colors.null;
};
