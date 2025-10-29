"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "";

  // Hide Header and Footer
  const hideHeaderAndFooter =
    pathname.startsWith("/signup") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/create-password") ||
    pathname.startsWith("/welcome") ||
    pathname.startsWith("/dashboard");

  return (
    <>
      {!hideHeaderAndFooter && <Header />}

      <main>{children}</main>

      {!hideHeaderAndFooter && <Footer />}
    </>
  );
}
