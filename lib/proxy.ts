import { NextRequest, NextResponse } from "next/server";

export interface ProxyConfig {
  protectedRoutes: string[];
  roleRoutes?: Record<string, string[]>;
}

export function handleProxyAuth(request: NextRequest, config: ProxyConfig) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // Check if route is a details page (e.g., /books/123) or protected route
  const isBookDetails = pathname.startsWith("/books/") && pathname !== "/books";
  const isProtectedRoute =
    isBookDetails ||
    config.protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !token) {
    const registerUrl = new URL("/register", request.url);
    registerUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(registerUrl);
  }

  return NextResponse.next();
}
