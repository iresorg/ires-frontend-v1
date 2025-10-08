import type { Metadata } from 'next';
import PricingHero from '@/components/sections/PricingHero';
import ScrollingTicker from "@/components/sections/ScrollingTicker";
import OurPlans from '@/components/sections/OurPlans';
export const metadata: Metadata = {
  title: 'Pricing Plans - Cybersecurity Emergency Response Plans',
  description: 'Explore iRES cybersecurity incident response pricing plans. Affordable 24/7 protection for individuals, businesses, and enterprises. Compare features and choose your plan.',
  keywords: ['cybersecurity pricing', 'incident response plans', 'security pricing', 'emergency response cost'],
  openGraph: {
    title: 'Pricing Plans - iRES Cybersecurity Emergency Response',
    description: 'Compare cybersecurity incident response plans. Find the perfect protection plan for your needs with transparent pricing.',
    url: 'https://iresorg.com/pricing',
  },
  twitter: {
    title: 'Pricing Plans - iRES Cybersecurity Emergency Response',
    description: 'Compare cybersecurity incident response plans. Find the perfect protection plan for your needs.',
  },
};

export default function PricingPage() {
    return (
<>
<PricingHero />
<ScrollingTicker />
<OurPlans />
</>
  );
} 