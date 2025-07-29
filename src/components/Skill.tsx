import { forwardRef } from 'react';
import { SkillProps } from '@/types';

const Skill = forwardRef<HTMLDivElement, SkillProps>(({ icon }, ref) => {
  return (
    <div
      className=' rounded-xl text-4xl border-2 px-4 py-2 flex items-center justify-center border-violet-500 invisible bg-black/20 backdrop-blur-[5px]'
      ref={ref}
    >
      <span className='select-none'>
        {icon}
      </span>
    </div>
  );
});

export default Skill;
