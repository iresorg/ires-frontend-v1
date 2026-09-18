"use client";

import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0, 0, 1] as const },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.2, 0, 0, 1] as const },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay: 0.15, ease: [0.2, 0, 0, 1] as const },
  },
};

export default function OurStorySection() {
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

      <Section className="relative z-10 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-7 space-y-6 md:space-y-8"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={itemVariants}>
              <SectionTitle
                logo="/logos/ires-logo.svg"
                logoAlt="iRES Logo"
                title="Our Story"
              />
            </motion.div>

            <motion.div
              className="relative rounded-3xl p-6 lg:p-8 brand-border"
              style={{
                background:
                  "linear-gradient(160deg, rgba(28,27,43,0.92) 0%, rgba(14,14,26,0.98) 100%) padding-box, linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color)) border-box",
              }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
            >
              <div className="space-y-4">
                <motion.p
                  className="text-sm lg:text-base text-white/90 leading-relaxed"
                  variants={itemVariants}
                >
                  The story of iRES begins with a simple truth: most people and
                  businesses don’t realize they are vulnerable until it’s too
                  late.
                </motion.p>

                <motion.p
                  className="text-sm lg:text-base text-white/90 leading-relaxed"
                  variants={itemVariants}
                >
                  As founders, we saw it first-hand. Friends, small businesses,
                  even established companies losing sensitive data, financial
                  resources, and trust not because they didn’t care about
                  security, but because they didn’t know where to begin. We knew
                  cybersecurity had to be more than jargon, more than expensive
                  tools reserved for the privileged few. It had to be human.
                  Accessible. Proactive.
                </motion.p>

                <motion.p
                  className="text-sm lg:text-base text-white/90 leading-relaxed"
                  variants={itemVariants}
                >
                  That’s why iRES exists to close the gap between everyday
                  people and complex cybersecurity solutions.
                </motion.p>

                <motion.p
                  className="text-sm lg:text-base text-white/90 leading-relaxed"
                  variants={itemVariants}
                >
                  We are building a future where your grandmother can understand
                  the safety of her online banking, where a small business can
                  operate without fear of hackers, where governments and
                  corporations can trust the resilience of their defenses. Our
                  story is not just about technology.
                </motion.p>

                <motion.p
                  className="text-sm lg:text-base text-white/90 leading-relaxed"
                  variants={itemVariants}
                >
                  It’s about protecting dreams, businesses, and people’s lives
                  in the digital space. At iRES, we don’t just fight cyber
                  threats. We fight for you.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative w-full flex justify-center"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute inset-0 top-10 -right-20 w-80 h-80 lg:w-[440px] lg:h-[440px]"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/ellipse.png"
                alt="Background ellipse"
                fill
                className="object-contain opacity-80"
              />
            </motion.div>

            <motion.div
              className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[400px] float-y"
              animate={{ y: [0, -18, 0] }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Image
                src="/images/desktopview.png"
                alt="iRES Story Illustration"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <motion.button
        className="absolute bottom-8 left-8 w-12 h-12 rounded-full flex items-center justify-center z-20"
        style={{ background: "var(--btn-bg)" }}
        aria-label="Play video"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(65, 133, 221, 0.45)",
        }}
      >
        <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]" />
        <PlayIcon className="relative z-10 w-6 h-6 text-white" />
      </motion.button>
    </div>
  );
}
