"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function OurServicesForIndividuals() {
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

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-center mb-12"
        >
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={30}
            height={30}
            className="mr-2"
          />
          <h2 className="text-white text-lg md:text-xl font-semibold">
            Our Services for Individuals
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left */}
          <div className="lg:col-span-6 flex flex-col gap-6 relative">
            {[
              {
                title: "Quick, Simple Protection",
                text: "Zero tech stress. Our system is built for everyone — secure your accounts, devices, and personal info effortlessly.",
              },
              {
                title: "Proactive Threat Defense",
                text: "Put a call through we detect, respond, and resolve threats instantly to protect you in real time.",
              },
              {
                title: "End-to-End Support",
                text: "From onboarding to 24/7 protection, we’re always here. Your incident is our priority, anytime, anywhere.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`w-full max-w-sm p-[1px] rounded-2xl bg-gradient-to-r from-[#4185DD] to-[#B425DA]
                ${i === 1 ? "ml-32" : ""} ${i === 2 ? "ml-48" : ""}`}
              >
                <div className="rounded-2xl bg-[#0E0E11]/90 backdrop-blur-md p-5">
                  <h3 className="text-base font-semibold mb-2 bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent">
                    {service.title}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {service.text}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Play Button */}
            <motion.button
              className="absolute -bottom-12 left-1 w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "var(--accent-secondary-color)" }}
              aria-label="Play video"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px rgba(180, 37, 218, 0.5)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <PlayIcon className="w-6 h-6 text-white" />
              </motion.div>
            </motion.button>
          </div>

          {/* Right */}
          <motion.div
            className="lg:col-span-6 relative w-full flex justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Ellipse */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={fadeUp}
            >
              <Image
                src="/images/ellipse.png"
                alt="Background Ellipse"
                width={440}
                height={440}
                className="w-80 h-80 lg:w-[440px] lg:h-[440px] object-contain opacity-80"
              />
            </motion.div>

            {/* Foreground Image */}
            <motion.div className="relative z-10" variants={fadeUp}>
              <Image
                src="/images/hot cyber.png"
                alt="Cybersecurity Illustration"
                width={500}
                height={500}
                className="lg:w-[500px] lg:h-[400px] object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Call Now Button */}
        <div className="absolute -bottom-10 right-8">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#4185dd] to-[#b425da] text-white text-sm font-medium shadow-lg cursor-pointer">
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
    </section>
  );
}
