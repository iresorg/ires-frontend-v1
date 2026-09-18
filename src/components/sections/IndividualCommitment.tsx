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

export default function IndividualCommitment() {
  const commitments = [
    {
      img: "/images/commitment1.png",
      title: "Clear Service Level Agreements",
      text: "Accessible help when you need it, with fast responses and dedicated support.",
    },
    {
      img: "/images/commitment2.png",
      title: "Trusted Tools + Human Care",
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
      </Section>
    </div>
  );
}
