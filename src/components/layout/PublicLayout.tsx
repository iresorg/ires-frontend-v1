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

  // Hide Header and Footer on signup routes
  const hideHeaderAndFooter = pathname.startsWith("/signup");

  return (
    <>
      {!hideHeaderAndFooter && <Header />}

      <main>{children}</main>

      {!hideHeaderAndFooter && <Footer />}
    </>
  );
}
