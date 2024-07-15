import React from "react";
import Head from "next/head";
import DefaultLayout from "@/src/components/adminDashboard/sharedComponent/DefaultLayout/DefaultLayout";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <html lang="ar" dir="rtl">
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className="bg-backColor"
        style={{ fontFamily: "'Tajawal', sans-serif" }}
        suppressHydrationWarning={true}
      >
        <DefaultLayout>
        {children}
        </DefaultLayout>
      </body>
    </html>
  );
};

export default AdminLayout;
