"use client";

import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

export default function OurStorySection() {
  return (
    <div className="relative w-full">
      {/* Background */}
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
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <SectionTitle
              logo="/logos/ires-logo.svg"
              logoAlt="iRES Logo"
              title="Our Story"
            />

            {/* Story Text */}
            <motion.div
              className="p-6 rounded-xl border border-white/20 bg-black/20 backdrop-blur-sm"
              variants={containerVariants}
            >
              <p className="text-sm lg:text-base text-white leading-relaxed mb-4">
                The story of iRES begins with a simple truth: most people and
                businesses don’t realize they are vulnerable until it’s too
                late.
              </p>
              <p className="text-sm lg:text-base text-white leading-relaxed mb-4">
                As founders, we saw it first-hand. Friends, small businesses,
                even established companies losing sensitive data, financial
                resources, and trust not because they didn’t care about
                security, but because they didn’t know where to begin. We knew
                cybersecurity had to be more than jargon, more than expensive
                tools reserved for the privileged few. It had to be human.
                Accessible. Proactive.
              </p>
              <p className="text-sm lg:text-base text-white leading-relaxed mb-4">
                That’s why iRES exists to close the gap between everyday people
                and complex cybersecurity solutions.
              </p>
              <p className="text-sm lg:text-base text-white leading-relaxed mb-4">
                We are building a future where your grandmother can understand
                the safety of her online banking, where a small business can
                operate without fear of hackers, where governments and
                corporations can trust the resilience of their defenses. Our
                story is not just about technology.
              </p>
              <p className="text-sm lg:text-base text-white leading-relaxed">
                It’s about protecting dreams, businesses, and people’s lives in
                the digital space. At iRES, we don’t just fight cyber threats.
                We fight for you.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Content - Illustration */}
          <motion.div
            className="lg:col-span-5 relative w-full flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/story-illustration.png"
              alt="iRES Story Illustration"
              width={500}
              height={400}
              className="lg:w-[500px] lg:h-[400px] object-contain"
            />
          </motion.div>
        </div>
      </Section>

      {/* Floating Play Button */}
      <motion.button
        className="absolute bottom-8 left-8 w-12 h-12 rounded-full flex items-center justify-center z-20"
        style={{ background: "var(--accent-secondary-color)" }}
        aria-label="Play video"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(180, 37, 218, 0.5)",
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <motion.div
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <PlayIcon className="w-6 h-6 text-white" />
        </motion.div>
      </motion.button>
    </div>
  );
}
