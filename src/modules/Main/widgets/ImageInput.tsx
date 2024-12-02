import { ImageIcon } from '@public/tsx/ImageIcon';
import { SetValuePromptFunction } from '../Module';

export const ImageINput = ({ setterPrompt }: { setterPrompt: SetValuePromptFunction }) => (
  <div className='relative h-full w-8'>
    <ImageIcon width='40px' height='40px' stroke='white' />
    <input
      onChange={(e) => setterPrompt({ first_frame_image: e.target.files?.[0] })}
      type='file'
      className='absolute left-0 top-0 h-full w-[40px] border-none bg-transparent text-transparent outline-none file:h-full file:w-[40px] file:border-none file:bg-transparent file:text-transparent file:outline-none'
    />
  </div>
);
