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
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};
const shapeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

export default function OurCommitment() {
  const commitments = [
    {
      img: "/images/commitment1.png",
      title: "Clear Support and Availability",
      text: "Accessible help when you need it, with fast responses and dedicated support",
    },
    {
      img: "/images/commitment2.png",
      title: "Advanced Technology + Human Expertise",
      text: "Tech-backed protection combined with personal, friendly guidance.",
    },
    {
      img: "/images/commitment3.png",
      title: "Peace of Mind Always",
      text: "Whether you’re online shopping, banking, or browsing, we keep you covered.",
    },
  ];

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

      <Section className="relative z-10 py-20 lg:py-28">
        <div className="flex justify-center mb-12">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Our Commitment To You (SLA & Security)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-16">
          {commitments.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
              tabIndex={0}
              className="relative w-full max-w-[360px] overflow-hidden rounded-[22px] glass-panel brand-border flex flex-col"
            >
              <div className="relative w-full h-[200px] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between text-center">
                <div>
                  <h3
                    className="text-base font-semibold bg-clip-text text-transparent mb-2"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute -bottom-10 right-0 w-40 h-40 lg:w-52 lg:h-52 z-0"
          variants={shapeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src="/images/eclipes.png"
            alt="Decorative cube"
            width={120}
            height={120}
            className="absolute bottom-0 right-[-60px] opacity-80 pointer-events-none"
          />
        </motion.div>
      </Section>
    </div>
  );
}
