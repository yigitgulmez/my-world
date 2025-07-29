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
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: 'all',
  openGraph: {
    title: config.fullName,
    description: `The world of ${config.fullName}`,
    url: `https://${config.domain}.com/en`,
    siteName: config.fullName,
    images: [
      {
        url: `https://${config.domain}.com/favicon.png`,
        width: 1024,
        height: 1024,
        alt: config.fullName,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: config.fullName,
    description: `The world of ${config.fullName}`,
    images: [`https://${config.domain}.com/favicon.png`],
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