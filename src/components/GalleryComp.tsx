'use client';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { GalleryCompProps } from '@/types';

export default function GalleryComp({ img, alt }: GalleryCompProps) {
  const [isCentered, setIsCentered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (!isCentered) {
      setIsCentered(true);
    }
  }, [isCentered]);

  const handleClose = useCallback(() => {
    [imgRef.current, backdropRef.current].forEach((element) => {
      if (element) {
        element.classList.remove('animate-fast-fade-in');
        element.classList.add('animate-fast-fade-out');
      }
    });

    setTimeout(() => {
      setIsCentered(false);
    }, 490);
  }, []);

  return (
    <div className='relative overflow-hidden rounded-xl'>
      {isCentered && (
        <div
          onClick={handleClose}
          ref={backdropRef}
          className='fixed inset-0 h-full w-full z-30 bg-black/50 animate-fast-fade-in'
        />
      )}

      {isCentered && (
        <Image
          src={img}
          alt={alt}
          width={1000}
          height={1000}
          ref={imgRef}
          className='z-40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-auto h-auto max-h-[80%] max-w-[80%] select-none animate-fast-fade-in'
        />
      )}

      <Image
        src={img}
        alt={alt}
        height={1000}
        width={1000}
        onClick={(e) => {
          e.stopPropagation();
          isCentered ? handleClose() : handleClick();
        }}
        className={`cursor-pointer shadow-2xl z-0 transition-all min-w-full select-none 
        ${!isCentered && 'sm:hover:scale-105 sm:hover:z-10'}`}
      />
    </div>
  );
}
