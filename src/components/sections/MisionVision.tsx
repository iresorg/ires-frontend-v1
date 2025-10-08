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
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

export default function MissionVisionSection() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      <Section className="relative z-10 py-16 lg:py-24">
        {/* Decorative Shape */}
        <Image
          src="/images/eclipes.png"
          alt="Decorative Cube"
          width={120}
          height={120}
          className="absolute top-0 right-0 translate-x-1/3 opacity-80 pointer-events-none"
        />

        {/* Section Title */}
        <div className="flex justify-center">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Our Mission & Vision"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 justify-items-center">
          {/* Mission */}
          <motion.div
            className="w-full max-w-[520px] p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-transparent bg-clip-padding [border-image:linear-gradient(to_right,#4185dd,#b425da)_1]"
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/logos/ires-logo.svg"
              alt="iRES Logo"
              width={40}
              height={40}
              className="mb-4"
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#4185dd] to-[#b425da] bg-clip-text text-transparent">
                Mission
              </h3>
              <p className="text-sm lg:text-base text-white/90 leading-relaxed">
                To deliver cutting-edge, human-centered cybersecurity solutions
                that empower individuals, businesses, and institutions to feel
                safe and operate confidently in the digital world.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="w-full max-w-[520px] p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-transparent bg-clip-padding [border-image:linear-gradient(to_right,#4185dd,#b425da)_1]"
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/logos/ires-logo.svg"
              alt="iRES Logo"
              width={40}
              height={40}
              className="mb-4"
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#4185dd] to-[#b425da] bg-clip-text text-transparent">
                Vision
              </h3>
              <p className="text-sm lg:text-base text-white leading-relaxed">
                To become the most trusted cybersecurity partner in Africa and
                beyond; setting the global standard for accessible, innovative,
                and people-first digital protection.
              </p>
            </div>
          </motion.div>
        </div>

   
      </Section>
    </div>
  );
}
