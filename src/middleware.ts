import { auth } from '@/auth';
import { authRoutes, publicRoutes } from '@/routes';
import { NextResponse } from 'next/server';

const LOCALES = ['en', 'uk'] as const;
type Locale = (typeof LOCALES)[number];

function getLocale(pathname: string): Locale | null {
  const seg = pathname.split('/')[1];
  return (LOCALES as readonly string[]).includes(seg) ? (seg as Locale) : null;
}

function stripLocale(pathname: string) {
  const locale = getLocale(pathname);
  if (!locale) return { locale: null, pathname };
  const rest = pathname.replace(`/${locale}`, '') || '/';
  return { locale, pathname: rest };
}

function withLocale(locale: string | null, path: string) {
  if (!locale) return path;
  return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`;
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const { locale, pathname: pathnameNoLocale } = stripLocale(nextUrl.pathname);

  if (!locale) {
    return NextResponse.redirect(new URL(`/uk${nextUrl.pathname}`, nextUrl));
  }

  const isPublic = publicRoutes.includes(pathnameNoLocale);
  const isAuthRoute = authRoutes.includes(pathnameNoLocale);

  const isProfileComplete = req.auth?.user.profileComplete;
  const isAdmin = req.auth?.user.role === 'ADMIN';
  const isAdminRoute = pathnameNoLocale.startsWith('/admin');

  if (isPublic) return NextResponse.next();

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL(withLocale(locale, '/'), nextUrl));
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(withLocale(locale, '/members'), nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL(withLocale(locale, '/login'), nextUrl));
  }

  if (isLoggedIn && !isProfileComplete && pathnameNoLocale !== '/complete-profile') {
    return NextResponse.redirect(new URL(withLocale(locale, '/complete-profile'), nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)'],
};
