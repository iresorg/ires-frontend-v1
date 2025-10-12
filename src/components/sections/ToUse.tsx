"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ToUseServices() {
  const steps = [
    {
      title: "Sign Up",
      text: "Creating an account with us is your first step to experiencing protection.",
      button: "Sign Up",
    },
    {
      title: "Subscribe To A Plan",
      text: "Subscribe to a suitable and affordable plan to get help.",
      button: "Explore Plans",
    },
    {
      title: "Call Hotline",
      text: "Put a call through our hotline for all your cyber emergencies we’re available 24/7.",
      button: "Call Now",
    },
    {
      title: "Stay Safe",
      text: "Our team resolves your emergencies and keeps you updated with safety tips.",
      button: "Sign Up",
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

      {/* Decorative shape */}
      <div className="absolute top-0 right-0 z-0">
        <Image
          src="/images/eclipes.png"
          alt="Decorative Shape"
          width={100}
          height={100}
          className="opacity-80"
        />
      </div>

      {/* Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-white text-lg md:text-xl font-semibold">
            <span className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent">
              To Use
            </span>
            <span className="text-white"> Our Services</span>
          </h2>
        </motion.div>

        {/* Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative rounded-2xl p-[2px] 
              bg-gradient-to-r from-[#4185DD] to-[#B425DA] 
              hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Inner box */}
              <div className="relative rounded-2xl bg-[#0E0E11]/90 backdrop-blur-md flex flex-col justify-between h-full min-h-[220px] p-6 text-center">
                <div>
                  <h3 className="font-semibold text-base mb-3 bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent">
                    {step.title}
                  </h3>

                  <p className="text-white text-sm mb-5 leading-relaxed">
                    {step.text}
                  </p>
                </div>

                <button className="px-5 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-[#4185DD] to-[#B425DA] hover:opacity-90 transition">
                  {step.button}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
