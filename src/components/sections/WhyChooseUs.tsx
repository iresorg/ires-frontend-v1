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

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "The Threat Landscape Is Moving Faster Than Ever",
      text: "Cyber threats are evolving fast, and attackers won’t wait. Your organization needs security that’s always ahead — we bring cutting-edge tools, real-time intelligence, and relentless innovation to keep you untouchable.",
    },
    {
      title: "Your Reputation Is Priceless — We Keep It Untarnished",
      text: "One slip can cost millions and break trust instantly. We protect your brand like it’s our own, so your name stays golden and customers stay loyal.",
    },
    {
      title: "Security Should Fuel Growth, Not Hold It Back",
      text: "We turn cybersecurity into a growth engine. While you focus on scaling and innovation, we handle the complex, evolving threats behind the scenes.",
    },
    {
      title: "Already Have a Security Team? Perfect. We Make Them Unstoppable",
      text: "Even the strongest internal teams can’t cover every angle. We integrate seamlessly, boost their efficiency, and give them tools and expertise they might not have. We’re not here to replace; we’re here to elevate.",
    },
    {
      title: "What Makes Us Different",
      text: "We plug into your world like we’ve always been there. We bring tech and intelligence most can’t access. Security isn’t a side job for us — it’s our obsession.",
    },
    {
      title: "Bottom Line",
      text: "Whether you’re starting fresh or already have a setup, we make your organization sharper, smarter, and bulletproof.",
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
            title="Why Choose Us ?"
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
