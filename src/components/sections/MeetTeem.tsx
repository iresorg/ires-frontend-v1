"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

const teamMembers = [
  {
    name: "Dr Usman Bakare",
    role: "Founder / CEO",
    image: "/images/Mr Usman.png",
    linkedin: "https://www.linkedin.com/in/dr-usman-bakare-626a1136"

  },
  {
    name: "Simisola Olubodun",
    role: "Co-Founder / CTO",
    image: "/images/simisola.jpg",
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

      <Section className="relative z-10 py-16 lg:py-24">
        {/* TITLE */}
        <div className="flex justify-center mb-12">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Meet Our Team"
          />
        </div>

        <h2 className="text-center text-xl font-semibold text-white mb-12">
          Meet Our Core Team
        </h2>

        {/* TEAM GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full max-w-[280px] transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* Outer gradient border with image filling the card */}
              <div className="p-[2px] rounded-[22px] bg-gradient-to-r from-[#4185DD] to-[#B425DA]">
                {/* Image container: fills the inner rounded area */}
                <div className="rounded-[20px] overflow-hidden relative w-full h-[300px] sm:h-[320px] md:h-[340px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Text content moved below the card */}
              <div className="mt-4 px-2 text-center">
                <h3 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4185DD] to-[#B425DA] mb-1">
                  {member.name}
                </h3>
                <p className="text-white/80 text-sm mb-3">{member.role}</p>
                {member.linkedin && (
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    className="text-sm font-semibold bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent hover:opacity-80 transition cursor-pointer"
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
