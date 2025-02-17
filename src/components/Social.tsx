import { ReactNode } from 'react';

interface Props {
  href: string;
  icon: ReactNode;
}

const Social = ({ href, icon }: Props) => {
  return (
    <div className='flex icon items-center select-none'>
      <a href={href} target='_blank' rel="noopener noreferrer" className='w-100 h-100 text-4xl animate-pulse2'>{icon}</a>
    </div>
  );
};

export default Social;