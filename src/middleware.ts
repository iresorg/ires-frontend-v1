import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Auth JWTs are memory-only in the browser (see docs/FRONTEND_AUTH_TOKEN_STORAGE.md).
 * Middleware cannot see them, so route protection for /dashboard is enforced
 * client-side in DashboardLayout via checkAuth().
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
