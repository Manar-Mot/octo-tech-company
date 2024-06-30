import type { Metadata } from "next";
import Head from "next/head";
import Container from "@/src/components/sharedComponent/Container";
import NavBar from "@/src/components/NavBar/NavBar";
import TopBar from "@/src/components/TopBar/TopBar";
import { NextIntlClientProvider } from "next-intl";
import Footer from "@/src/components/footer/Footer";
import BottomBar from "@/src/components/bottomBar/BottomBar";
import { getMessages } from "next-intl/server";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: "OctoTech",
  description: "Software Company",
};

const RootLayout = async ({ children, params: { locale } }: RootLayoutProps) => {
  const messages = await getMessages();
  // const session = await getServerSession(authOptions as GetServerSessionOptions[]);
  
  let fontFamily = "";
  switch (locale) {
    case "ar":
      fontFamily = "'Tajawal', sans-serif";
      break;
    case "en":
      fontFamily = "'Roboto', sans-serif";
      break;
    case "tr":
      fontFamily = "'Poppins', sans-serif";
      break;
    default:
      fontFamily = "'Roboto', sans-serif";
      break;
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap`}
          rel="stylesheet"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap`}
          rel="stylesheet"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <body
        className="bg-backColor"
        style={{ fontFamily }}
        suppressHydrationWarning={true}
      >
        {/* <SessionProvider session={null}> */}
          <NextIntlClientProvider messages={messages}>
            <Container>
              <div className="sticky top-0 left-0 z-[999]">
                <TopBar />
                <NavBar locale={locale} />
              </div>
              <main>{children}</main>
              <footer>
                <Footer />
                <BottomBar />
              </footer>
            </Container>
          </NextIntlClientProvider>
        {/* </SessionProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
