"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function OurServicesForOrganizations() {
  const services = [
    {
      title: "Tailored Security Solutions",
      text: "We create customized cybersecurity strategies based on your industry, size, and goals.",
    },
    {
      title: "Proactive Threat Defense",
      text: "Detect, prevent, and respond to threats before they impact your operations.",
    },
    {
      title: "End-to-End Support",
      text: "From onboarding to 24/7 monitoring, our experts become an extension of your team.",
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

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Title */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center items-center mb-12 flex-wrap gap-2"
        >
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={30}
            height={30}
          />
          <h2 className="text-white text-lg md:text-xl font-semibold text-center">
            Our Services for Organizations
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col gap-6 relative">
            {services.map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`w-full max-w-md sm:max-w-full p-[1px] rounded-2xl bg-gradient-to-r from-[#4185DD] to-[#B425DA]
                  ${i === 1 ? "lg:ml-8" : ""} ${i === 2 ? "lg:ml-16" : ""}`}
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
              className="mt-6 sm:mt-8 w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "var(--accent-secondary-color)" }}
              aria-label="Play video"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px rgba(180, 37, 218, 0.5)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              }}
            >
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                }}
              >
                <PlayIcon className="w-6 h-6 text-white" />
              </motion.div>
            </motion.button>
          </div>

          {/* Right Column */}
          <motion.div
            className="lg:col-span-6 relative w-full flex justify-center mt-12 lg:mt-0"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Ellipse */}
            <motion.div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/images/ellipse.png"
                alt="Background Ellipse"
                width={440}
                height={440}
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[440px] lg:h-[440px] object-contain opacity-80"
              />
            </motion.div>

            {/* Foreground image */}
         
            <motion.div
              className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[400px]"
              animate={{ y: [0, -20, 0] }}
              transition={{
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <Image
                src="/images/ourservice.png"
                alt="Cybersecurity Illustration"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Call Now Button */}
        <div className="mt-12 flex justify-end lg:absolute lg:bottom-0 lg:right-8">
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
