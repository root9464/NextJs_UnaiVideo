'use client';

import { Tier } from '@/shared/types/types';
import { motion, useMotionValue } from 'motion/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type CarouselProps = {
  tier: Tier;
  headerText: string;
  startFrom: number;
  limits: number;
};

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: 'spring',
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const calculateBgColor = (tier: Tier) => {
  const colors = {
    null: 'bg-[#8E939C]',
    Pioneer: 'bg-[#54E584]',
    Champion: 'bg-[#79CEFF]',
    Hero: 'bg-[#BD6DFF]',
    Legend: 'bg-[#FFA459]',
  };
  return colors[tier as keyof typeof colors] || colors.null;
};

export const SwipeCarousel = ({ blockContent }: { blockContent: CarouselProps[] }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === blockContent.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [blockContent.length, dragX]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < blockContent.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className='relative mt-10 h-auto max-w-[632px] overflow-hidden bg-transparent'>
      <motion.div
        drag='x'
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX }}
        animate={{ translateX: `-${imgIndex * 100}%` }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className='z-10 flex h-auto w-full cursor-grab items-center active:cursor-grabbing'
      >
        <Blocks imgIndex={imgIndex} blockContent={blockContent} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} blockContent={blockContent} />
    </div>
  );
};

const Blocks = ({ imgIndex, blockContent }: { imgIndex: number; blockContent: CarouselProps[] }) => {
  return (
    <>
      {blockContent.map((value, index) => (
        <motion.div
          key={index}
          animate={{ scale: imgIndex === index ? 1 : 0.55 }}
          transition={SPRING_OPTIONS}
          style={{ transform: 'none' }}
          className={`relative flex h-full w-full shrink-0 flex-col rounded-xl bg-uiDarkGray`}
        >
          <div className={`h-10 w-full rounded-t-xl px-5 py-2.5 text-uiBlack ${calculateBgColor(value.tier)}`}>
            <p className='text-base font-semibold'>{value.headerText}</p>
          </div>

          <div className='flex h-full w-full flex-grow flex-col p-5'>
            <div className='flex h-full w-full flex-col gap-y-5'>
              <div className='flex h-full w-full flex-row items-center justify-between gap-y-2'>
                <p className='text-base'>Starting from</p>
                <p className='text-base font-semibold'>
                  <span className='text-uiLime'>{value.startFrom.toLocaleString()}</span> UNAI
                </p>
              </div>

              <div className='flex h-full w-full flex-col gap-y-2.5'>
                <p className='text-base font-semibold'>Features:</p>
                <div className='h-fit w-full rounded-[8px] bg-uiPrimaryLightGray p-2.5 text-center'>
                  <p className='text-xs font-medium'>2 public daily videos</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export type DotsProps = {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  blockContent: CarouselProps[];
};

const Dots = ({ blockContent, imgIndex, setImgIndex }: DotsProps) => {
  return (
    <div className='mt-4 flex w-full justify-center gap-2'>
      {blockContent.map((_, index) => {
        return (
          <button
            key={index}
            onClick={() => setImgIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors ${index === imgIndex ? 'bg-uiLime' : 'bg-white'}`}
          />
        );
      })}
    </div>
  );
};
