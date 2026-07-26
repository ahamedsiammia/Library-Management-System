import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  // Book detail pages require login
  const isBookDetails = pathname.startsWith("/books/") && pathname !== "/books";

  // Dashboard requires login
  const isDashboard = pathname.startsWith("/dashboard");

  if ((isBookDetails || isDashboard) && !token) {
    const registerUrl = new URL("/register", request.url);
    registerUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(registerUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/books/:path*", "/dashboard/:path*"],
};
