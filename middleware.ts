import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';

  // Redirect logged-in users away from public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Redirect unauthenticated users trying to access private paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Allow access to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/login',
    '/signup',
  ],
};

