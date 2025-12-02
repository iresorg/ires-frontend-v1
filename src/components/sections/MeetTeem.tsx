"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import Link from "next/link";

const teamVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

const teamMembers = [
  {
    name: "Dr Usman Bakare",
    role: "Founder / CEO",
    image: "/images/inyang.jpg",
    linkedin: "https://www.linkedin.com/in/ceemin/",
  },
  {
    name: "Simisola Olubodun",
    role: "Co-Founder / CTO",
    image: "/images/inyang.jpg",
    linkedin: "https://www.linkedin.com/in/ceemin/",
  },
  {
    name: "Mbre Inyang",
    role: "COO",
    image: "/images/inyang.jpg",
    linkedin: "https://www.linkedin.com/in/mbre-inyang-9103b424a",
  },
];

export default function MeetOurTeamSection() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Layer */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      {/* Floating Shapes */}
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

      <motion.div
        className="absolute -top-10 left-0 w-32 h-32 lg:w-40 lg:h-40 z-0"
        variants={shapeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ y: [0, 15, 0], rotate: [0, 360] }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        }}
      >
        <Image
          src="/shapes/section-bg-shape-2.svg"
          alt="Background shape"
          width={256}
          height={256}
          className="w-full h-full opacity-60"
        />
      </motion.div>

      <Section className="relative z-10 py-16 lg:py-24">
        {/* CALL BUTTON */}
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
              priority
            />
            Call Now
          </a>
        </div>

        {/* TITLE */}
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

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={teamVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full max-w-[240px] p-[2px] rounded-2xl bg-gradient-to-r from-[#4185DD] to-[#B425DA]"
            >
              <div className="rounded-2xl bg-[#0E0E11]/90 backdrop-blur-md p-6 flex flex-col items-center text-center h-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={90}
                  height={90}
                  className="rounded-full mb-4 object-cover"
                />

                <h3 className="text-white text-sm lg:text-base font-semibold">
                  {member.name}
                </h3>

                <p className="text-gray-300 text-xs lg:text-sm mb-3">
                  {member.role}
                </p>

                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    className="text-sm font-semibold bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent hover:opacity-80 transition "
                  >
                    View LinkedIn →
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
