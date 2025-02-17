'use client';
import { Locale, usePathname, } from '@/middleware';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import '@/css/localeswitcher.css';

export default function LocaleSwitcher(){
  const locale = useLocale();
  const pathname = usePathname();
  const currentLocale = locale as Locale;
  const nextLocale = currentLocale === 'en' ? 'tr' : 'en';
  const href = `/${nextLocale}/${pathname}`;

  return (
    <Link href={href} className='locale'>
      <div className='lang font-CutiveMono select-none' data-content={nextLocale}>{locale}</div>
    </Link>
  );
};