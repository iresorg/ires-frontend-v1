"use client";

import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Hero() {
  return (
    <div
      className="hero heo-bg-image relative w-full overflow-hidden hero hero-bg-image hero-video"
      style={{
        position: "relative",
        background: "url(/images/hero-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        padding: "250px 0 140px ",
      }}
    >
      {/* Background video */}
      <video
        className="hero-bg-video absolute inset-0 h-full w-full object-cover"
        src="/video/firevall-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Content */}
      <div className="relative z-[2] flex h-full items-center">
        <Section>
          <div className="section-title section-title-center text-center mx-auto max-w-[870px]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Eyebrow */}
              <h3
                className="inline-block text-base font-normal leading-snug rounded-[100px] mb-5 px-5 py-2 pl-12"
                style={{
                  background: "var(--secondary)",
                  borderLeft: "1px solid var(--accent-color)",
                  borderRight: "1px solid var(--accent-secondary-color)",
                  backgroundImage: "url(/icons/lock.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left 20px center",
                  backgroundSize: "20px auto",
                }}
              >
                iRES - Incident Response Emergency System
              </h3>

              {/* Title */}
              <motion.h1
                className="text-[42px] sm:text-[48px] lg:text-[52px] leading-[1.1] font-light mb-0"
                variants={containerVariants}
                transition={{ delay: 0.1 }}
                data-cursor="title"
              >
                <span 
                  className="font-bold bg-clip-text text-transparent gradient-text"
                  data-cursor="gradient"
                  style={{
                    backgroundImage: "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    backgroundSize: "200% auto",
                  }}
                >
                  24/7
                </span>{" "}
                Cybersecurity Incident
                <br />
                Response <span 
                  className="text-transparent gradient-text"
                  data-cursor="gradient"
                  style={{
                    backgroundImage: "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  Hotline
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-5 text-sm sm:text-base text-[hsl(var(--muted-foreground))]"
                variants={containerVariants}
                transition={{ delay: 0.2 }}
              >
                Experience fast security response like never before with
                cutting-edge technology to keep you safe.
              </motion.p>
              <motion.p className="mt-2 text-sm sm:text-base text-[hsl(var(--muted-foreground))]">
                This is iRES - Real Time, Real People, Real Protection
              </motion.p>

              {/* Actions */}
              <motion.div
                className="mt-16 flex items-center justify-center gap-4"
                variants={containerVariants}
                transition={{ delay: 0.3 }}
              >
                <Button href="#demo" variant="secondary">Watch Demo</Button>
                <Button href="#report" variant="primary">
                  Report Threat
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
}
