"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Every Click Matters and Hackers Know Thatr",
      text: "Every action online leaves a trace, and cybercriminals are constantly looking for vulnerabilities. We protect you from being an easy target, with our tips and cyber education.",
    },
    {
      title: "Your Identity is Valuable",
      text: "A single stolen password or compromised account can lead to identity theft. We use advanced encryption and secure storage to keep your accounts locked down tight.",
    },
    {
      title: "Phishing is On a Rise",
      text: "Scammers hide behind legit-looking emails and texts. We teach you to spot red flags and filter out suspicious messages before you click.",
    },
    {
      title: "Public Wi-Fi isn’t safe",
      text: "Free hotspots are playgrounds for hackers. We shield your activity with secure VPN tech so no one can snoop on your data.",
    },
    {
      title: "Social Media Risks",
      text: "Oversharing can expose more than you think. We guide you on safe sharing habits and keep your profiles from being easy targets.",
    },
    {
      title: "Cybercrime Never Sleeps",
      text: "Threats evolve around the clock. We provide 24/7 monitoring and proactive defense so you stay protected without lifting a finger.",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      <Section className="relative z-10 py-20 lg:py-28">
        {/* Section Title */}
        <div className="flex justify-center mb-12">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Why You Need Us ?"
          />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full max-w-[360px] rounded-lg overflow-hidden border border-transparent [border-image:linear-gradient(to_right,#4185DD,#B425DA)_1]"
            >
              <div className="h-full bg-[#0D0D0F]/80 backdrop-blur-sm p-6 border-t-4 border-[#601474] rounded-t-lg">
                <h3 className="text-base font-semibold mb-3 bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent leading-snug">
                  {reason.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {reason.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Shapes  */}
        <Image
          src="/images/grid-cube.png"
          alt="Decorative cube"
          width={120}
          height={120}
          className="absolute bottom-0 left-0 translate-x-[-50px] translate-y-[40px] opacity-80 pointer-events-none"
        />
        <Image
          src="/images/eclipes.png"
          alt="Decorative sphere"
          width={130}
          height={130}
          className="absolute top-0 right-0 translate-x-[50px] translate-y-[-40px] opacity-80 pointer-events-none "
        />
      </Section>
    </div>
  );
}
