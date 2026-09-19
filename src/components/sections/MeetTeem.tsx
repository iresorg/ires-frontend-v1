"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.2, 0, 0, 1] as const },
  },
};

const expertise = [
  "Incident response and digital forensics",
  "Threat intelligence and malware analysis",
  "Security operations and monitoring",
  "Regulatory compliance (NDPR, GDPR, industry standards)",
  "Nigerian business and regulatory environment",
];

const teamMembers = [
  {
    name: "Dr Usman Bakare",
    role: "Founder / CEO",
    image: "/images/Mr Usman.png",
    linkedin: "https://www.linkedin.com/in/dr-usman-bakare-626a1136",
  },
  {
    name: "Simisola Olubodun",
    role: "Co-Founder / CTO",
    image: "/images/simisola.jpg",
    linkedin: "https://www.linkedin.com/in/ceemin/",
  },
];

export default function MeetOurTeamSection() {
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
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="flex flex-col items-center gap-6">
            <SectionTitle
              logo="/logos/ires-logo.svg"
              logoAlt="iRES Logo"
              title="Our Team"
            />

            <h2 className="max-w-3xl text-center text-lg font-light leading-tight text-white lg:text-2xl">
              Our cybersecurity professionals bring{" "}
              <span
                className="gradient-shift inline-block bg-clip-text font-bold text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                }}
              >
                decades of combined experience
              </span>
            </h2>

            <ul className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
              {expertise.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white/75 ring-1 ring-white/10"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--accent-color)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center"
            variants={containerVariants}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.28 } }}
                className="relative w-full max-w-70"
              >
                <div
                  className="rounded-[22px] overflow-hidden brand-border"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(28,27,43,0.92) 0%, rgba(14,14,26,0.98) 100%) padding-box, linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color)) border-box",
                  }}
                >
                  <div className="relative w-full h-75 sm:h-80 md:h-85">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <div className="mt-4 px-2 text-center">
                  <h3
                    className="gradient-shift text-base font-semibold mb-1 bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-3">{member.role}</p>
                  {member.linkedin && (
                    <Link
                      href={member.linkedin}
                      target="_blank"
                      className="text-sm font-semibold bg-clip-text text-transparent hover:opacity-80 transition cursor-pointer"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))",
                      }}
                    >
                      View LinkedIn →
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
