import { useTranslations } from 'next-intl';
import { ProjectsComponentProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectComp ({ img, title, description, href, isLive}:ProjectsComponentProps) {
  const t = useTranslations('projects');
  const mainClass = {
  className: `w-[450px] h-[410px] flex rounded-xl transition-all
    from-black/60 bg-purple-800/60 bg-linear-to-t backdrop-blur-xs
    lg:hover:-translate-y-8 lg:hover:z-10 z-0 transition-all duration-500 
    shadow-2xl font-Fira-code select-none`
  };
  
  const content = (
    <div className='w-full h-full p-1'>
      <div className='flex justify-center text-center'>
        <div className='relative w-full'>
            <Image
              src={Array.isArray(img) ? img[0]?.url : img}
              alt={title}
              width={1000}
              height={1000}
              className='rounded-lg w-full object-contain max-h-[250px]'
            />
        </div>
      </div>

      <div className='flex flex-col justify-center w-full px-4 pb-7'>
        <div className='text-3xl h-8 mb-3 mt-5 whitespace-nowrap'>{title}</div>
        <div className='text-lg w-full h-16 text-neutral-400 break-words'>{description}</div>
      </div>
    </div>
  );

  return (
    <div {...mainClass}>
      {isLive ? <Link className='cursor-pointer w-full h-full z-0' href={href}>{content}</Link> : 
      <><div className='flex justify-center items-center fixed w-full h-full bg-black/80 rounded-xl text-3xl z-10'>
        {t('live')}
      </div>{content}</>}
    </div>
  );
};