'use client'
import 'swiper/css';
import 'swiper/css/navigation';
import '@/css/swiper.css';
import { useEffect, useRef, useState } from 'react';
import { RiRefreshLine } from 'react-icons/ri';
import { useLocale, useTranslations } from 'next-intl';
import { redirect, usePathname } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { gsapBottomElement, gsapFadeElement, gsapRightElement, gsapText, gsapTopElement, Social } from '@/components';
import { getProjectByTitleWithSession, linkLists, config } from '@/utils';
import { ProjectData, TD } from '@/types';
import { useRouter } from 'next/navigation';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import Reactmarkdown from 'react-markdown'; 
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { useGSAP } from '@gsap/react';

export default function Project() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const id = pathname.split('/').pop() as string;
  const [project, setProject] = useState<ProjectData | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('projects');
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const errText = useRef<HTMLDivElement | null>(null);
  const socialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scope = useRef(null);
  
  if (linkLists[id] && socialRefs.current.length !== linkLists[id].length) {
    socialRefs.current = Array(linkLists[id].length).fill(null);
  }

  const elements:TD[] = [];
  
  if (project?.title) elements.push({ text: project.title, duration: 0.8 });
  if (project?.description) elements.push({ text: project.description, duration: 1 });

  useEffect(() => {
    async function fetchProjectData() {
      setIsLoading(true);
      try {
        const data = await getProjectByTitleWithSession(id);
        !data && setIsError(true);
        !data?.live && router.push(`/${locale}/403`);
        setProject(data);
      } catch {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchProjectData();
  }, [id]);
  
  useGSAP(() => {
    if (!project) return;
  
    gsapText(elements, textRefs.current);
    gsapRightElement(socialRefs.current, 2, 1, 0.4);
  
    if (project?.img?.length) {
      gsapFadeElement([imageRef.current], 2, 1.2, 0);
    }
  
    if (content || readme || changelog) {
      gsapBottomElement(contentRefs.current, 2, 1.5, 0.5);
    }
  }, { dependencies: [project], scope });
  
  useGSAP(() => {
    if (!isError) return;
    gsapTopElement([errText.current], 2, 0, 0.7);
  }, { dependencies: [isError], scope });

  const scroll = {
    className: `bg-transparent max-h-[70vh] max-w-6xl overflow-y-auto p-5 prose sm:prose-base prose-sm prose-invert scale-90
    prose-img:rounded-xl prose-p:text-white prose-li:marker:text-white prose-li:text-white prose-headings:mb-4`
  }

  const title = project?.title ? (
    <h1 className='text-3xl xs:text-4xl sm:text-5xl mb-6' ref={(el) => { textRefs.current[0] = el }}></h1>
  ) : null;

  const description = project?.description ? (
    <p className='text-sm xs:text-base sm:text-lg' ref={(el) => { textRefs.current[1] = el }}></p>
  ) : null;

  const linkList = linkLists[id].map((item, i) => {
    const Icon = item.icon;
    return (
      <Social
        key={i}
        ref={el => { socialRefs.current[i] = el; }}
        href={item.href}
        icon={<Icon />}
      />
    );
  });

  const images = project?.img && project?.img.length ? (
    <div ref={imageRef} className='-my-32 sm:-my-16 mdx:-my-24 2xl:mb-20 w-full min-[700px] xl:mt-0'>
      <Swiper
        modules={[Navigation]}
        speed={1000}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          950: { slidesPerView: 1.8 },
          0: { slidesPerView: 1 }
        }}
        navigation
        centeredSlides={true}
        scrollbar={{ draggable: true }}
        className='w-full select-none'
      >
        {project.img.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={item.url}
              width={1000}
              height={1000}
              className='h-[700px] object-contain w-full flex items-center justify-center '
              alt={item.name}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null

  const contentList = [];

  for (let i = 1; ; i++) {
    const titleKey = (t.has(`${id}.title${i}`)) ? `${id}.title${i}` : null;
    const contentKey = (t.has(`${id}.content${i}`)) ? `${id}.content${i}` : null;
    if (!titleKey || !contentKey) break;
    const title = t(titleKey);
    const content = t(contentKey);
    contentList.push({ title, content });
  }

  const content = contentList.length ? (
    contentList.map((item, i) => {
      return (
        <div className='md:w-3/4 w-11/12'>
          <p 
            ref={(el) => { contentRefs.current[i * 2] = el }}
            className='text-2xl sm:text-3xl invisible mb-4'
            >
            {item.title}
          </p>
          <div
            ref={(el) => { contentRefs.current[i * 2 + 1] = el }}
            className='invisible text-sm sm:text-base mb-4'
          >
            <li>{item.content}</li>
          </div>
        </div>
      );
    })
  ) : null;
  
  const readmeContent = locale === 'tr'
  ? (project?.readmeTR?.trim() || project?.readme?.trim())
  : project?.readme?.trim();

  const readme = readmeContent ? (
    <div ref={(el) => { contentRefs.current[contentList.length] = el }} {...scroll}>
      <Reactmarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
      >
        {readmeContent}
      </Reactmarkdown>
    </div>
  ) : null;

  const changelogContent = locale === 'tr'
    ? (project?.changelogTR?.trim() || project?.changelog?.trim())
    : project?.changelog?.trim();

  const changelog = (locale === 'tr' ? (project?.changelogTR?.trim() ? project?.changelogTR?.trim() : project?.changelog?.trim()) : project?.changelog?.trim()) ? (
    <div ref={(el) => { contentRefs.current[contentList.length * 2 + 1] = el }} {...scroll}>
      <Reactmarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}>
        {changelogContent}
      </Reactmarkdown>
    </div>
  ) : null
  
  const pageLoading = (
    <main className='flex justify-center'>
      <div className='flex justify-center items-center text-4xl w-[80vw] h-[70vh] bg-black/20 rounded-2xl'>
        <RiRefreshLine className='animate-spin'/>
      </div>
    </main>
  )
  
  const pageMain = (
    <main 
      ref={scope}
      className='flex flex-col items-center w-full overflow-hidden mb-10 sm:mb-20'
    >
      <div className={`mdx:w-2/3 w-11/12 ${images ? 'mb-0' : 'mb-10 sm:mb-20'}`}>
        <div className='flex justify-between md:mb-10'>
          <div className='sm:pe-16 pe-12 z-10'>
            {title}
            {description}
          </div>
          <div className='flex flex-row-reverse justify-end gap-7'>
            {linkList}
          </div>
        </div>
      </div>
      {images}
      <div className='w-11/12 flex flex-col gap-10 justify-center items-center xs:mt-0 -pt-32 z-10'>
        {content}
        {readme}
        {changelog}
      </div>
    </main>
  )

  const pageError = (
    <main className='flex justify-center'>
      <div className='relative w-[80vw] h-[70vh] bg-black/20 rounded-2xl'>
        <div className='flex justify-center items-center text-4xl w-full h-full'>
          <div className='flex justify-center items-center flex-col gap-10'>
            <div ref={errText} className='sm:text-xl text-xs w-4/5 text-center'>
              <p>{t('error')}</p>
              <p>↓</p>
            </div>
            <a href={`https://github.com/${config.githubOwner}`} target='_blank' rel='noopener noreferrer'>
              <img
                src={`https://gh-readme-profile.vercel.app/api?username=${config.githubOwner}&theme=highcontrast`}
                alt='github card'
              />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
  return (
    <>
      {isLoading && pageLoading}
      {isError && !isLoading && pageError }
      {!isLoading && !isError && pageMain}
    </>
  );
}
