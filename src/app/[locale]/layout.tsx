import type { Metadata } from 'next';
import Head from 'next/head';
import Container from '@/src/components/sharedComponent/Container';
import { NextIntlClientProvider } from 'next-intl';
import Footer from '@/src/components/footer/Footer';
import { getMessages } from 'next-intl/server';
import React from 'react';
import Header from '@/src/components/header/Header';
import UserProvider from '@/src/providers/contextsProviders/UserProvider';
import { Toaster } from 'react-hot-toast';
import ClientSessionProvider from '@/src/components/sharedComponent/ClientSessionPro';
import { getServerSession } from 'next-auth';
import { nextauthOptions } from '@/src/lib/nextAuth-options';


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'OctoTech',
  description: 'Software Company',
};

const RootLayout = async ({ children, params: { locale } }: RootLayoutProps) => {
  const messages = await getMessages();
  const session = await getServerSession(nextauthOptions);

  let fontFamily = '';
  switch (locale) {
    case 'ar':
      fontFamily = "'Tajawal', sans-serif";
      break;
    case 'en':
      fontFamily = "'Roboto', sans-serif";
      break;
    case 'tr':
      fontFamily = "'Poppins', sans-serif";
      break;
    default:
      fontFamily = "'Roboto', sans-serif";
      break;
  }

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap' rel='stylesheet' />
      </Head>
      <body className='bg-backColor' style={{ fontFamily }} suppressHydrationWarning={true}>
        <NextIntlClientProvider messages={messages}>
          <ClientSessionProvider session={session}>
            <Toaster toastOptions={{ style: { background: 'rgb(51 65 85)', color: '#fff' } }} />
            <UserProvider>
              <Container>
                <Header locale={locale} />
                <main>{children}</main>
                <footer>
                  <Footer />
                </footer>
              </Container>
            </UserProvider>
          </ClientSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
