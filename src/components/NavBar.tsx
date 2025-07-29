'use client'
import '@/css/navbar.css';
import Link from 'next/link';
import { LocaleSwitcher } from '@/components';
import { navItems } from '@/utils';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { config } from '@/utils';

export default function NavBar() {
  const locale = useLocale();
  const navItemsList = navItems();
  const pathname = usePathname();
  const lastPart = pathname.split('/').filter(Boolean).pop();
  const content = (
    <header className='relative mdx:h-44 md:h-36 h-28 z-20'>
      <nav className={`${lastPart === locale ? '' : 'animate-transform-y--100'}
      flex fixed w-full justify-center items-center lg:mt-14 mt-11 font-Cutive-mono scale-100 select-none`}>
        <div 
          className='flex items-center justify-center w-32 lg:w-2/3 h-12 lg:h-16 
        bg-black/40 backdrop-blur-[5px] rounded-3xl border border-violet-500/40 shadow-2xl transition-all'
        >
          <div className='flex items-center lg:justify-between justify-center w-full lg:ms-7 me-4'>
            <div className='relative text-lg lg:text-xl flex gap-1 items-end'>
              <Link href='/' className='nav'>
                <div data-content={config.username} className='list'>{config.username}</div>
              </Link>
              <div>
                <div className='absolute top-2 lg:text-base text-xs'>
                  <LocaleSwitcher/>
                </div>
              </div>
            </div>
            <div className='lg:flex hidden'>
              {navItemsList.map((item) => (
                <div className='relative cursor-pointer me-8' key={item.label}>
                  <Link href={item.href} className='nav'>
                    <div 
                      className={`list text-lg ${pathname === item.href ? 'active' : ''}`} 
                      data-content={item.label}>{item.label}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
  return (
    <>
      {lastPart === locale ? <></> : <>{content}</>}
    </>
  );
}

