'use client';
import '@/css/localeswitcher.css';
import Link from 'next/link';
import { Locale, usePathname, } from '@/middleware';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const currentLocale = locale as Locale;
  const nextLocale = currentLocale === 'en' ? 'tr' : 'en';
  const href = `/${nextLocale}/${pathname}`;

  return (
    <Link href={href} className='locale'>
      <div 
        className='lang font-Cutive-mono select-none' 
        data-content={nextLocale}>{locale}
      </div>
    </Link>
  );
};