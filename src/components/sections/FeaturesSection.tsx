"use client";

import { CheckIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

const features = [
  "Rapid emergency response, anytime, anywhere",
  "Instant support via call — no app or form needed",
  "Serving individuals, small business, and enterprises",
  "Expert cyber responders for all digital threats",
  "We resolve hacking, data breaches & more",
  "Threat detection intelligence the fastest way",
  "Subscribers or one-time users — we've got you",
  "Protection, speed, and real human care",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0, 0, 1] as const },
  },
};
const slideInVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.2, 0, 0, 1] as const },
  },
};
const slideInRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay: 0.15, ease: [0.2, 0, 0, 1] as const },
  },
};
const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0, 0, 1] as const },
  },
};
const featureVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.2, 0, 0, 1] as const },
  },
};
const featureContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

export default function FeaturesSection() {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />
      <div className="security-grid absolute inset-0 opacity-40 pointer-events-none" />

      <Section className="relative z-10 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-7 space-y-6 md:space-y-8"
            variants={slideInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div className="space-y-3 md:space-y-4" variants={containerVariants}>
              <motion.div variants={itemVariants}>
                <SectionTitle
                  logo="/logos/ires-logo.svg"
                  logoAlt="iRES Logo"
                  title="Who We Are"
                />
              </motion.div>

              <motion.h2
                className="text-base sm:text-lg lg:text-2xl xl:text-3xl mt-6 lg:mt-6 font-light text-white leading-tight"
                variants={titleContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.span
                  className="gradient-shift font-bold bg-clip-text text-transparent inline-block mr-1 sm:mr-2"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                  }}
                  variants={wordVariants}
                >
                  24/7
                </motion.span>
                <motion.span className="inline-block mr-1 sm:mr-2" variants={wordVariants}>
                  Incident
                </motion.span>
                <motion.span className="inline-block mr-1 sm:mr-2" variants={wordVariants}>
                  Response
                </motion.span>
                <motion.span className="inline-block mr-1 sm:mr-2" variants={wordVariants}>
                  Emergency
                </motion.span>
                <motion.span className="inline-block" variants={wordVariants}>
                  System
                </motion.span>
              </motion.h2>

              <motion.p
                className="text-xs sm:text-sm lg:text-base leading-relaxed text-[#d1d1d1]"
                variants={itemVariants}
              >
                Cyber attacks don&apos;t wait and neither do we. We&apos;re the
                frontline you call when digital threats strike without warning.
                Built for speed, trust, and human response, we act the moment
                danger hits. Every alert matters, every second counts, every
                voice is heard. Real Time. Real People. Real Protection.
              </motion.p>
            </motion.div>

            <motion.div
              className="w-full p-3 md:p-4 lg:p-6 brand-border rounded-3xl bg-[var(--bg-color)]/80 backdrop-blur-sm"
              variants={itemVariants}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2"
                variants={featureContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/5 transition-colors duration-300"
                    variants={featureVariants}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(65,133,221,0.25), rgba(180,37,218,0.25))",
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.05, type: "spring", stiffness: 260 }}
                    >
                      <CheckIcon
                        className="w-3.5 h-3.5"
                        style={{ color: "var(--accent-secondary-color)" }}
                      />
                    </motion.div>
                    <span className="text-white text-xs sm:text-sm leading-relaxed">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
              variants={itemVariants}
            >
              <Button
                href="/about"
                className="px-8 sm:px-12 py-2 sm:py-3 text-sm sm:text-lg rounded-lg"
              >
                About Us
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block lg:col-span-5 relative w-full mt-6 lg:mt-0"
            variants={slideInRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute inset-0 top-20 -right-20 lg:-right-40 w-full h-full flex items-center justify-center"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/ellipse.png"
                alt=""
                width={400}
                height={400}
                className="w-64 sm:w-80 lg:w-[440px] h-64 sm:h-80 lg:h-[440px] opacity-80"
              />
            </motion.div>

            <motion.div
              className="absolute -left-4 top-10 z-20 glass-panel brand-border rounded-xl px-3 py-2"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/images/shield-icon.png"
                  alt=""
                  width={22}
                  height={22}
                  className="h-5 w-5"
                />
                <span className="text-xs font-medium text-white">Encrypted Line</span>
              </div>
            </motion.div>

            <motion.div
              className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[400px]"
              animate={{ y: [0, -18, 0] }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Image
                src="/images/phone.png"
                alt="iRES Mobile App"
                width={600}
                height={600}
                className="w-full max-w-xs sm:max-w-sm lg:w-[848px] lg:h-[554px]"
              />
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <motion.div
        className="absolute top-4 sm:-top-6 md:top-20 right-3 sm:right-4 z-50 -translate-y-1/2"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Button
          href="tel:+1234567890"
          className="flex items-center gap-1 px-4 sm:px-6 py-1 sm:py-2"
        >
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
            <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]" />
            <PhoneIcon className="relative z-10 w-3 sm:w-4 h-3 sm:h-4 text-[#EF4444]" />
          </div>
          <span className="text-white font-semibold text-xs sm:text-sm">
            Call Now
          </span>
        </Button>
      </motion.div>
    </div>
  );
}
