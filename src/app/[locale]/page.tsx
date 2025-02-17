'use client'
import NavBar from '@/components/HomeNavBar';
import { useTranslations } from 'next-intl';
import { FaCode } from 'react-icons/fa6';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { useEffect, useRef, useState } from 'react';
import { gsapFadeElement, gsapLeftElement, gsapText } from '@/components/Animation';
import { useLocale } from 'next-intl';

export default function Home() {
  const [longWeight, setLongWeight] = useState(Boolean)
  const locale = useLocale();
  const t = useTranslations('home');
  const title = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const USERNAME = process.env.NEXT_PUBLIC_USERNAME;
  useEffect(() => {
    gsapText(title, 1, USERNAME as string, 0.5)
    gsapText(content, 1, t('welcome'), 1)
    gsapFadeElement(".lang", 1, 1)
    gsapLeftElement(".list", 2.8, 1, 0.3)
  }, [])
  
  useEffect(() => {
    locale == 'tr' ? setLongWeight(true) : setLongWeight(false)
  }, [locale])
  return (
    <main className='flex w-full h-full justify-center items-center'>
      <div className='flex flex-col items-center justify-center w-full h-full px-10 z-0'>
        <div className={`xs:scale-100 scale-90 h-[260px] sm:h-[160px] min-w-[400px] ${longWeight ? 'lg:w-[590px]' : 'lg:w-[500px] '}`}>
          <div className='flex gap-2'>
            <div className='flex gap-4 lg:text-6xl text-5xl mb-5 text-gray-300'>
              <div className='animate-transformX--100'>
                <FaCode/>
              </div>
              <h1 ref={title}></h1>
            </div>
            <div className='lang flex items-end pb-4 text-lg rounded'>
              <LocaleSwitcher/>
            </div>
          </div>
          <p className='mb-4 lg:text-xl text-base text-gray-300 min-h-6' ref={content}></p>
          <NavBar/>
        </div>
      </div>
    </main>
  );
}