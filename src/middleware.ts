import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/signup/individual",
  "/signup/organization",
  "/signup/verify-email",
  "/forgot-password",
  "/reset-password",
  "/about",
  "/contact",
  "/services",
  "/pricing",
  "/individual",
  "/organization",
  "/faq",
];

const protectedRoutes = ["/dashboard"];

type AccountRole = "individual" | "organization";

/** Decode role from JWT payload — no network call (Edge-safe). */
function getRoleFromToken(token: string): AccountRole | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const json =
      typeof atob === "function"
        ? atob(padded)
        : Buffer.from(padded, "base64").toString("utf-8");
    const payload = JSON.parse(json) as { role?: string; exp?: number };

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    if (payload.role === "individual" || payload.role === "organization") {
      return payload.role;
    }
    return null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Authenticated users hitting login/signup → send to their dashboard
  if (
    token &&
    isPublicRoute &&
    (pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/signup"))
  ) {
    const role = getRoleFromToken(token);
    if (role === "organization") {
      return NextResponse.redirect(
        new URL("/dashboard/organization", request.url),
      );
    }
    if (role === "individual") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected route without token → login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protected route with token → role path guard (JWT only, no API fetch)
  if (token && isProtectedRoute) {
    const role = getRoleFromToken(token);

    if (
      role === "individual" &&
      pathname.startsWith("/dashboard/organization")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (role === "organization" && pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL("/dashboard/organization", request.url),
      );
    }

    // Missing/unreadable role: let DashboardLayout verify via API
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
