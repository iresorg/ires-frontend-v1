import type { Metadata } from 'next';
import AboutUsHero from '@/components/sections/AboutUsHero';
import ScrollingTicker from "@/components/sections/ScrollingTicker";
import OurStorySection from '@/components/sections/OurStorySection';
import MissionVisionSection from '@/components/sections/MisionVision';
import MeetOurTeamSection from '@/components/sections/MeetTeem';
import WhyWeExistSection from '@/components/sections/WeExist';

export const metadata: Metadata = {
  title: 'About iRES - Cybersecurity Emergency Response',
  description: 'iRES was founded to close the gap in cybersecurity emergency response for Nigerian organizations and individuals. Learn our story, mission, vision, values, and team.',
  openGraph: {
    title: 'About iRES - Incident Response Emergency System',
    description: 'Local presence, Nigerian regulatory expertise, and 24/7 incident response — Real Time. Real People. Real Protection.',
    url: 'https://iresorg.com/about',
  },
  twitter: {
    title: 'About iRES - Incident Response Emergency System',
    description: 'Local presence, Nigerian regulatory expertise, and 24/7 incident response.',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutUsHero />
      <ScrollingTicker />
      <OurStorySection />
      <MeetOurTeamSection />
      <WhyWeExistSection />
      <MissionVisionSection />
    </>
  );
}