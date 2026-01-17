
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes in production
  if (process.env.NODE_ENV === 'production') {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // Option 1: Return 404 (Not Found) to hide it completely
      // return new NextResponse(null, { status: 404 });
      
      // Option 2: Redirect to login or home (more user friendly)
      // For now, let's redirect to login if they try to access admin pages
      // But if the requirement is to "exclude" it, 404 is stealthier.
      // However, usually we want to allow admin access if authenticated.
      // Given the user instruction "Exclude halaman dashboard admin dari build", 
      // strict 404 or redirecting to home mimics "not existing".
      
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
