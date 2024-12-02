import { Menu } from '@/components/Menu';
import { MainPageFlow } from '@modules/Main/Module';

export default function Home() {
  return (
    <div className='relative h-screen min-h-screen w-full'>
      <MainPageFlow />
      <Menu />
    </div>
  );
}
