import { NextRequest } from "next/server";
import { handleProxyAuth } from "@/lib/proxy";

export function middleware(request: NextRequest) {
  return handleProxyAuth(request, {
    protectedRoutes: ["/dashboard"],
  });
}

export const config = {
  matcher: ["/books/:path*", "/dashboard/:path*"],
};
