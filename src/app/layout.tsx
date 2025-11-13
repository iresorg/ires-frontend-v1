import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import LoadingScreen from "@/components/common/LoadingScreen";
import PublicLayout from "@/components/layout/PublicLayout";
import CustomCursor from "@/components/ui/CustomCursor";
import AuthProvider from "@/components/providers/AuthProvider";
import "./globals.css";
import type { Metadata } from 'next';

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: 'iRES - 24/7 Cybersecurity Incident Response Emergency System',
    template: '%s | iRES - Cybersecurity Emergency Response'
  },
  description: 'Experience fast security response like never before with cutting-edge technology. iRES provides 24/7 cybersecurity incident response, real-time threat detection, and expert cyber responders for individuals, businesses, and enterprises.',
  keywords: [
    'cybersecurity',
    'incident response',
    'emergency system',
    '24/7 security',
    'threat detection',
    'cyber threats',
    'data breach response',
    'security hotline',
    'cyber emergency',
    'digital protection'
  ],
  authors: [{ name: 'iRES Team' }],
  creator: 'iRES - Incident Response Emergency System',
  publisher: 'iRES',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://iresorg.com',
    siteName: 'iRES - Cybersecurity Emergency Response',
    title: 'iRES - 24/7 Cybersecurity Incident Response Emergency System',
    description: 'Real Time. Real People. Real Protection. Expert cybersecurity incident response available 24/7 for rapid emergency response to digital threats.',
    images: [
      {
        url: '/images/ires.jpg',
        width: 1200,
        height: 630,
        alt: 'iRES - Cybersecurity Emergency Response System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iRES - 24/7 Cybersecurity Incident Response',
    description: 'Real Time. Real People. Real Protection. Expert cybersecurity emergency response available 24/7.',
    images: ['/images/ires.jpg'],
    creator: '@iRES_Security',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://iresorg.com',
  },
  category: 'cybersecurity',
};

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
          <AuthProvider>
            <PublicLayout>
              {children}
            </PublicLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
