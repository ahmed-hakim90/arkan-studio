import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  const response = intlMiddleware(request);

  // Keep marketing routes free of auth refresh unless needed later.
  if (response) return response;
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/admin/:path*",
    "/(ar|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
