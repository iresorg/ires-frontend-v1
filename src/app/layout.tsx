'use client'

import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import LoadingScreen from "@/components/common/LoadingScreen";
import PublicLayout from "@/components/layout/PublicLayout";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100`}>
        <LoadingScreen />
        <CustomCursor />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PublicLayout>
            {children}
          </PublicLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
