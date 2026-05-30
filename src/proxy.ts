import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { auth } from "./lib/auth";
import { routing } from "./navigation";

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.includes("/admin");
  const isLoginPage = request.nextUrl.pathname.includes("/login");

  if (isAdminRoute && !isLoginPage) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) return NextResponse.redirect(new URL("/login", request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
