"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";

const teamVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

const teamMembers = [
  { role: "Founder/CEO" },
  { role: "Co-Founder" },
  { role: "Head of Operations" },
  { role: "Product Head" },
];

export default function MeetOurTeamSection() {
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
        {/* CALL*/}
        <div className="absolute top-6 right-6 lg:top-8 lg:right-12 z-40">
          <a
            href="tel:+1234567890"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#4185dd] to-[#b425da] text-white text-sm font-semibold shadow-lg hover:opacity-95 transition"
          >
            <Image
              src="/images/call.png"
              alt="Call"
              width={18}
              height={18}
              priority={true}
            />
            Call Now
          </a>
        </div>

        {/* Title */}
        <div className="flex justify-center">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Meet Our Team"
          />
        </div>

        <h2 className="text-center text-xl font-semibold text-white mt-8 mb-12">
          Meet Our Core Team
        </h2>

        {/* Grid of team members */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 justify-items-center">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={teamVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full max-w-[220px] p-[1px] rounded-xl bg-black/20 border border-transparent bg-clip-padding [border-image:linear-gradient(to_right,#4185dd,#b425da)_1]"
            >
              {/* Inner card */}
              <div className="rounded-xl bg-black/20 backdrop-blur-sm p-6 flex flex-col items-center text-center h-full">
                <Image
                  src="/images/person.png"
                  alt={member.role}
                  width={80}
                  height={80}
                  className="mb-4"
                />
                <p className="text-sm lg:text-base font-medium text-white">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
