'use client'
import '@/css/about.css';
import { AiOutlineGithub, AiOutlineDiscord, AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import { useTranslations } from 'next-intl';
import Social from '@/components/Social';
import { gsapMultiText, gsapLeftElement } from '@/components/Animation';
import { useEffect, useRef } from 'react';

interface TD {
  text: string,
  duration: number,
}

export default function About() {
  const t = useTranslations('about');
  const elements:TD[] = [
    {text: t('title'), duration: .8},
    {text: t('text'), duration: 2.5},
    {text: t('content1.title'), duration: 1},
    {text: t('content2.title'), duration: 1},
    {text: t('content3.title'), duration: 1},
  ];
  const refs = elements.map(() => useRef<HTMLDivElement>(null));

  useEffect(() => {
    gsapMultiText(elements, refs)
    gsapLeftElement('.icon', 2.8, 1.4, 0.5)
    gsapLeftElement('.skills', 2.5, 3.6, 0.5)
    gsapLeftElement('.other', 2.5, 5.4, 0.5)
  }, [])

  return (
    <main className='flex justify-center'>
      <div className='relative flex flex-col sm:w-3/5 w-11/12 z-0'>
        <div className='min-w-full'>
          <div className='subject'>
            <div className='maintitle' ref={refs[0]}></div>
            <div className='content' ref={refs[1]}></div>
          </div>
          <div className='subject'>
            <div className='title' ref={refs[2]}></div>
            <div className='content icon flex flex-row-reverse justify-end gap-7 text-4xl'>
              <Social href={`https://linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDINID}`} icon={<AiOutlineLinkedin/>}/>
              <Social href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAMID}`} icon={<AiOutlineInstagram/>}/>
              <Social href={`https://discordapp.com/users/${process.env.NEXT_PUBLIC_DISCORDID}`} icon={<AiOutlineDiscord/>}/>
              <Social href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUBID}`} icon={<AiOutlineGithub/>}/>
            </div>
          </div>
          <div className='subject'>
            <div className='title' ref={refs[3]}></div>
            <div className='content skills'>{t('content2.text1')}</div>
            <div className='content skills'>{t('content2.text2')}</div>
            <div className='content skills'>{t('content2.text3')}</div>
            <div className='content skills'>{t('content2.text4')}</div>
          </div>
        </div>
      </div>
    </main>
  );
};
