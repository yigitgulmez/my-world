'use client'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { AiOutlineDiscord } from 'react-icons/ai'
import { gsapBottomElement, gsapLeftElement, gsapText, Social } from '@/components'
import Turnstile from 'react-turnstile'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { TD } from '@/types'
import { useGSAP } from '@gsap/react'

export default function Contact() {
  const t = useTranslations('contact')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isSended, setIsSended] = useState(false)
  const [showTurnstile, setShowTurnstile] = useState(true)
  const [showButton, setShowButton] = useState(false)

  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const socialRef = useRef<HTMLDivElement | null>(null)
  const formRefs = useRef<(HTMLDivElement | null)[]>([])
  const scope = useRef(null)

  const handleTurnstileVerify = (token: string) => {
    setTurnstileToken(token)
    setShowTurnstile(false)
    setShowButton(true)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!turnstileToken) {
      alert(t('button.turnstile'))
      return;
    }

    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true
      let dotCount = 0
      const interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4
        submitButtonRef.current!.textContent = t('button.sending') + '.'.repeat(dotCount)
      }, 500)

      setLoading(true)

      const formData = new FormData(event.currentTarget)

      const browserInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }

      const fp = await FingerprintJS.load()
      const result = await fp.get()

      const bodyData = {
        from_name: formData.get('from_name'),
        from_email: formData.get('from_email'),
        message: formData.get('message'),
        turnstileToken,
        browserInfo,
        fingerprint: {
          visitorId: result.visitorId,
          confidence: result.confidence,
        },
      }

      try {
        const res = await fetch(`/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData),
        })

        if (!res.ok) throw new Error('Sunucu hatası')

        clearInterval(interval)
        submitButtonRef.current.textContent = t('button.success')
      } catch (error) {
        clearInterval(interval)
        submitButtonRef.current!.textContent = t('button.error')
        submitButtonRef.current!.disabled = false
      } finally {
        setLoading(false)
        setTurnstileToken(null)
        setIsSended(true)
      }
    }
  }
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const elements: TD[] = 
  [
    { text: t('title'), duration: 0.8 },
    { text: t('text'), duration: 0.8 },
  ];
  useGSAP(() => {
    gsapText(elements, textRefs.current)
    gsapLeftElement([socialRef.current], 1, 0, 0)
    gsapBottomElement(formRefs.current, 1, 0.7, 0.1)
  }, {scope})

  const input = {
    className: `ps-4 h-14 w-full rounded-xl bg-zinc-900/80 transition-colors duration-500  outline-hidden
    backdrop-blur-xs border-zinc-800/80 border-2 focus:border-purple-800/80 hover:border-purple-800/80`}

  return (
    <main className='flex justify-center'>
      <div 
        className='flex flex-col mdx:w-3/5 w-full z-0 mdx:scale-100 scale-90'
        ref={scope} 
      >
        <div className='mb-10' >
          <h1 className='sm:text-5xl text-4xl' ref={el => { textRefs.current[0] = el; }}></h1>
        </div>
        <div className='flex flex-col gap-2 w-full h-5 mb-24 sm:text-base text-sm'>
          <div>
            <Social ref={socialRef} href={`https://discordapp.com/users/528167186511167498`} icon={<AiOutlineDiscord />} />
          </div>
          <p className='ps-3.5' ref={el => { textRefs.current[1] = el; }}></p>
        </div>
        <form onSubmit={handleSubmit} className='select-none'>
          <div ref={(el) => { formRefs.current[0] = el }} className='flex flex-col sm:flex-row gap-5 sm:gap-12 mb-5  sm:mb-6 invisible'>
            <input
              id='name'
              name='from_name'
              {...input}
              type='text'
              required
              minLength={2}
              maxLength={30}
              placeholder={t('inputPlaceholder')}
            />
            <input
              id='email'
              name='from_email'
              {...input}
              type='email'
              required
              placeholder='Email'
            />
          </div>
          <div ref={(el) => { formRefs.current[1] = el }} className='invisible'>
            <textarea
              id='message'
              name='message'
              cols={30}
              rows={10}
              placeholder={t('textareaPlaceholder')}
              required
              minLength={10}
              className={
                `px-3 py-2 mb-10 min-w-full h-40 md:h-72 max-w-full min-h-20 rounded-xl
                transition-colors duration-500 outline-hidden bg-zinc-900/80
                border-zinc-800/80 border-2 backdrop-blur-xs
                focus:border-purple-800/80 hover:border-purple-800/80 `}
            />
          </div>
          <div ref={(el) => { formRefs.current[2] = el }} className='flex justify-center invisible'>
            {showTurnstile && (
              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onVerify={handleTurnstileVerify}
              />
            )}
          </div>
          <div className='flex justify-center'>
            {showButton && (
              <button
                id='submit'
                type='submit'
                ref={submitButtonRef}
                disabled={loading || !turnstileToken}
                className={
                  `h-14 w-1/3 rounded-xl transition-all duration-500 backdrop-blur-xs mb-20
                  bg-neutral-900/80 border-zinc-800/80 border-2 hover:border-purple-800/80 
                  ${isSended ? 'text-zinc-400' : ''} ${showTurnstile ? '' : 'animate-fast-fade-in'}`}
              >
                {t('button.default')}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}
