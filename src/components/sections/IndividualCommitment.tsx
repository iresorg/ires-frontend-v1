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

export default function OurCommitment() {
  const commitments = [
    {
      img: "/images/commitment1.png",
      title: "Clear Service Level Agreements",
      text: "Accessible help when you need it, with fast responses and dedicated support",
    },
    {
      img: "/images/commitment2.png",
      title: "Trusted Tools + Human Care",
      text: "Tech-backed protection combined with personal, friendly guidance.",
    },
    {
      img: "/images/commitment3.png",
      title: "Peace of Mind Always",
      text: "Whether you’re online shopping, banking, or browsing, we keep you covered",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      <Section className="relative z-10 py-20 lg:py-28">
        {/* Section Title */}
        <div className="flex justify-center mb-12">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Our Commitment To You (SLA & Security)"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-16">
          {commitments.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              tabIndex={0}
              className="border border-[#ffffff24] rounded-xl overflow-hidden bg-[#0E0E11]/80 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative w-full h-[200px]">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>

              {/* Text */}
              <div className="p-6 flex flex-col gap-2 text-center">
                <h3 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4185DD] to-[#B425DA]">
                  {item.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
  
      </Section>
    </div>
  );
}
