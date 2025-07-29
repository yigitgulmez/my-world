'use client';
import { useTranslations } from 'next-intl';
export default function Forbidden() {
  const t = useTranslations('errors');

  return (
    <main className="flex justify-center">
      <div className="flex flex-col justify-center items-center text-center text-4xl w-[80vw] h-[70vh] bg-black/20 rounded-2xl">
        <div className="mb-10 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">{"-<403>-"}</div>
        <div className="text-sm sm:text-base md:text-lg lg:text-xl px-5">{t('403Message')}</div>
      </div>
    </main>
  );
}
