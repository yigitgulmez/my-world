import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
interface Props {
  img: { name: string; url: string }[] | string;
  title: string;
  description: string;
  url: string;
  href: string;
  isLive: boolean;
}
const ProjectComp: React.FC<Props> = ({ img, title, description, url, href, isLive}) =>  {
  const t = useTranslations('projects');
  const mainClass = {
    className: 'flex rounded-xl transition-all sm:min-w-auto min-w-[380px] sm:w-[500px] max-w-[500px] max-h-[450px] from-black/60 bg-purple-800/60 bg-gradient-to-t backdrop-blur-sm lg:hover:-translate-y-10 lg:hover:z-10 z-0 transition-all duration-500 shadow-2xl font-FiraCode select-none'
  };
  const content = (
    <div className='w-full h-full p-1'>
      <div className='flex items-center justify-center'>
        <Image src={Array.isArray(img) ? img[0]?.url : img} alt={title} width={1000} height={1000} className='rounded-lg w-full max-h-[280px] object-contain'/>
      </div>
      <div className='flex flex-col justify-center w-full px-4 pb-7'>
        <div className='text-3xl h-8 mb-3 mt-5 whitespace-nowrap '>{title}</div>
        <div className='text-lg w-full h-16 text-neutral-400 break-words'>{description}</div>
      </div>
    </div>
  );

  return (
    <div {...mainClass}>
      {isLive ? <Link className='cursor-pointer' href={href}>{content}</Link> : 
      <><div className='flex justify-center items-center fixed w-full h-full bg-black/80 rounded-xl text-3xl'>
        {t('live')}
      </div>{content}</>}
    </div>
  );
};

export default ProjectComp;