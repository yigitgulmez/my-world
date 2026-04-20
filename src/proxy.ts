import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import createMiddleware from 'next-intl/middleware';

export const routing = defineRouting ({
  locales: ['en', 'tr'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      tr: '/yoladları'
    }
  }
});

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(tr|en)/:path*']
};

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const {Link, getPathname, redirect, usePathname, useRouter} =
createNavigation(routing);