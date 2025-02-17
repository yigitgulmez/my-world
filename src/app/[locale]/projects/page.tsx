'use client'
import { gsapBottomElement, gsapRightElement, gsapRotateCounterClockwise } from '@/components/Animation';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { SlRefresh } from 'react-icons/sl';
import { RiRefreshLine } from "react-icons/ri";
import ProjectComp from '@/components/ProjectComp';
import { useFetchProjects } from '@/utils/getproject';
import { ProjectData } from '@/utils/interface';
import { useDataUtils } from '@/utils/datautils';

const GITHUB_OWNER = process.env.GITHUB_OWNER;

export default function Projects() {
  const locale = useLocale();
  const t = useTranslations('projects');
  const { fetchProjects } = useFetchProjects();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectData[] | undefined>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const THIRTY_MINUTES = 30 * 60 * 1000;
  const FIVE_MINUTES = 5 * 60 * 1000;
  const [remainingTime, setRemainingTime] = useState(0);
  const { readFile } = useDataUtils();

  const refresh = async () => {
    setIsLoading(true);
    try {
      await fetchProjects();
      const read = await readFile();
      setProjects(read?.data);
      setIsError(Boolean(read?.error));
      localStorage.setItem('lastRefresh', Date.now().toString());
    }
    finally {
      setIsLoading(false);
    }
  }

  const refreshClick = async () => {
    await refresh();
    localStorage.setItem('lastButtonClick', Date.now().toString());
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), FIVE_MINUTES);
  }

  const firstLoad = async () => {
    setIsLoading(true);
    const lastRefresh = localStorage.getItem('lastRefresh');
    if (lastRefresh) {
      const timeSinceLastRefresh = Date.now() - parseInt(lastRefresh, 10);
      if (timeSinceLastRefresh >= THIRTY_MINUTES) {
        await refresh();
        return;
      }
    }
    try {
      const read = await readFile();
      setProjects(read?.data);
    } catch (error) {}
    setIsLoading(false);
  };
  
  useEffect(() => {
    const lastButtonClick = localStorage.getItem('lastButtonClick');
    if (lastButtonClick) {
      const timeSinceLastClick = Date.now() - parseInt(lastButtonClick, 10);
      if (timeSinceLastClick < FIVE_MINUTES) {
        setIsButtonDisabled(true);
        setRemainingTime(Math.ceil((FIVE_MINUTES - timeSinceLastClick) / 1000));
        setTimeout(() => setIsButtonDisabled(false), FIVE_MINUTES - timeSinceLastClick);
      }
    }
    gsapRightElement('.refresh', 2, 0, 0)
    gsapBottomElement('.project', 1, 0, 0.1);
    gsapRotateCounterClockwise('.rotate', 1.8, -360);
  }, [isLoading, isError, projects]);
  
  useEffect(() => {
    firstLoad();
    const interval = setInterval(refresh, THIRTY_MINUTES);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isButtonDisabled) return;
  
    const timer = setInterval(() => {
      setRemainingTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  useEffect(() => {
    
    isButtonDisabled ? document.getElementById('refresh')?.classList.add('text-gray-500') : document.getElementById('refresh')?.classList.add('rotate')
    !isButtonDisabled ? document.getElementById('refresh')?.classList.remove('text-gray-500') : document.getElementById('refresh')?.classList.remove('rotate')
  }, [isButtonDisabled])
  

  const pageLoading = (
    <main className='flex justify-center'>
      <div className='flex justify-center items-center text-4xl w-[80vw] h-[70vh] bg-black/20 rounded-2xl'><RiRefreshLine className='animate-spin'/></div>
    </main>
  )

  const pageError = (
    <main className='flex justify-center'>
      <div className='relative w-[80vw] h-[70vh] bg-black/20 rounded-2xl'>
        <div className='absolute top-10 right-10 refresh'>
          <button onClick={refreshClick} className='sm:text-4xl text-3xl rotate'><SlRefresh/></button>
        </div>
        <div className='flex justify-center items-center text-4xl w-full h-full'>
          <div className='flex justify-center items-center flex-col gap-10'>
            <div className='sm:text-xl text-xs w-4/5 text-center'>
              <p>{t('error')}</p>
              <p>↓</p>
            </div>
            <a href={`https://github.com/${GITHUB_OWNER}`} target='_blank' rel='noopener noreferrer'>
              <img src={`https://gh-readme-profile.vercel.app/api?username=${GITHUB_OWNER}&theme=highcontrast`} alt='github card'/>
            </a>
          </div>
        </div>
      </div>
    </main>
  )

  const pageMain = (
    <main className='flex flex-col items-center w-full h-full'>
      <div className='w-10/12 sm:mb-12 mb-0'>
        <div className='flex justify-end'>
          <div className='text-center refresh'>
            <button id='refresh' disabled={isButtonDisabled} onClick={refreshClick} className={`sm:text-4xl text-3xl  ${isButtonDisabled ? 'text-gray-500' : 'rotate'}`}><SlRefresh/></button>
            <p>{isButtonDisabled ? remainingTime : ''}</p>
          </div>
        </div>
      </div>
      <div className='grid sm:grid-cols-custom justify-items-center gap-10 sm:px-8 px-0 w-full'>
        {projects?.map((item, index) => (
          <div className='project sm:scale-100 scale-90' key={index}>
            <ProjectComp
              img={item.img || 'https://www.svgrepo.com/show/475820/image.svg'}
              title={item.title}
              description={item.description}
              url={item.url}
              href={`/${locale}/projects/${item.title.toLowerCase()}`}
              isLive={item.live}
            />
          </div>
        ))}
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