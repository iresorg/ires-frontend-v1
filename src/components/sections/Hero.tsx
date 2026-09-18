"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0, 0, 1] as const },
  },
};

const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.2, 0, 0, 1] as const,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.2, 0, 0, 1] as const,
    },
  },
};

const trustSignals = [
  { icon: "/icons/shield.svg", label: "Threat Containment" },
  { icon: "/images/guard.png", label: "Human Responders" },
  { icon: "/images/fortress.png", label: "Always-On Cover" },
];

export default function Hero() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { handleSignUpNavigation } = useAuthNavigation();

  useEffect(() => {
    const handleLoadingComplete = () => {
      setLoadingComplete(true);
    };

    window.addEventListener("loadingComplete", handleLoadingComplete);

    const fallbackTimer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => {
      window.removeEventListener("loadingComplete", handleLoadingComplete);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!isVideoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isVideoOpen]);

  return (
    <div
      className="hero hero-bg-image hero-video relative w-full overflow-hidden pt-35 pb-20 lg:pt-50 xl:pt-62.5 lg:pb-35"
      style={{
        background: "url(/images/hero-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <video
        className="hero-bg-video absolute inset-0 h-full w-full object-cover"
        src="/video/firevall-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Atmospheric layers */}
      <div className="security-grid absolute inset-0 z-[1] pointer-events-none opacity-70" />
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="security-scanline absolute inset-x-0 top-0 w-full" />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(65,133,221,0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(180,37,218,0.12) 0%, transparent 50%)",
        }}
      />

      {/* Floating security badges */}
      <motion.div
        className="absolute left-[6%] top-[28%] z-[2] hidden xl:block"
        initial={{ opacity: 0, x: -20 }}
        animate={
          loadingComplete
            ? { opacity: 1, x: 0, y: [0, -10, 0] }
            : { opacity: 0 }
        }
        transition={{
          opacity: { duration: 0.8, delay: 0.6 },
          x: { duration: 0.8, delay: 0.6 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="glass-panel brand-border flex items-center gap-3 rounded-2xl px-4 py-3">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]" />
            <Image
              src="/images/shield-checkmark.png"
              alt=""
              width={28}
              height={28}
              className="relative z-10 h-7 w-7"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/50">
              Status
            </p>
            <p className="flex items-center gap-2 text-sm font-medium text-white">
              <span className="status-dot" />
              Systems Online
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[7%] top-[36%] z-[2] hidden xl:block"
        initial={{ opacity: 0, x: 20 }}
        animate={
          loadingComplete
            ? { opacity: 1, x: 0, y: [0, 12, 0] }
            : { opacity: 0 }
        }
        transition={{
          opacity: { duration: 0.8, delay: 0.9 },
          x: { duration: 0.8, delay: 0.9 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
      >
        <div className="glass-panel brand-border flex items-center gap-3 rounded-2xl px-4 py-3">
          <Image
            src="/images/warning.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/50">
              Response
            </p>
            <p className="text-sm font-medium text-white">
              Avg.{" "}
              <span className="text-color font-semibold">&lt; 3 min</span>
            </p>
          </div>
        </div>
      </motion.div>

      <div className="relative z-2 flex h-full items-center">
        <Section>
          <div className="section-title section-title-center mx-auto max-w-217.5 text-center">
            <motion.div
              initial="hidden"
              animate={loadingComplete ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.h3
                className="mb-5 inline-flex items-center gap-2 rounded-[100px] px-4 py-2 pl-11 text-xs font-normal leading-snug md:text-sm lg:px-5 lg:text-base"
                style={{
                  background: "var(--secondary)",
                  borderLeft: "1px solid var(--accent-color)",
                  borderRight: "1px solid var(--accent-secondary-color)",
                  backgroundImage: "url(/icons/lock.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left 16px center",
                  backgroundSize: "18px auto",
                }}
                variants={containerVariants}
              >
                iRES — Incident Response Emergency System
              </motion.h3>

              <motion.h1
                className="mb-0 text-[40px] font-light leading-[1.12] sm:text-[48px] lg:text-[56px]"
                variants={titleContainerVariants}
                initial="hidden"
                animate={loadingComplete ? "visible" : "hidden"}
                data-cursor="title"
              >
                <motion.span
                  className="gradient-shift mr-2 inline-block bg-clip-text font-bold text-transparent"
                  data-cursor="gradient"
                  variants={wordVariants}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    backgroundSize: "200% auto",
                  }}
                >
                  24/7
                </motion.span>
                <motion.span className="mr-2 inline-block" variants={wordVariants}>
                  Cybersecurity
                </motion.span>
                <motion.span className="mr-2 inline-block" variants={wordVariants}>
                  Incident
                </motion.span>
                <br />
                <motion.span className="mr-2 inline-block" variants={wordVariants}>
                  Response
                </motion.span>
                <motion.span
                  className="gradient-shift inline-block bg-clip-text text-transparent"
                  data-cursor="gradient"
                  variants={wordVariants}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  Hotline
                </motion.span>
              </motion.h1>

              <motion.p
                className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#d1d1d1] sm:text-base"
                variants={containerVariants}
              >
                Experience fast security response like never before with
                cutting-edge technology to keep you safe. This is iRES — Real
                Time, Real People, Real Protection.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                initial="hidden"
                animate={loadingComplete ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15,
                      delayChildren: 0.45,
                    },
                  },
                }}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button onClick={handleSignUpNavigation}>Get Protected</Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    onClick={() => setIsVideoOpen(true)}
                    variant="secondary"
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-6 sm:gap-10"
                initial={{ opacity: 0, y: 16 }}
                animate={
                  loadingComplete
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 16 }
                }
                transition={{ delay: 0.85, duration: 0.6 }}
              >
                {trustSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="flex items-center gap-2.5 text-left"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <Image
                        src={signal.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-white/75 sm:text-sm">
                      {signal.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </Section>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="fixed inset-0 z-120 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black p-2 shadow-2xl brand-border"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-lg font-semibold text-black transition hover:bg-white"
                aria-label="Close video"
              >
                ×
              </button>
              <video
                className="w-full rounded-xl"
                src="/video/iRES_Cinematic_Demo (3).mp4"
                controls
                autoPlay
                playsInline
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
