import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import FaqSection from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "FAQs - iRES Cybersecurity Emergency Response",
  description:
    "Frequently asked questions about iRES incident response, protection plans, coverage across Nigeria, compliance, and 24/7 emergency support.",
  openGraph: {
    title: "FAQs - iRES",
    description:
      "Answers about hotline access, response times, nationwide coverage, pricing, compliance, and how iRES works with your team.",
    url: "https://iresorg.com/faq",
  },
};

export default function FaqPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="security-grid pointer-events-none absolute inset-0 opacity-40" />

      <Section className="relative z-10 pt-32 pb-10 lg:pt-40 lg:pb-12">
        <div className="max-w-2xl">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Support"
          />
          <h1 className="mt-6 text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
            <span
              className="gradient-shift bg-clip-text font-bold text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
              }}
            >
              Frequently asked questions
            </span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-[#d1d1d1] sm:text-lg">
            Clear answers about our hotline, protection plans, response
            coverage, compliance support, and how we work with your team.
          </p>
        </div>
      </Section>

      <FaqSection />
    </div>
  );
}
