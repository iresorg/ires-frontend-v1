import type { Metadata } from 'next';
import ServiceHero from '@/components/sections/ServiceHero';
import ScrollingTicker from '@/components/sections/ScrollingTicker';
import Service from '@/components/sections/Service';
import ToUse from '@/components/sections/ToUse';
import ContactUsSection from "@/components/sections/ContactUsSection";
export const metadata: Metadata = {
  title: 'Our Services - Cybersecurity Emergency Response Services',
  description: 'Comprehensive cybersecurity services including incident response, threat detection, data breach response, malware removal, and 24/7 security monitoring.',
  keywords: ['cybersecurity services', 'incident response services', 'threat detection', 'data breach response', 'malware removal', 'security monitoring'],
  openGraph: {
    title: 'Cybersecurity Services - iRES Emergency Response',
    description: 'Comprehensive cybersecurity services including 24/7 monitoring, incident response, and threat mitigation.',
    url: 'https://iresorg.com/services',
  },
  twitter: {
    title: 'Cybersecurity Services - iRES Emergency Response',
    description: 'Comprehensive cybersecurity services including 24/7 monitoring, incident response, and threat mitigation.',
  },
};

export default function ServicesPage() {
  return (
 <>
 <ServiceHero />
 <ScrollingTicker />
  <Service />
  <ToUse />
  <ContactUsSection />
 </>
   
  );
}