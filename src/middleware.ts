import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/signup/individual",
  "/signup/organization",
  "/signup/verify-email",
  "/forgot-password",
  "/create-password",
  "/about",
  "/contact",
  "/services",
  "/pricing",
  "/individual",
  "/organization",
];

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"];

// Helper to get user role from token (if token contains role in payload)
// For now, we'll make an API call to verify and get user info
async function getUserRole(
  token: string
): Promise<"individual" | "organization" | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const response = await fetch(`${apiUrl}/accounts/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const user = await response.json();
      return user.role || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_token")?.value;

  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If accessing public route and authenticated, redirect to appropriate dashboard
  if (
    token &&
    isPublicRoute &&
    (pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/signup"))
  ) {
    try {
      const role = await getUserRole(token);
      if (role === "organization") {
        return NextResponse.redirect(
          new URL("/dashboard/organization", request.url)
        );
      } else if (role === "individual") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      // If token is invalid, allow access to public routes
      return NextResponse.next();
    }
  }

  // If accessing protected route without token, redirect to login
  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing protected route with token, verify and redirect based on role
  if (token && isProtectedRoute) {
    try {
      const role = await getUserRole(token);

      // If accessing /dashboard/organization but user is individual
      if (
        pathname.startsWith("/dashboard/organization") &&
        role === "individual"
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // If accessing /dashboard (individual) but user is organization
      if (pathname === "/dashboard" && role === "organization") {
        return NextResponse.redirect(
          new URL("/dashboard/organization", request.url)
        );
      }

      // If token is invalid, redirect to login
      if (!role) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // If error verifying token, redirect to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
