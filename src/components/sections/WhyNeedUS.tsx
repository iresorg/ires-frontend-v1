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

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

export default function WhyYouNeedUs() {
  const reasons = [
    {
      title: "Every Click Matters and Hackers Know That",
      text: "Every action online leaves a trace, and cybercriminals are constantly looking for vulnerabilities. We protect you from being an easy target, with our tips and cyber education.",
    },
    {
      title: "Your Identity is Valuable",
      text: "A single stolen password or compromised account can lead to identity theft. We use advanced encryption and secure storage to keep your accounts locked down tight.",
    },
    {
      title: "Phishing is On the Rise",
      text: "Scammers hide behind legit-looking emails and texts. We teach you to spot red flags and filter out suspicious messages before you click.",
    },
    {
      title: "Public Wi-Fi isn’t Safe",
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
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />
      <div className="security-grid absolute inset-0 opacity-30 pointer-events-none" />

      <motion.div
        className="absolute -bottom-10 right-0 w-40 h-40 lg:w-52 lg:h-52 z-0"
        variants={shapeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ y: [0, -20, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Image
          src="/shapes/section-bg-shape-1.svg"
          alt="Background shape"
          width={320}
          height={320}
          className="w-full h-full opacity-60"
        />
      </motion.div>

      <motion.div
        className="absolute -top-10 left-0 w-32 h-32 lg:w-40 lg:h-40 z-0"
        variants={shapeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ y: [0, 15, 0], rotate: [0, 360] }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
      >
        <Image
          src="/shapes/section-bg-shape-2.svg"
          alt="Background shape"
          width={256}
          height={256}
          className="w-full h-full opacity-60"
        />
      </motion.div>

      <Section className="relative z-10 py-20 lg:py-28">
        <div className="flex justify-center mb-12">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Why You Need Us ?"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
              className="relative w-full max-w-[360px] rounded-2xl p-6 glass-panel brand-border"
            >
              <h3
                className="text-base font-semibold mb-3 bg-clip-text text-transparent leading-snug"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))",
                }}
              >
                {reason.title}
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">
                {reason.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
