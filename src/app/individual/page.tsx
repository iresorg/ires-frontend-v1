import type { Metadata } from 'next';
import IndividualHero from '@/components/sections/IndividualHero';
import ScrollingTicker from '@/components/sections/ScrollingTicker';
import OurServicesIndividual from '@/components/sections/OurServicesIndividual';
import WhyNeedUs from '@/components/sections/WhyNeedUS';
import IndividualCommitment from '@/components/sections/IndividualCommitment';
export const metadata: Metadata = {
  title: 'Individual Plans - Personal Cybersecurity Protection',
  description: 'Personal cybersecurity incident response plans for individuals. 24/7 protection, identity theft response, and personal data breach assistance.',
  keywords: ['personal cybersecurity', 'individual security', 'identity protection', 'personal incident response'],
  openGraph: {
    title: 'Individual Cybersecurity Plans - Personal Protection',
    description: 'Protect yourself with personal cybersecurity incident response. Individual plans for comprehensive digital protection.',
    url: 'https://iresorg.com/individual',
  },
  twitter: {
    title: 'Individual Cybersecurity Plans - Personal Protection',
    description: 'Protect yourself with personal cybersecurity incident response.',
  },
};

export default function IndividualPage() {
  return (
<>
<IndividualHero />
<ScrollingTicker />
<OurServicesIndividual />
<WhyNeedUs />
<IndividualCommitment />
</>
  );
}
