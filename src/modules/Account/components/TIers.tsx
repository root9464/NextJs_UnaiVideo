import { Tier } from '@shared/types/types';

const calculateTextColor = (tier: Tier) => {
  const colors = {
    null: 'text-[#8E939C]',
    Pioneer: 'text-[#54E584]',
    Champion: 'text-[#79CEFF]',
    Hero: 'text-[#BD6DFF]',
    Legend: 'text-[#FFA459]',
  };
  return colors[tier as keyof typeof colors] || colors.null;
};

export const TiersBlock = ({ tier, unaiTokens }: { tier: Tier; unaiTokens: number }) => {
  const tierColor = calculateTextColor(tier);
  return (
    <div className='grid h-fit w-full grid-cols-2 rounded-xl bg-uiDarkGray p-5'>
      <div className='flex h-full w-full flex-col justify-center gap-y-2'>
        <p className='text-base font-semibold'>UNAI Balance:</p>
        <p className='text-xl font-semibold'>
          <span className='text-uiLime'>{(tier && unaiTokens.toLocaleString()) || '0.00'}</span> UNAI
        </p>
      </div>
      <div className='rounded-[6px] bg-uiPrimaryLightGray p-4 text-center'>
        {tier ? (
          <p className='flex flex-col text-xl font-semibold'>
            TIER <span className={`${tierColor}`}>{tier}</span>
          </p>
        ) : (
          <p className='text-xl font-semibold'>NO TIER</p>
        )}
      </div>
    </div>
  );
};
