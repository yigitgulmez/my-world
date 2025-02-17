import '@/css/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Background from '@/components/Background';
import NavBar from '@/components/NavBar';
const FULLNAME = process.env.NEXT_PUBLIC_FULLNAME
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN


export const metadata = {
  title: FULLNAME,
  description: `The world of ${FULLNAME}`,
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: 'all',
  openGraph: {
    title: FULLNAME,
    description: `The world of ${FULLNAME}`,
    url: `https://${DOMAIN}.com/en/about`,
    siteName: FULLNAME,
    images: [
      {
        url: `https://${DOMAIN}.com/favicon.ico`,
        width: 256,
        height: 256,
        alt: FULLNAME,
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: FULLNAME,
    description: `The world of ${FULLNAME}`,
    images: [`https://${DOMAIN}.com/favicon.ico`],
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
      <html lang='en'>
        <body>
          <div className='bg-local bg-gradient-to-br w-screen h-screen from-purple-950 bg-black text-white overflow-x-hidden overflow-y-auto font-FiraCode'>
            <Background/>
            <NavBar/>
            {children}
          </div>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
