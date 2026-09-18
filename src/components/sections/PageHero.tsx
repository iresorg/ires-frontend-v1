"use client";

import { useEffect, useState, type ReactNode } from "react";
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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as const },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0, 0, 1] as const },
  },
};

export type PageHeroProps = {
  /** Gradient headline — string or custom node */
  title: ReactNode;
  subtitle: ReactNode;
  eyebrow?: string;
  primaryLabel?: string;
  primaryHref?: string;
  onPrimaryClick?: () => void;
  showWatchDemo?: boolean;
  showGetProtected?: boolean;
  bgVideoSrc?: string;
  demoVideoSrc?: string;
  statusLabel?: string;
};

export default function PageHero({
  title,
  subtitle,
  eyebrow = "iRES — Incident Response Emergency System",
  primaryLabel,
  primaryHref,
  onPrimaryClick,
  showWatchDemo = true,
  showGetProtected = false,
  bgVideoSrc = "/video/hero-video.mp4",
  demoVideoSrc = "/video/iRES_Cinematic_Demo (3).mp4",
  statusLabel = "Systems Online",
}: PageHeroProps) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { handleSignUpNavigation } = useAuthNavigation();

  useEffect(() => {
    const handleLoadingComplete = () => setLoadingComplete(true);
    window.addEventListener("loadingComplete", handleLoadingComplete);
    const fallbackTimer = setTimeout(() => setLoadingComplete(true), 2500);
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
        src={bgVideoSrc}
        autoPlay
        muted
        loop
        playsInline
      />

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

      <motion.div
        className="absolute left-[6%] top-[30%] z-[2] hidden xl:block"
        initial={{ opacity: 0, x: -16 }}
        animate={
          loadingComplete
            ? { opacity: 1, x: 0, y: [0, -10, 0] }
            : { opacity: 0 }
        }
        transition={{
          opacity: { duration: 0.7, delay: 0.5 },
          x: { duration: 0.7, delay: 0.5 },
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
              {statusLabel}
            </p>
          </div>
        </div>
      </motion.div>

      <div className="relative z-2 flex h-full items-center">
        <Section>
          <div className="mx-auto max-w-217.5 text-center">
            <motion.div
              initial="hidden"
              animate={loadingComplete ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <h3
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
              >
                {eyebrow}
              </h3>

              <motion.h1
                className="mb-0 text-[40px] font-light leading-[1.12] sm:text-[48px] lg:text-[56px]"
                variants={titleContainerVariants}
                initial="hidden"
                animate={loadingComplete ? "visible" : "hidden"}
              >
                {typeof title === "string" ? (
                  <motion.span
                    className="gradient-shift inline-block bg-clip-text font-bold text-transparent"
                    variants={wordVariants}
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {title}
                  </motion.span>
                ) : (
                  title
                )}
              </motion.h1>

              <motion.div
                className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#d1d1d1] sm:text-base"
                variants={containerVariants}
              >
                {subtitle}
              </motion.div>

              {(showWatchDemo || showGetProtected || primaryLabel) && (
                <motion.div
                  className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
                  initial="hidden"
                  animate={loadingComplete ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.4,
                      },
                    },
                  }}
                >
                  {showGetProtected && (
                    <motion.div
                      variants={buttonVariants}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button onClick={handleSignUpNavigation}>
                        Get Protected
                      </Button>
                    </motion.div>
                  )}
                  {primaryLabel && (
                    <motion.div
                      variants={buttonVariants}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button href={primaryHref} onClick={onPrimaryClick}>
                        {primaryLabel}
                      </Button>
                    </motion.div>
                  )}
                  {showWatchDemo && (
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
                  )}
                </motion.div>
              )}
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
                src={demoVideoSrc}
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
