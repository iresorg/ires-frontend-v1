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
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } },
};

export default function OurStorySection() {
  return (
    <div className="relative w-full">
      {/* Background shapes */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      <Section className="relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <motion.div variants={itemVariants}>
              <SectionTitle
                logo="/logos/ires-logo.svg"
                logoAlt="iRES Logo"
                title="Our Story"
              />
            </motion.div>

            {/* Story Text Box */}
            <motion.div
              className="relative rounded-2xl p-[2px] bg-gradient-to-r from-[#4185DD] to-[#B425DA]"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="rounded-2xl bg-[#0E0E11]/90 backdrop-blur-md p-6 space-y-4">
                <motion.p
                  className="text-sm lg:text-base text-white leading-relaxed"
                  variants={itemVariants}
                >
                  The story of iRES begins with a simple truth: most people and
                  businesses don’t realize they are vulnerable until it’s too
                  late.
                </motion.p>

                <motion.p
                  className="text-sm lg:text-base text-white leading-relaxed"
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
                  className="text-sm lg:text-base text-white leading-relaxed"
                  variants={itemVariants}
                >
                  That’s why iRES exists to close the gap between everyday
                  people and complex cybersecurity solutions.
                </motion.p>

                <motion.p
                  className="text-sm lg:text-base text-white leading-relaxed"
                  variants={itemVariants}
                >
                  We are building a future where your grandmother can understand
                  the safety of her online banking, where a small business can
                  operate without fear of hackers, where governments and
                  corporations can trust the resilience of their defenses. Our
                  story is not just about technology.
                </motion.p>

                <motion.p
                  className="text-sm lg:text-base text-white leading-relaxed"
                  variants={itemVariants}
                >
                  It’s about protecting dreams, businesses, and people’s lives
                  in the digital space. At iRES, we don’t just fight cyber
                  threats. We fight for you.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="lg:col-span-5 relative w-full flex justify-center"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Ellipse Background */}
            <motion.div
              className="absolute inset-0 top-10 -right-20 w-80 h-80 lg:w-[440px] lg:h-[440px]"
              variants={itemVariants}
            >
              <Image
                src="/images/ellipse.png"
                alt="Background ellipse"
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Desktop View Image */}
            {/* <motion.div
              className="relative z-10 w-[500px] h-[400px]"
              variants={itemVariants}
            > */}
              <motion.div
                          className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[400px]"
                          animate={{ y: [0, -20, 0] }}
                          transition={{
                            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
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

      {/* Play Button */}
      <motion.button
        className="absolute bottom-8 left-8 w-12 h-12 rounded-full flex items-center justify-center z-20"
        style={{ background: "var(--accent-secondary-color)" }}
        aria-label="Play video"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(180, 37, 218, 0.5)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
      >
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          }}
        >
          <PlayIcon className="w-6 h-6 text-white" />
        </motion.div>
      </motion.button>
    </div>
  );
}
