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
      title: "Clear Service Level Agreements",
      text: "We guarantee rapid response, high availability, and consistent support.",
    },
    {
      img: "/images/commitment2.png",
      title: "Advanced Technology + Human Expertise",
      text: "Combining AI-driven tools with expert oversight for unbeatable security.",
    },
    {
      img: "/images/commitment3.png",
      title: "Compliance and Peace of Mind",
      text: "Stay aligned with regulatory standards and industry best practices.",
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
            src="/images/cube.png"
            alt="Decorative sphere"
            width={130}
            height={130}
            className="absolute top-0 right-0 translate-x-[10px] translate-y-[-10px] opacity-80 pointer-events-none"
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
              <div className="p-[2px] rounded-[22px] bg-gradient-to-r from-[#4185DD] to-[#B425DA] h-full">
                <div className="rounded-[20px] overflow-hidden bg-[#0E0E11]/85 backdrop-blur-sm shadow-md flex flex-col h-full">
                  <div className="relative w-full h-[200px] rounded-t-[20px] overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
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

        {/* Explore Plans Section */}
        <div className="text-center mb-8">
          <p className="text-white/80 mb-4 text-sm md:text-base">
            Explore Plans Available For Your Organizations
          </p>
          <button className="px-6 py-2 cursor-pointer rounded-md text-white text-sm font-medium bg-gradient-to-r from-[#4185DD] to-[#B425DA] hover:opacity-90 transition">
            Explore Plans
          </button>
        </div>

        {/* Call button  */}
        <div className="w-full flex justify-center lg:justify-end lg:absolute lg:top-16 lg:right-8 mb-12 lg:mb-0">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#4185DD] to-[#B425DA] text-white text-sm font-medium shadow-lg hover:opacity-90 transition cursor-pointer">
            <Image
              src="/images/call.png"
              alt="Call Icon"
              width={18}
              height={18}
            />
            Call Now
          </button>
        </div>
      </Section>
    </div>
  );
}
