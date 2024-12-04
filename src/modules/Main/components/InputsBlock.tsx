import { ArrowUoIcon } from '@public/tsx/ArrowUoIcon';
import { SetValuePromptFunction } from '../Module';
import { ImageINput } from '../widgets/ImageInput';

type InputsBlockProps = {
  value: string;
  setterPrompt: SetValuePromptFunction;
  submitPrompt: () => void;
};

export const InputsBlock = ({ setterPrompt, submitPrompt, value }: InputsBlockProps) => (
  <div className='flex h-[40px] w-full flex-row items-center justify-between gap-x-4'>
    <ImageINput setterPrompt={setterPrompt} />
    <input
      type='text'
      placeholder='Submit a text prompt'
      className='h-full flex-grow rounded-[4px] bg-white px-4 py-2 text-black outline-none'
      onChange={(e) => setterPrompt({ prompt: e.target.value })}
      value={value}
    />
    <button
      onClick={() => {
        submitPrompt();
        setterPrompt({ prompt: '', first_frame_image: null, prompt_optimizer: false });
      }}
      className='flex h-full w-[40px] items-center justify-center rounded-[4px] bg-white'
    >
      <ArrowUoIcon fill='black' />
    </button>
  </div>
);
