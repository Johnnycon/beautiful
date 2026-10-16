import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, Next.js internals, Vercel internals
  // and files with an extension (images, robots.txt, sitemap.xml, ...)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
