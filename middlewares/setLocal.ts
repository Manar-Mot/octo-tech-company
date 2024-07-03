import { NextRequest, NextResponse } from 'next/server';

const availableLanguages = ['en', 'ar', 'tr'];

export function setLocale(req: NextRequest) {
  const language = req.headers.get('accept-language')?.split(',')[0] || 'en';
  const selectedLanguage = availableLanguages.includes(language) ? language : 'en';
  req.nextUrl.searchParams.set('lang', selectedLanguage);
  return NextResponse.next();
}
