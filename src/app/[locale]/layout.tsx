import '@/css/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next';
import { NavBar, Stars } from '@/components';
import { config } from '@/utils';
import Footer from '@/components/Footer';

export const metadata = {
  title: config.fullName,
  description: `The world of ${config.fullName}`,
  robots: 'all',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: config.fullName,
    description: `The world of ${config.fullName}`,
    url: '/en',
    siteName: config.fullName,
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: config.fullName,
        type: 'image/png',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.fullName,
    description: `The world of ${config.fullName}`,
    images: ['/android-chrome-512x512.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children:  React.ReactNode;
}>) {

  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <html lang='en' translate="no">
        <body 
          className='flex flex-col bg-fixed min-h-screen w-screen overflow-x-hidden overflow-y-auto 
          font-Fira-code bg-linear-to-br from-purple-950 bg-black text-white'
        >
          <Stars />
          <NavBar />
          <div className='grow'>{children}</div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}