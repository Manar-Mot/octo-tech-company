import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = ["en", "ar", "tr"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/auth/signUp": {
    en: "/auth/signUp",
    ar: "/auth/signUp",
    tr: "/auth/kayit-ol",
  },

  "/auth/request-verification": {
    en: "/auth/request-verification",
    ar: "/auth/request-verification",
    tr: "/auth/request-verification",
  },
  "/auth/signIn": {
    en: "/auth/signIn",
    ar: "/auth/signIn",
    tr: "/auth/giris-yap",
  },
  "/blog": {
    en: "/blog",
    ar: "/blog",
    tr: "/blog",
  },
  "/contact-us": {
    en: "/contact-us",
    ar: "/contact-us",
    tr: "/bize-ulasin",
  },
  "/about-us": {
    en: "/about-us",
    ar: "/about-us",
    tr: "/hakkimizda",
  },
  "/services": {
    en: "/services",
    ar: "/services",
    tr: "/hizmetler",
  },
  "/certificates": {
    en: "/certificates",
    ar: "/certificates",
    tr: "/sertifikalar",
  },
  "/partnerships": {
    en: "/partnerships",
    ar: "/partnerships",
    tr: "/ortakliklar",
  },
  "/admin": {
    en: "/admin",
    ar: "/admin",
    tr: "/yonetici",
  },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
