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

export default function OurServices() {
  const services = [
    "24/7 Advanced Network Security and Threat Monitoring",
    "Proactive Threat Detection & Incident Response",
    "Managed Security Services for Complete Protection",
    "Data Encryption & Backup Management Solutions",
    "Cyber Risk Assessment & Compliance Solutions",
    "Ransomware Protection & Recovery Services Expertise",
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
      <div className="absolute -top-10 -left-10 z-0">
        <Image
          src="/images/earth.png"
          alt="Decorative Shape"
          width={130}
          height={130}
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
            Our Services
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left section: Services */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Service boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative rounded-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-300"
                >
                  {/* Gradient border  */}
                  <div className="absolute inset-0 rounded-2xl p-[3px] bg-gradient-to-r from-[#4185DD] to-[#601474] blur-[1px]" />

                  {/* Inner content */}
                  <div className="relative rounded-2xl bg-[#13131A]/90 backdrop-blur-sm p-6 text-center border border-[#ffffff10]">
                    <p className="text-white text-sm font-medium mb-4 min-h-[48px]">
                      {service}
                    </p>
                    <button className="px-5 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-[#4185DD] to-[#B425DA] hover:opacity-90 transition">
                      More Info
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Play Button */}
            <motion.button
              className="mt-10 w-14 h-14 rounded-full flex items-center justify-center"
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

          {/* Right  Image */}
          <motion.div
            className="lg:col-span-6 relative w-full flex justify-center lg:justify-end"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Ellipse background */}
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

            {/* Foreground image */}
            <motion.div className="relative z-10" variants={fadeUp}>
              <Image
                src="/images/cyberman.png"
                alt="Service Illustration"
                width={500}
                height={500}
                className="lg:w-[500px] lg:h-[400px] object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
