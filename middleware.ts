import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginRoute = request.nextUrl.pathname === "/admin/login"
  const isAuthenticated = request.cookies.get("adminAuth")?.value === "true"

  console.log("Middleware check:", {
    path: request.nextUrl.pathname,
    isAdminRoute,
    isLoginRoute,
    isAuthenticated
  })

  if (isAdminRoute && !isLoginRoute && !isAuthenticated) {
    console.log("Redirecting to login")
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  if (isLoginRoute && isAuthenticated) {
    console.log("Redirecting to admin dashboard")
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
} 