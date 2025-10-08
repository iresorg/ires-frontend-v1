import type { Metadata } from "next";
import OrganizationHero from "@/components/sections/OrganizationHero";
import ScrollingTicker from "@/components/sections/ScrollingTicker";
import OurServices from "@/components/sections/OurServices";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurCommitmentSection from "@/components/sections/OurCommitment";
export const metadata: Metadata = {
  title: "Organization Plans - Enterprise Cybersecurity Response",
  description:
    "Comprehensive cybersecurity incident response plans for organizations and enterprises. 24/7 protection, rapid response, and expert threat mitigation services.",
  keywords: [
    "enterprise cybersecurity",
    "organization security",
    "business incident response",
    "corporate security plans",
  ],
  openGraph: {
    title: "Organization Cybersecurity Plans - iRES Enterprise Security",
    description:
      "Protect your organization with enterprise-grade cybersecurity incident response. Custom plans for businesses of all sizes.",
    url: "https://iresorg.com/organization",
  },
  twitter: {
    title: "Organization Cybersecurity Plans - iRES Enterprise Security",
    description:
      "Protect your organization with enterprise-grade cybersecurity incident response.",
  },
};

export default function OrganizationPage() {
  return (
    <>
      <OrganizationHero />
      <ScrollingTicker />
      <OurServices />
      <WhyChooseUs />
      <OurCommitmentSection />
    </>
  );
}
