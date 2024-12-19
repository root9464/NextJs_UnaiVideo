import { SvgIcon } from '@/shared/types/types';

export const CrossIcon = ({ width, height, stroke }: SvgIcon) => (
  <svg width={width} height={height} viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M1 1L21 21M21 1L1 21' stroke={stroke} strokeWidth='2' strokeLinecap='round' />
  </svg>
);
