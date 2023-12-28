import { NextResponse } from 'next/server';
import isAuthenticated from './utils/auth';
import zsfgafdcz from './app/zsfgafdcz/page';

export async function middleware(request) {
  // const Authenticated = zsfgafdcz();
  // const Authenticated = true;
  // console.log('Authenticated:', Authenticated);
  // if (!Authenticated && request.nextUrl.pathname !== '/') {
  //   return NextResponse.redirect(new URL('/', request.url)); // Redirect to login
  // }

  // if (Authenticated && request.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirect to a protected route (e.g., dashboard)
  // }

  // return NextResponse.next();
}
