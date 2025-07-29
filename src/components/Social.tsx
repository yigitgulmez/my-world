import { SocialProps } from '@/types';
import { forwardRef } from 'react';

function Social ({ href, icon }: SocialProps, ref: React.Ref<HTMLDivElement> ) {
  return (
    <div 
      className='flex items-center select-none invisible'  
      ref={ref} 
    >
      <a 
        href={href} target='_blank' rel='noopener noreferrer' 
        className='text-4xl animate-pulse2'
        >
          {icon}
      </a>
    </div>
  );
};

export default forwardRef(Social);