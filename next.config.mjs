import createNextIntlPlugin from "next-intl/plugin";
import crypto from 'crypto';

const withNextIntl = createNextIntlPlugin();

const generateNonce = () => crypto.randomBytes(16).toString('base64');

const nextConfig = {
  // async headers() {
    // const nonce = generateNonce();
    // return [
    //   {
    //     source: "/ar/admin",
    //     headers: [
    //       {
    //         key: 'Content-Security-Policy',
    //         value: `default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' 'nonce-${nonce}';`,
    //       },
    //     ],
    //   },
    //   {
    //     source: "/en/admin",
    //     headers: [
    //       {
    //         key: 'Content-Security-Policy',
    //         value: `default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' 'nonce-${nonce}';`,
    //       },
    //     ],
    //   },
    //   {
    //     source: "/tr/admin",
    //     headers: [
    //       {
    //         key: 'Content-Security-Policy',
    //         value: `default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' 'nonce-${nonce}';`,
    //       },
    //     ],
    //   },
    //   {
    //     source: "/ar/signin",
    //     headers: [
    //       {
    //         key: "Content-Security-Policy",
    //         value: `default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' 'nonce-${nonce}' https://accounts.google.com https://apis.google.com;`,
    //       },
    //     ],
    //   },
    //   {
    //     source: "/en/signin",
    //     headers: [
    //       {
    //         key: "Content-Security-Policy",
    //         value: `default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' 'nonce-${nonce}' https://accounts.google.com https://apis.google.com;`,
    //       },
    //     ],
    //   },
    //   {
    //     source: "/tr/signin",
    //     headers: [
    //       {
    //         key: "Content-Security-Policy",
    //         value: `default-src 'self'; img-src 'self' firebasestorage.googleapis.com; script-src 'self' 'nonce-${nonce}' https://accounts.google.com https://apis.google.com;`,
    //       },
    //     ],
    //   },
    // ];
  // },
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
