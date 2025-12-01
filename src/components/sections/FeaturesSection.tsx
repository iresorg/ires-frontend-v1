"use client";

import { CheckIcon, PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

const features = [
  "Rapid emergency response, anytime, anywhere",
  "Instant support via call no app or form needed",
  "Serving individuals, small business, and enterprises",
  "Expert cyber responders for all digital threats",
  "We resolve hacking, data breaches & more",
  "Threat detection intelligence the fastest way",
  "Subscribers or one-time users we&apos;ve got you!",
  "Protection, speed, and real human care",
];

// Variants remain unchanged
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
};
const slideInVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
};
const slideInRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.6 } },
};
const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};
const wordVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
};
const featureVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5 } },
};
const featureContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

export default function FeaturesSection() {
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

      <Section className="relative z-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="lg:col-span-7 space-y-6 md:space-y-8"
            variants={slideInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Header */}
            <motion.div
              className="space-y-3 md:space-y-4"
              variants={containerVariants}
            >
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
                  className="font-bold bg-clip-text text-transparent inline-block mr-1 sm:mr-2"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    backgroundSize: "200% auto",
                  }}
                  variants={wordVariants}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  24/7
                </motion.span>
                <motion.span
                  className="inline-block mr-1 sm:mr-2"
                  variants={wordVariants}
                >
                  Incident
                </motion.span>
                <motion.span
                  className="inline-block mr-1 sm:mr-2"
                  variants={wordVariants}
                >
                  Response
                </motion.span>
                <motion.span
                  className="inline-block mr-1 sm:mr-2"
                  variants={wordVariants}
                >
                  Emergency
                </motion.span>
                <motion.span className="inline-block" variants={wordVariants}>
                  System
                </motion.span>
              </motion.h2>

              <motion.p
                className="text-xs sm:text-sm lg:text-base leading-relaxed"
                variants={itemVariants}
              >
                Cyber attacks don&apos;t wait and neither do we. We&apos;re the
                frontline you call when digital threats strike without warning.
                Built for speed, trust, and human response, we act the moment
                danger hits. Every alert matters, every second counts, every
                voice is heard. Real Time. Real People. Real Protection.
              </motion.p>
            </motion.div>

            {/* Features List */}
            <motion.div
              className="w-full p-3 md:p-4 lg:p-6 btn-default btn-highlighted rounded-3xl"
              variants={itemVariants}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
                variants={featureContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
                    variants={featureVariants}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      <CheckIcon
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: "var(--accent-secondary-color)" }}
                      />
                    </motion.div>
                    <motion.span
                      className="text-white text-xs sm:text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                    >
                      {feature}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
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

          {/* Right Content - Phone Image */}
          <motion.div
            className="hidden lg:block lg:col-span-5 relative w-full mt-6 lg:mt-0"
            variants={slideInRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Ellipse Background */}
            <motion.div
              className="absolute inset-0 top-20 -right-20 lg:-right-40 w-full h-full flex items-center justify-center"
              variants={itemVariants}
            >
              <Image
                src="/images/ellipse.png"
                alt="Background ellipse"
                width={400}
                height={400}
                className="w-64 sm:w-80 lg:w-[440px] h-64 sm:h-80 lg:h-[440px]"
              />
            </motion.div>

            {/* Phone Image */}

            <motion.div
              className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[400px]"
              animate={{ y: [0, -20, 0] }}
              transition={{
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
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

      {/* Call Now Button */}
      <div className="absolute top-4 sm:-top-6 md:top-20 right-3 sm:right-4 transform -translate-y-1/2 z-50">
        <Button
          href="tel:+1234567890"
          className="flex items-center gap-1 px-4 sm:px-6 py-1 sm:py-2 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
            <PhoneIcon className="w-3 sm:w-4 h-3 sm:h-4 text-red-500" />
          </div>
          <span className="text-white font-semibold text-xs sm:text-sm">
            Call Now
          </span>
        </Button>
      </div>
    </div>
  );
}
