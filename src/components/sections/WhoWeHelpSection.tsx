"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0, 0, 1] as const },
  },
};

const audiences = [
  {
    title: "Individual",
    href: "/individual",
    accentIcon: "/icons/lock-ad.svg",
    paragraphs: [
      "We help everyday internet users, high-profile personalities, remote workers, and anyone facing online threats. Whether you're dealing with stolen accounts, online scams, identity theft, or privacy breaches.",
      "Our expert team provides incident investigation, account recovery, stopping impersonators, and flexible protection plans — from one-off fixes to ongoing monitoring that keeps you safe 24/7.",
    ],
  },
  {
    title: "Organization",
    href: "/organization",
    accentIcon: "/images/fortress.png",
    paragraphs: [
      "We serve small businesses, growing startups, large corporations, and global enterprises across industries like finance, retail, healthcare, education, and technology.",
      "From phishing attacks and ransomware to insider threats and data breaches, we provide quick response to contain damage, secure systems, and prevent future incidents. Flexible business protection plans for single incidents or full-scale ongoing security.",
    ],
  },
];

export default function WhoWeHelpSection() {
  return (
    <div className="relative w-full overflow-hidden py-14 lg:py-20">
      <motion.div
        className="absolute -top-10 right-0 z-0 h-40 w-40 lg:h-52 lg:w-52"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.55 }}
        viewport={{ once: true }}
        animate={{ y: [0, 40, 0] }}
        transition={{
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Image
          src="/shapes/section-bg-shape-1.svg"
          alt=""
          width={220}
          height={220}
          className="h-full w-full"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 z-0 h-48 w-48 lg:h-52 lg:w-52"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.55 }}
        viewport={{ once: true }}
        animate={{ y: [0, -16, 0], rotate: [0, 360] }}
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 28, repeat: Infinity, ease: "linear" },
        }}
      >
        <Image
          src="/shapes/section-bg-shape-2.svg"
          alt=""
          width={256}
          height={256}
          className="h-full w-full"
        />
      </motion.div>

      <Section className="relative z-10">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div className="space-y-4 text-start" variants={itemVariants}>
            <SectionTitle
              logo="/logos/ires-logo.svg"
              logoAlt="iRES Logo"
              title="Who We Help"
            />
            <h2 className="mt-2 text-lg font-light leading-tight text-white lg:mt-6 lg:text-2xl xl:text-3xl">
              <motion.span
                className="gradient-shift mr-2 inline-block bg-clip-text font-bold text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                }}
              >
                Users
              </motion.span>
              we offer our services and support to
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10"
            variants={containerVariants}
          >
            {audiences.map((audience) => (
              <motion.div
                key={audience.title}
                className="group relative overflow-hidden rounded-3xl p-8 lg:p-10 brand-border"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(28,27,43,0.95) 0%, rgba(14,14,26,0.98) 100%)",
                }}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(65,133,221,0.2) 0%, transparent 70%)",
                  }}
                />

                <motion.div
                  className="mb-6 flex justify-center"
                  variants={itemVariants}
                >
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]/40" />
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <Image
                        src={audience.accentIcon}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 object-contain"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.h3
                  className="mb-6 text-center text-2xl font-bold lg:text-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  variants={itemVariants}
                >
                  {audience.title}
                </motion.h3>

                <motion.div
                  className="space-y-4 text-sm leading-relaxed text-white/90 lg:text-base"
                  variants={itemVariants}
                >
                  {audience.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </motion.div>

                <motion.div
                  className="mt-8 flex justify-center"
                  variants={itemVariants}
                >
                  <Button
                    href={audience.href}
                    className="rounded-xl px-8 py-3 text-sm lg:text-base"
                  >
                    Explore More
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
