import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/ar/admin",
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' firebasestorage.googleapis.com;",
          },
        ],
      },
      {
        source: "/en/admin",
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' firebasestorage.googleapis.com;",
          },
        ],
      },
      {
        // إصلاح تكرار خاصية source
        source: "/tr/admin",
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' firebasestorage.googleapis.com;",
          },
        ],
      },
      {
        source: "/ar/signin",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' https://accounts.google.com https://apis.google.com;",
          },
        ],
      },
      {
        source: "/en/signin",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' https://accounts.google.com https://apis.google.com;",
          },
        ],
      },
      {
        source: "/tr/signin",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' https://accounts.google.com https://apis.google.com;",
          },
        ],
      },
    ];
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
