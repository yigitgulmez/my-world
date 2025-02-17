import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'tr'];

export default getRequestConfig(async ({ requestLocale }) => {

  const locale = await requestLocale;

  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});