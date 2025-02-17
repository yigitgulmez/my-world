import '@/css/navbar.css';
import Link from 'next/link';
import getNavItems from '@/utils/navitems';

function HomeNavList() {
  const navItems = getNavItems();
  return (
    <main className='flex flex-col sm:gap-8 gap-2 sm:flex-row animate-transformY-100 font-CutiveMono select-none'>
      {navItems.map((item) => (
        <div className='relative pb-2 sm:w-auto ' key={item.label}>
          <Link href={item.href} className='nav sm:w-auto'>
            <span className='list lg:text-xl text-base sm:w-auto' data-content={item.label}>{item.label}</span>
          </Link>
        </div>
      ))}
    </main>
  );
}

export default HomeNavList;



