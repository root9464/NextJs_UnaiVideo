import { SvgIcon } from '@/shared/types/types';

export const ArrowUoIcon = ({ fill }: Pick<SvgIcon, 'fill'>) => (
  <svg width='16' height='10' viewBox='0 0 16 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M7.23182 0.350185C7.65607 -0.116728 8.34393 -0.116728 8.76818 0.350185L15.6818 7.95897C16.1061 8.42589 16.1061 9.1829 15.6818 9.64982C15.2576 10.1167 14.5697 10.1167 14.1454 9.64982L8 2.88645L1.85455 9.64982C1.4303 10.1167 0.742446 10.1167 0.318191 9.64982C-0.106064 9.1829 -0.106064 8.42589 0.318191 7.95897L7.23182 0.350185Z'
      fill={fill}
    />
  </svg>
);
