'use client'
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import list from '@/utils/gallerylist';
import { gsapBottomElement, gsapText } from '@/components/Animation';
import GalleryComp from '@/components/GalleryComp';

export default function Gallery() {
  const t = useTranslations('gallery');
  useEffect(() => {
    gsapText(title, 0.8, t('title'), 0);
    gsapBottomElement('.gallery', 1, 0, 0.1);
  }, [])

  const title = useRef<HTMLDivElement>(null);
  return (
    <main className='relative flex flex-col w-full h-full mb-24'>
      <div className='w-full flex flex-col items-center'>
        <div className='sm:w-3/5 w-11/12 sm:mb-10 mb-0'>
          <h1 className='sm:text-5xl text-4xl mb-6' ref={title}></h1>
        </div>
        <div className='gap-5 xs:columns-2 sm:columns-3 xl:columns-4 4xl:columns-8 [&>div:not(:first-child)]:mt-5 justify-items-center p-8'>
          {list.map((item, index) => (
            <div className='gallery' key={index}>
              <GalleryComp img={item.img} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}