"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide Header and Footer on signup and login routes
  const hideHeaderAndFooter =
   pathname.startsWith("/signup") ||
  pathname.startsWith("/login") ||
  pathname.startsWith("/forgot-password");


  return (
    <>
      {!hideHeaderAndFooter && <Header />}

      <main>{children}</main>

      {!hideHeaderAndFooter && <Footer />}
    </>
  );
}
