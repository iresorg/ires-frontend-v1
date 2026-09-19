"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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
    body: "Deliver fast, coordinated, and technology-driven incident response services that minimize downtime, financial loss, and reputational damage for organizations across Nigeria.",
  },
  {
    title: "Vision",
    body: "To be the trusted cybersecurity emergency response partner for every Nigerian organization, ensuring no business faces cyber threats alone.",
  },
];

const values = [
  {
    title: "Speed",
    body: "Every minute matters in incident response.",
  },
  {
    title: "Trust",
    body: "Client confidentiality and data security are paramount.",
  },
  {
    title: "Innovation",
    body: "Continuous improvement of tools and techniques.",
  },
  {
    title: "Resilience",
    body: "24/7 availability, no exceptions.",
  },
  {
    title: "Collaboration",
    body: "Working alongside your team, not replacing them.",
  },
  {
    title: "Emotional Intelligence",
    body: "Keeping clients calm and informed during crises.",
  },
];

export default function MissionVisionSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />
      <div className="security-grid pointer-events-none absolute inset-0 opacity-30" />

      <motion.div
        className="absolute -bottom-10 right-0 z-0 h-40 w-40 lg:h-52 lg:w-52"
        variants={shapeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ y: [0, -20, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Image
          src="/shapes/section-bg-shape-1.svg"
          alt=""
          width={320}
          height={320}
          className="h-full w-full opacity-60"
        />
      </motion.div>

      <Section className="relative z-10 py-14 lg:py-20">
        <motion.div
          className="space-y-14"
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
            className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:gap-8"
            variants={containerVariants}
          >
            {cards.map((card) => (
              <motion.div
                key={card.title}
                className="group relative w-full max-w-130 rounded-3xl p-6 brand-border lg:p-8"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(28,27,43,0.92) 0%, rgba(14,14,26,0.98) 100%) padding-box, linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color)) border-box",
                }}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.28 } }}
              >
                <div className="relative mb-4 flex h-12 w-12 items-center justify-center">
                  <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]/40" />
                  <Image
                    src="/logos/ires-logo.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="relative z-10"
                  />
                </div>

                <div className="text-center">
                  <h3
                    className="gradient-shift mb-4 bg-clip-text text-xl font-semibold text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/90 lg:text-base">
                    {card.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <SectionTitle
                logo="/logos/ires-logo.svg"
                logoAlt="iRES Logo"
                title="Our Values"
              />
              <p className="max-w-2xl text-sm text-white/60 sm:text-base">
                The principles that guide how we respond when every minute
                counts.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={cardVariants}
                  className="rounded-2xl bg-[#141327]/80 p-5 ring-1 ring-white/10 transition hover:bg-white/[0.04]"
                >
                  <h4
                    className="mb-2 text-base font-semibold"
                    style={{ color: "var(--accent-color)" }}
                  >
                    {value.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-white/70">
                    {value.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
