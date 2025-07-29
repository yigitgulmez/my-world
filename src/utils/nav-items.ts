import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

export default function navItems() {
  const t = useTranslations('');
  const locale = useLocale();
  const navItems = [
    { href: `/${locale}/projects`, label: '/' + t('projects.title') },
    { href: `/${locale}/gallery`, label: '/' + t('gallery.title') },
    { href: `/${locale}/about`, label: '/' + t('about.title') },
    { href: `/${locale}/contact`, label: '/' + t('contact.title') },
  ];
  return navItems;
}