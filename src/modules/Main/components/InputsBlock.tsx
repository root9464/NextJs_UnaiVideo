import { ArrowUoIcon } from '@public/tsx/ArrowUoIcon';
import { SetValuePromptFunction } from '../Module';
import { ImageINput } from '../widgets/ImageInput';

export const InputsBlock = ({ setterPrompt }: { setterPrompt: SetValuePromptFunction }) => (
  <div className='flex h-[40px] w-full flex-row items-center justify-between gap-x-4'>
    <ImageINput setterPrompt={setterPrompt} />
    <input
      type='text'
      placeholder='Submit a text prompt'
      className='h-full flex-grow rounded-[4px] bg-white px-4 py-2 text-black outline-none'
      onChange={(e) => setterPrompt({ prompt: e.target.value })}
    />

    <button onClick={() => console.log('submit')} className='flex h-full w-[40px] items-center justify-center rounded-[4px] bg-white'>
      <ArrowUoIcon fill='black' />
    </button>
  </div>
);
