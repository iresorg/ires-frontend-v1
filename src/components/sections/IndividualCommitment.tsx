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
              className="relative w-full max-w-[360px] transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Outer gradient border */}
              <div className="p-[2px] rounded-[22px] bg-gradient-to-r from-[#4185DD] to-[#B425DA] h-full">
                {/* Inner content */}
                <div className="rounded-[20px] overflow-hidden bg-[#0E0E11]/85 backdrop-blur-sm shadow-md flex flex-col h-full">
                  {/* Image */}
                  <div className="relative w-full h-[200px] rounded-t-[20px] overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="p-6 flex flex-col flex-grow justify-between text-center">
                    <div>
                      <h3 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4185DD] to-[#B425DA] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </Section>
    </div>
  );
}
