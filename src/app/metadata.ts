import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IRES - Emergency Response Services",
  description:
    "Connecting communities with trained emergency responders for rapid assistance in crisis situations.",
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};
