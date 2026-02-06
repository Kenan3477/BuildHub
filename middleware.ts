import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route requires authentication
  const protectedRoutes = ['/dashboard', '/my-jobs', '/post-project']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // In a client-side app, we can't check localStorage in middleware
    // So we'll handle authentication in the components themselves
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/my-jobs/:path*', '/post-project/:path*']
}