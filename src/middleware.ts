import { type NextRequest, NextResponse } from 'next/server';

import { DEFAULT_SORTED_METHOD } from '@tools/costants';

export function middleware(request: NextRequest) {
   const { nextUrl } = request;

   if (nextUrl.pathname === '/') {
      const url = nextUrl.clone();
      const sorted = url.searchParams.get('sorted');

      url.pathname = '/movies/1';

      if (sorted === null || sorted.trim() === '') {
         url.searchParams.set('sorted', DEFAULT_SORTED_METHOD);
      }

      return NextResponse.redirect(url, 308);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|jpe?g|png|gif|avif|webp)$).*)'],
};
