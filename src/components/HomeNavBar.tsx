'use client'

import '@/css/navbar.css';
import Link from 'next/link';
import { navItems } from '@/utils';
import { forwardRef, useImperativeHandle, useRef } from 'react';

function HomeNavBar(props: {}, ref: React.Ref<(HTMLSpanElement | null)[]>) {
  const navItemsList = navItems();
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useImperativeHandle(ref, () => spanRefs.current);

  return (
    <div className='flex flex-col sm:gap-8 gap-2 sm:flex-row font-Cutive-mono select-none'>
      {navItemsList.map((item, index) => (
        <div 
          className='relative pb-2 sm:w-auto invisible' 
          key={item.label} 
          ref={el => { spanRefs.current[index] = el; }}
        >
          <Link  href={item.href} className='nav sm:w-auto'>
            <span
              className='list md:text-xl text-base sm:w-auto'
              data-content={item.label}
            >
              {item.label}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default forwardRef(HomeNavBar);
