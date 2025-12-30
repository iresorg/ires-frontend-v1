"use client";

import { PlayIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function WhyWeExistSection() {
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
        {/* Title */}
        <div className="flex items-center justify-center space-x-3">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={28}
            height={28}
          />
          <span className="text-white text-lg font-semibold">Why We Exist</span>
        </div>

        {/* Video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 w-full max-w-4xl p-[2px] rounded-2xl bg-gradient-to-r from-[#4185DD] to-[#B425DA]"
        >
          <div className="relative flex items-center justify-center w-full h-[260px] md:h-[340px] lg:h-[420px] rounded-2xl bg-[#0E0E11]/90 backdrop-blur-md">
            {/* Play button */}
            <motion.button
              className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#4185dd] to-[#b425da] shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayIcon className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
