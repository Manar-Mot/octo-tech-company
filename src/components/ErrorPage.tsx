"use client"
import Error from "next/error";
import React from "react";
interface ErrorPageProps {
  title: string;
  lang: string;
}
const ErrorPage: React.FC<ErrorPageProps> = ({ title, lang }) => {
  return (
    <html lang={lang}>
      <body>
        <Error statusCode={404} title={title} />
      </body>
    </html>
  );
};

export default ErrorPage;
