"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.2, 0, 0, 1] as const },
  },
};

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

const cards = [
  {
    title: "Mission",
    body: "To deliver always-on cybersecurity emergency response, intelligence and coordinated recovery services that enable organizations to respond to cyber threats with speed, confidence and resilience.",
  },
  {
    title: "Vision",
    body: "A digitally resilient Africa where no organization faces a cyber crisis alone.",
  },
];

export default function MissionVisionSection() {
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

      <Section className="relative z-10 py-14 lg:py-20">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="flex justify-center">
            <SectionTitle
              logo="/logos/ires-logo.svg"
              logoAlt="iRES Logo"
              title="Our Mission & Vision"
            />
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 justify-items-center"
            variants={containerVariants}
          >
            {cards.map((card) => (
              <motion.div
                key={card.title}
                className="group relative w-full max-w-130 rounded-3xl p-6 lg:p-8 brand-border"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(28,27,43,0.92) 0%, rgba(14,14,26,0.98) 100%) padding-box, linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color)) border-box",
                }}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.28 } }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(65,133,221,0.2) 0%, transparent 70%)",
                  }}
                />

                <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
                  <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]/40" />
                  <Image
                    src="/logos/ires-logo.svg"
                    alt="iRES Logo"
                    width={40}
                    height={40}
                    className="relative z-10"
                  />
                </div>

                <div className="text-center">
                  <h3
                    className="gradient-shift mb-4 text-xl font-semibold bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm lg:text-base text-white/90 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
