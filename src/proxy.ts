import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16 uses proxy.ts instead of middleware.ts
// The function must be named 'proxy' instead of 'middleware'
export const proxy = createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (images, etc.)
  // - _next (Next.js internals)
  matcher: ['/', '/(es)/:path*', '/((?!api|_next|.*\\..*).*)']
};
