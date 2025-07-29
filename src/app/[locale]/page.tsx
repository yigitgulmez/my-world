'use client'
import { useTranslations, useLocale } from 'next-intl';
import { FaCode } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { gsapFadeElement, gsapLeftElement, gsapText, HomeNavBar, LocaleSwitcher } from '@/components';
import { config } from '@/utils';
import { useGSAP } from "@gsap/react";

export default function Home() {
  const [longWeight, setLongWeight] = useState(Boolean)
  const locale = useLocale();
  const t = useTranslations('home');
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listRef = useRef<(HTMLDivElement | null)[]>([]);
  const langRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const scope = useRef(null);
  const elements = [
    { text: config.username, duration: 1 },
    { text: t('welcome'), duration: 1 }
  ];
  useGSAP(() => {
    gsapText(elements, textRefs.current);
    gsapFadeElement([langRef.current], 1, .8, 0)
    gsapLeftElement([iconRef.current], 1, 0, 0)
    gsapFadeElement(listRef.current, 1, 0, .35)
  }, { scope });

  useEffect(() => {
    locale == 'tr' ? setLongWeight(true) : setLongWeight(false)
  }, [locale])
  return (
    <main className='absolute flex flex-col items-center justify-center w-full h-full'>
      <div className='flex flex-col items-center justify-center w-full h-full px-10 z-0'>
        <div
          ref={scope} 
          className={`xs:scale-100 scale-90 h-[260px] sm:h-[160px] min-w-[400px] 
          ${longWeight ? 'lg:w-[590px]' : 'lg:w-[500px] '}`}
        >
          <div className='flex gap-2'>
            <div className='flex gap-4 md:text-6xl text-5xl mb-5 text-gray-300'>
              <div ref={iconRef} className='invisible'>
                <FaCode/>
              </div>
              <h1 ref={(el) => { textRefs.current[0] = el }}></h1>
            </div>
            <div ref={langRef} className='flex items-end pb-4 text-lg rounded-sm invisible'>
              <LocaleSwitcher/>
            </div>
          </div>
          <p 
            className='mb-4 md:text-xl text-base text-gray-300 min-h-6' 
            ref={(el) => { textRefs.current[1] = el }}
          ></p>
          <div>
            <HomeNavBar ref={listRef}/>
          </div>
        </div>
      </div>
    </main>
  );
}