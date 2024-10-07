import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request: NextRequest) {
  // Fetch the token from the request cookies using NextAuth.js JWT
  const token = await getToken({ req: request, secret });

  const { pathname } = request.nextUrl;

  // 1. If token exists (user is authenticated)
  if (token) {
    // Prevent authenticated users from accessing the '/' page and redirect them
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/objects/people', request.url));
    }
  }

  // 2. If no token (user is unauthenticated)
  if (!token) {
    // Redirect unauthenticated users trying to access protected pages
    if (pathname === '/objects/people' || pathname === '/objects/calender') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Continue to the requested page if no redirection is needed
  return NextResponse.next();
}

// Apply the middleware to the following paths
export const config = {
  matcher: ['/', '/objects/people', '/objects/calender'],
};
