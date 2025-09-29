import type { Metadata } from 'next';
import AboutUsHero from '@/components/sections/AboutUsHero';
import ScrollingTicker from "@/components/sections/ScrollingTicker";
import OurStorySection from '@/components/sections/OurStorySection';
import MissionVisionSection from '@/components/sections/MisionVision';
import MeetOurTeamSection from '@/components/sections/MeetTeem';
import WhyWeExistSection from '@/components/sections/WeExist';
export const metadata: Metadata = {
  title: 'About Us - iRES Cybersecurity Emergency Response',
  description: 'Learn about iRES - the leading 24/7 cybersecurity incident response emergency system. Our expert team provides real-time protection and rapid response to digital threats.',
  openGraph: {
    title: 'About iRES - Cybersecurity Emergency Response Team',
    description: 'Meet the experts behind iRES cybersecurity emergency response system. Real Time. Real People. Real Protection.',
    url: 'https://iresorg.com/about',
  },
  twitter: {
    title: 'About iRES - Cybersecurity Emergency Response Team',
    description: 'Meet the experts behind iRES cybersecurity emergency response system.',
  },
};

export default function AboutPage() {
  return (
      <>
    <AboutUsHero />
     <ScrollingTicker />
     <OurStorySection/>
     <MissionVisionSection/>
      <MeetOurTeamSection/>
      <WhyWeExistSection/>
     </>
  );
}