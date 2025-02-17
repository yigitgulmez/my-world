'use client'
import { ReactNode, useEffect, useRef, useState } from 'react';
import { RiRefreshLine } from 'react-icons/ri';
import { AiOutlineGithub } from 'react-icons/ai';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { gsapBottomElement, gsapFadeElement, gsapMultiText, gsapRightElement } from '@/components/Animation';
import { useDataUtils } from '@/utils/datautils';
import { ProjectData } from '@/utils/interface';
import Reactmarkdown from 'react-markdown'; 
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Social from '@/components/Social';
import linkLists from '@/utils/linklist';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/css/swiper.css';

const GITHUB_OWNER = process.env.GITHUB_OWNER;

interface TD {
  text: string | undefined,
  duration: number,
}

export default function ProjectDetailPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop() as string;
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('projects');
  const [project, setProject] = useState<ProjectData>();
  const link = linkLists[id] || [];
  const { readFile } = useDataUtils();

  const content = {
    className: 'sm:w-full w-11/12 scale-90 sm:scale-100 my-0 lg:mt-20 flex flex-col gap-10 justify-center items-center'
  }
  const scroll = {
    className: 'from-black/60 bg-purple-800/60 bg-gradient-to-tl backdrop-blur-sm shadow-2xl rounded-s-3xl p-10 max-h-[70vh] prose md:prose-lg prose-sm w-full lg:max-w-4xl overflow-y-auto content'
  }

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        const read = await readFile();
        setProject(read?.data.find(Data => Data.title === id));
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchProjectData();
  }, []);

  const elements:TD[] = [
    {text: project?.title, duration: 0.8},
    {text: project?.description, duration: 1},
  ];

  const refs = elements.map(() => useRef<HTMLDivElement>(null));

  useEffect(() => {
    gsapMultiText(elements, refs);
    gsapRightElement('.icon', 2, 1, .5)
    gsapFadeElement('.image', 2, 1.8)
    gsapBottomElement('.content', 2, 1.8, .7)
  }, [isLoading, isError, project]);


  const pageLoading = (
    <main className='flex justify-center'>
      <div className='flex justify-center items-center text-4xl w-[80vw] h-[70vh] bg-black/20 rounded-2xl'><RiRefreshLine className='animate-spin'/></div>
    </main>
  )

  const pageError = (
    <main className='flex justify-center'>
      <div className='relative w-[80vw] h-[70vh] bg-black/20 rounded-2xl'>
        <div className='flex justify-center items-center text-4xl w-full h-full'>
          <div className='flex justify-center items-center flex-col gap-10'>
            <div className='sm:text-xl text-xs w-4/5 text-center'>
              <p>{t('error')}</p>
              <p>↓</p>
            </div>
            <a href={`https://github.com/${GITHUB_OWNER}`} target='_blank' rel='noopener noreferrer'>
              <img src='https://gh-readme-profile.vercel.app/api?username=yigitgulmez&theme=highcontrast' alt='github card'/>
            </a>
          </div>
        </div>
      </div>
    </main>
  )

  const pageMain = (
    <main className='flex flex-col items-center w-full mb-24 overflow-hidden'>
      <div className='mdx:w-2/3 w-11/12 scale-90 sm:scale-100'>
        <div className='flex justify-between '>
          <div className='sm:pe-16 pe-12'>
            <h1 className='sm:text-4xl text-3xl mb-6' ref={refs[0]}></h1>
            <p className='text-sm sm:text-base' ref={refs[1]}></p>
          </div>
          <div className='flex flex-row-reverse justify-end gap-7 text-4xl'>
            {link.map((item: {href: string, icon: ReactNode}, index: number) => (
              <Social key={index} href={item.href} icon={item.icon} />
            ))}
          </div>
        </div>
      </div>
      {project?.img ? <div className='lg:mt-20 mt-10 w-full image'>
        <Swiper
        modules={[ Navigation ]}
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            950: {
              slidesPerView: 1.8,
            },
            0: {
              slidesPerView: 1,
            }
          }}
          navigation
          centeredSlides={true}
          scrollbar={{ draggable : true }}
          className='w-full select-none'
        >
          {project?.img.map((item: {url: string, name: string}, index: number) => (
          <SwiperSlide key={index}><Image src={item.url} width={1000} height={1000} className='h-[500px] object-contain flex items-center justify-center' alt={item.name}/></SwiperSlide>
          ))}
        </Swiper>
      </div>
      :
      <></>}
      <div {...content}>
        {project?.readme ? 
        <div {...scroll}>
          <Reactmarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{project?.readme}</Reactmarkdown>
        </div>
        : <></>}
        {project?.changelog ?
        <div {...scroll}>
          <Reactmarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{project?.changelog}</Reactmarkdown>
        </div>
        : <></>}
      </div>
    </main>)

  return (
    <>
      {isLoading && pageLoading}
      {isError && !isLoading && pageError }
      {!isLoading && !isError && pageMain}
    </>
  )
};