import type { Metadata } from 'next';
import Hero from "@/components/sections/Hero";
import ScrollingTicker from "@/components/sections/ScrollingTicker";
import FeaturesSection from "@/components/sections/FeaturesSection";

export const metadata: Metadata = {
  title: 'Home - 24/7 Cybersecurity Emergency Response',
  description: 'iRES provides 24/7 cybersecurity incident response emergency system. Real Time. Real People. Real Protection. Expert cyber responders for rapid emergency response to digital threats.',
  openGraph: {
    title: 'iRES - 24/7 Cybersecurity Incident Response Emergency System',
    description: 'Real Time. Real People. Real Protection. Expert cybersecurity incident response available 24/7 for rapid emergency response to digital threats.',
    url: 'https://ires-security.com',
  },
  twitter: {
    title: 'iRES - 24/7 Cybersecurity Emergency Response',
    description: 'Real Time. Real People. Real Protection. Expert cybersecurity emergency response available 24/7.',
  },
};


export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollingTicker />
      <FeaturesSection />
    </>
  );
}
