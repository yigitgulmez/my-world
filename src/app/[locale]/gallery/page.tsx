'use client'
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { gsapBottomElement, gsapText, GalleryComp } from '@/components';
import { list } from '@/utils';
import { TD } from '@/types';
import { useGSAP } from '@gsap/react';

export default function Gallery() {
  const t = useTranslations('gallery');
  const elements: TD[] = [{ text: t('title'), duration: 0.8 }];
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const title = useRef<HTMLHeadingElement>(null);
  const scope = useRef(null);

  useGSAP(() => {
    gsapText(elements, [title.current]);
    gsapBottomElement(galleryRefs.current, 1, 0, 0.1);
  }, { scope });

  return (
    <main className='relative flex flex-col w-full h-full mb-24'>
      <div
        ref={scope}
        className='w-full flex flex-col items-center'
      >
        <div className='sm:w-3/5 w-11/12 sm:mb-10 mb-0'>
          <h1 
            className='sm:text-5xl text-4xl' 
            ref={title}
          ></h1>
        </div>
        <div 
          className='gap-5 xs:columns-2 sm:columns-3 xl:columns-4 4xl:columns-8 
          [&>div:not(:first-child)]:mt-5 justify-items-center p-8'
        >
          {list.map((item, index) => (
            <div 
              ref={el => { galleryRefs.current[index] = el; }} 
              key={index}
              className='invisible'
            >
              <GalleryComp 
                img={item.img} 
                alt={item.alt} 
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
