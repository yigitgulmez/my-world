'use client'
import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { RiRefreshLine } from 'react-icons/ri';
import { gsapBottomElement, gsapTopElement, ProjectComp } from '@/components';
import { getProjectsWithSession, config } from '@/utils';
import { ProjectData } from '@/types';
import { useGSAP } from '@gsap/react';

export default function Projects() {
  const locale = useLocale();
  const t = useTranslations('projects');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectData[] | null>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const errText = useRef<HTMLDivElement | null>(null);

  async function firstLoad() {
    setIsLoading(true);
    try {
      const data = await getProjectsWithSession();
      !data && setIsError(true);
      setProjects(data);
    } catch {
      setIsError(true);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    firstLoad();
  }, []);

  useGSAP(() => {
    if (!projects) return;
    gsapBottomElement(projectRefs.current, 1, 0, 0.1);
  }, { dependencies: [projects] });
  
  useGSAP(() => {
    if (!isError) return;
    gsapTopElement([errText.current], 1, 0.5, 0.1);
  }, { dependencies: [isError] });
  
  const pageLoading = (
    <main className='flex justify-center'>
      <div className='flex justify-center items-center text-4xl w-[80vw] h-[70vh] bg-black/20 rounded-2xl'>
        <RiRefreshLine className='animate-spin'/>
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

  const pageMain = (
    <main 
      className='flex flex-col sm:grid sm:grid-cols-custom justify-items-center items-center sm:mt-7
      sm:px-8 sm:py-0 w-full sm:scale-100 xs:scale-[80%] scale-75 sm:my-0 2xl:mb-20 -my-36'
    >
      {projects?.map((item, index) => (
        <div ref={el => { projectRefs.current[index] = el; }} key={index} className='mb-10 invisible'>
          <ProjectComp
            img={item.img.length ? item.img : 'https://www.svgrepo.com/show/475820/image.svg'}
            title={item.title}
            description={item.description}
            href={`/${locale}/projects/${item.title.toLowerCase()}`}
            isLive={item.live}
          />
        </div>
      ))}
      <div className='sm:h-20'/>
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