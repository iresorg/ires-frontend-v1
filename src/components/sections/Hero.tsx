"use client";

import { useEffect, useState } from "react";
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

const titleContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.2
    }
  }
};

export default function Hero() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Listen for loading complete event
    const handleLoadingComplete = () => {
      setLoadingComplete(true);
    };

    window.addEventListener('loadingComplete', handleLoadingComplete);
    
    // Fallback in case event doesn't fire
    const fallbackTimer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => {
      window.removeEventListener('loadingComplete', handleLoadingComplete);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div
      className="hero heo-bg-image pt-[140px] pb-[80px] lg:pt-[200px] xl:pt-[250px] lg:pb-[140px] relative w-full overflow-hidden hero hero-bg-image hero-video"
      style={{
        position: "relative",
        background: "url(/images/hero-bg.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
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
      <div className="relative z-2 flex h-full items-center">
        <Section>
          <div className="section-title section-title-center text-center mx-auto max-w-[870px]">
            <motion.div
              initial="hidden"
              animate={loadingComplete ? "visible" : "hidden"}
              variants={containerVariants}
            >
              {/* Eyebrow */}
              <h3
                className="inline-block text-xs md:text-sm lg:text-base font-normal leading-snug rounded-[100px] mb-5 px-2 py-2 lg:px-5 lg:py-2 pl-12"
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
                variants={titleContainerVariants}
                initial="hidden"
                animate={loadingComplete ? "visible" : "hidden"}
                data-cursor="title"
              >
                <motion.span 
                  className="font-bold bg-clip-text text-transparent gradient-text inline-block mr-2"
                  data-cursor="gradient"
                  variants={wordVariants}
                  style={{
                    backgroundImage: "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    backgroundSize: "200% auto",
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  24/7
                </motion.span>
                <motion.span className="inline-block mr-2" variants={wordVariants}>
                  Cybersecurity
                </motion.span>
                <motion.span className="inline-block mr-2" variants={wordVariants}>
                  Incident
                </motion.span>
                <br />
                <motion.span className="inline-block mr-2" variants={wordVariants}>
                  Response
                </motion.span>
                <motion.span 
                  className="text-transparent gradient-text inline-block"
                  data-cursor="gradient"
                  variants={wordVariants}
                  style={{
                    backgroundImage: "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }
                  }}
                >
                  Hotline
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-5 text-sm sm:text-base text-[hsl(var(--muted-foreground))]"
                variants={containerVariants}
                transition={{ delay: 0.2 }}
              >
                Experience fast security response like never before with
                cutting-edge technology to keep you safe. This is iRES - Real Time, Real People, Real Protection
              </motion.p>

              {/* Actions */}
              <motion.div
                className="mt-16 flex items-center justify-center gap-4"
                initial="hidden"
                animate={loadingComplete ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.5
                    }
                  }
                }}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button href="#demo" variant="secondary">Watch Demo</Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(65, 133, 221, 0.3)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button href="#report" variant="primary">
                    Report Threat
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </Section>
      </div>
    </div>
  );
}
