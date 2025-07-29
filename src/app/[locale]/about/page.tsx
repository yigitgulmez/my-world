'use client'
import '@/css/about.css';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsapText, gsapLeftElement, Social, Skill } from '@/components';
import { TD } from '@/types';
import { config } from '@/utils';
import { useGSAP } from '@gsap/react';
import { TbFileTypeSql } from 'react-icons/tb';
import { FaReact } from 'react-icons/fa6';

export default function About() {
  const t = useTranslations('about');
  const elements:TD[] = [
    {text: t('title'), duration: .8},
    {text: t('text'), duration: 2.5},
    {text: t('content1.title'), duration: 1},
    {text: t('content2.title'), duration: 1},
  ];
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const socialRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scope = useRef(null);

  useGSAP(() => {
    gsapText(elements, textRefs.current)
    gsapLeftElement(socialRefs.current, 2, .8, .35)
    gsapLeftElement(skillRefs.current, 2.2, .8, .25)
  }, {scope})

  const list = {
    className: `about-content invisible`
  }

  return (
    <main className='flex justify-center'>
      <div className='relative flex flex-col sm:w-3/5 w-11/12 z-0'>
        <div 
          className='min-w-full'
          ref={scope} 
        >
          <div className='about-subject'>
            <div className='about-maintitle' ref={(el) => { textRefs.current[0] = el }}></div>
            <div className='about-content' ref={(el) => { textRefs.current[1] = el }}></div>
          </div>
          <div className='about-subject'>
            <div className='about-title' ref={(el) => { textRefs.current[2] = el }}></div>
            <div className='about-content flex flex-row-reverse justify-end gap-7 text-4xl'>
              {config.socials.map(({ href, icon: Icon }, i) => (
                <Social
                  key={i}
                  href={href}
                  ref={el => { socialRefs.current[i] = el; }}
                  icon={<Icon />}
                />
              ))}
            </div>
          </div>
          <div className='about-subject'>
            <div className='about-title' ref={(el) => { textRefs.current[3] = el }}></div>
            <div className='flex flex-row-reverse flex-wrap gap-5 justify-end sm:scale-100 scale-90'>
              {config.skills.map(({ icon: Icon }, i) => (
                <Skill
                  key={i}
                  ref={el => { skillRefs.current[i] = el; }}
                  icon={<Icon />}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
