import type { Metadata } from 'next';
import ServiceHero from '@/components/sections/ServiceHero';
import ScrollingTicker from '@/components/sections/ScrollingTicker';
import Service from '@/components/sections/Service';
import ToUse from '@/components/sections/ToUse';
import ContactUsSection from "@/components/sections/ContactUsSection";
export const metadata: Metadata = {
  title: 'Our Services - SOC, Incident Response, Forensics and CISO-as-a-Service',
  description:
    'iRES services you can take on their own or together: SOC monitoring, 24/7 cyber incident response, digital forensics, and CISO-as-a-Service.',
  keywords: [
    'iRES SOC',
    'cyber incident response',
    'digital forensics',
    'CISO as a service',
    'cybersecurity services',
  ],
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