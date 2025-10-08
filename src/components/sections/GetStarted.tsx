"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "@/components/ui/SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function GetStartedSection() {
  const cards = [
    {
      title: "Free Quick Guide",
      text: "Download a step-by-step security starter kit.",
      btnText: "Download",
    },
    {
      title: "Easy SignUp",
      text: "Create an account in minutes and choose a plan for you.",
      btnText: "Sign Up",
    },
    {
      title: "Explore Plans",
      text: "Explore and subscribe to a suitable affordable plan for you.",
      btnText: "Explore Plans",
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      {/* Decorative Shapes */}
     
      <Image
        src="/images/cube.png"
        alt="Decorative sphere"
        width={130}
        height={130}
        className="absolute top-0 right-0 translate-x-[10px] translate-y-[-10px] opacity-80 pointer-events-none"
      />

      {/* Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        {/* Title */}
        <div className="flex justify-center mb-12">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Get Started – Protect Your Digital Life Today"
          />
        </div>

        {/* Main Content  */}
        <div className="relative flex justify-center items-center">
          {/* Gradient bordered main box */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto rounded-xl p-[1px] 
            [border-image:linear-gradient(to_right,#4185DD,#601474)_1] 
            border border-transparent max-w-5xl w-full"
          >
            <div className="bg-[#0E0E11]/80 backdrop-blur-md p-6 md:p-10 text-center">
              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base mb-12"
              >
                Don’t wait until it’s too late. Whether you’re tech-savvy or
                just getting started, our plans fit your lifestyle.
              </motion.p>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                {cards.map((card, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="[border-image:linear-gradient(to_right,#4185DD,#601474)_1] 
                    border border-transparent max-w-5xl rounded-xl p-6 bg-[#13131A]/80 
                    backdrop-blur-sm text-center transition-all duration-300 hover:scale-[1.02]"
                  >
                    <h3 className="text-white font-semibold text-base md:text-lg mb-2">
                      {card.title}
                    </h3>
                    <p className="text-white text-xs mb-4">{card.text}</p>
                    <button className="px-6 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-[#4185DD] to-[#B425DA] hover:opacity-90 transition cursor-pointer">
                      {card.btnText}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call Now Button */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[-4rem] lg:right-[-4rem]">
            <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#4185DD] to-[#B425DA] text-white text-sm font-medium shadow-lg cursor-pointer">
              <Image
                src="/images/call.png"
                alt="Call Icon"
                width={18}
                height={18}
              />
              Call Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
