import { SvgIcon } from '@/shared/types/types';

export const GenerateIcon = ({ width, height, stroke }: SvgIcon) => (
  <svg width={width} height={height} viewBox='0 0 23 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M21 9V5C21 2.79086 19.2091 1 17 1H5C2.79086 1 1 2.79086 1 5V13C1 15.2091 2.79086 17 5 17H11'
      stroke={stroke}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M14 9L9 6V12L14 9Z' stroke={stroke} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    <path
      d='M14.3318 16.4011C13.8894 16.3229 13.8894 15.6771 14.3318 15.5989C15.1149 15.4596 15.8395 15.0868 16.4137 14.5277C16.9878 13.9687 17.3854 13.2487 17.556 12.4593L17.5825 12.335C17.6783 11.8903 18.3009 11.8877 18.4005 12.3311L18.4333 12.4759C18.6093 13.2623 19.0102 13.9781 19.5855 14.5334C20.1608 15.0886 20.8848 15.4584 21.6663 15.5963C22.1112 15.6758 22.1112 16.3242 21.6663 16.4037C20.8848 16.5416 20.1608 16.9114 19.5855 17.4666C19.0102 18.0219 18.6093 18.7377 18.4333 19.5241L18.4005 19.6689C18.3009 20.1123 17.6783 20.1097 17.5825 19.665L17.556 19.5407C17.3854 18.7513 16.9878 18.0313 16.4137 17.4723C15.8395 16.9132 15.1149 16.5404 14.3318 16.4011Z'
      stroke={stroke}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
