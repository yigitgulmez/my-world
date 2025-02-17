'use client'
import { useTranslations } from 'next-intl';
import { AiOutlineDiscord } from 'react-icons/ai';
import Social from '@/components/Social';
import emailjs from 'emailjs-com';
import { gsapBottomElement, gsapLeftElement, gsapText } from '@/components/Animation';
import { useEffect, useRef } from 'react';
const EMAILJS_KEY1 = process.env.NEXT_PUBLIC_EMAILJS_KEY1;
const EMAILJS_KEY2 = process.env.NEXT_PUBLIC_EMAILJS_KEY2;
const EMAILJS_KEY3 = process.env.NEXT_PUBLIC_EMAILJS_KEY3;

export default function Contact() {
  const t = useTranslations('contact');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const submitButton = document.getElementById("submit") as HTMLButtonElement;
    let intervalId: NodeJS.Timeout;
    if (submitButton) {
      submitButton.disabled = true;
      let dotCount = 0;
      const interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        submitButton.textContent = t('button.sending') + '.'.repeat(dotCount);
      }, 500);
      intervalId = interval;
    }
    event.preventDefault();
    emailjs.sendForm(EMAILJS_KEY1 as string, EMAILJS_KEY2 as string, event.currentTarget, EMAILJS_KEY3 as string)
    .then((result) => {
      if (submitButton) {
        clearInterval(intervalId);
        submitButton.textContent = t('button.success');
      }
    })
    .catch((error) => {
      if (submitButton) {
        clearInterval(intervalId);
        submitButton.textContent = t('button.error')
        submitButton.disabled = false;
      }
    });
  };
  const title = useRef<HTMLHeadingElement>(null);
  const text = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsapText(title, 0.8, t('title'), 0);
    gsapLeftElement('.icon', 1, 0.5, 0.5);
    gsapText(text, 0.8, t('text'), 0.9);
    gsapBottomElement('.input', 1, 1, 0.5);
  }, [])

  return (
    <main className='flex justify-center mb-10'>
      <div className='flex flex-col mdx:w-3/5 w-full z-0 mdx:scale-100 scale-90'>
        <div className='mb-10'>
          <h1 className='sm:text-5xl text-4xl' ref={title}></h1>
        </div>
        <div className='flex flex-col gap-2 w-full h-5 mb-24 sm:text-base text-sm'>
          <Social href={`https://discordapp.com/users/${process.env.NEXT_PUBLIC_DISCORDID}`} icon={<AiOutlineDiscord/>}/>
          <p className='ps-3.5' ref={text}></p>
        </div>
        <form onSubmit={handleSubmit} className=' select-none'>
          <div className='input flex md:gap-12 gap-6 mb-6'>
            <input id='name' name='from_name' className='ps-4 h-14 w-full rounded-xl bg-zinc-900/80 border-zinc-800/80 border-2 backdrop-blur-sm transition-colors duration-500 focus:border-purple-800/80 hover:border-purple-800/80 outline-none' type='name' required max={20} placeholder={t('inputPlaceholder')}/>
            <input id='email' name='from_email' className='ps-4 h-14 w-full rounded-xl bg-zinc-900/80 border-zinc-800/80 border-2 backdrop-blur-sm transition-colors duration-500 focus:border-purple-800/80 hover:border-purple-800/80 outline-none' type='email' required placeholder='Email'/>
          </div>
          <textarea id='message' name='message' cols={30} rows={10} placeholder={t('textareaPlaceholder')} required minLength={10} className='input px-3 py-2 mb-10 min-w-full max-w-full h-auto min-h-20 rounded-xl transition-colors duration-500 bg-zinc-900/80 border-zinc-800/80 border-2 backdrop-blur-sm focus:border-purple-800/80 hover:border-purple-800/80 outline-none'/>
          <div className='input flex justify-center'>
            <button id='submit' type='submit' className=' h-14 w-1/3 rounded-xl bg-neutral-900/80 border-zinc-800/80 border-2 hover:border-purple-800/80 transition-all duration-500 backdrop-blur-sm'>{t('button.default')}</button>
          </div>
        </form>
      </div>
    </main>
  );
};