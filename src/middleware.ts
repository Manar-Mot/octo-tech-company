import createMiddleware from "next-intl/middleware";
import { localePrefix, defaultLocale, locales, pathnames } from "./config";
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});

const authMiddleware = withAuth(
  async function onSuccess(req: NextRequest) {
    // return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/signIn",
    },
  }
);

export default function middleware(req: NextRequest) {
  // Define a regex pattern for public URLs
  const excludePattern = "^(/(" + locales.join("|") + "))?/admin/?.*?$";
  const adminPattern = "^/admin/?";
  const isAdminPage = RegExp(adminPattern, "i").test(req.nextUrl.pathname);
  const isPublicPage = !RegExp(excludePattern, "i").test(req.nextUrl.pathname);

  if (isAdminPage) {
    // Apply Next-Auth middleware directly for admin pages without locale
    return (authMiddleware as any)(req);
  } else if (isPublicPage) {
    // Apply Next-Intl middleware for public pages
    return intlMiddleware(req);
  } else {
    // Apply Next-Auth middleware for private pages with locale
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(ar|en|tr)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Include API routes
    "/api/:path*",
    // Include admin routes without locale
    "/admin/:path*",
  ],
};
