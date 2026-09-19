"use client";

import { useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0, 0, 1] as const },
  },
};

export default function WhyWeExistSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />
      <div className="security-grid pointer-events-none absolute inset-0 opacity-30" />

      <Section className="relative z-10 py-14 lg:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex justify-center">
            <SectionTitle
              logo="/logos/ires-logo.svg"
              logoAlt="iRES Logo"
              title="Our Commitment"
            />
          </div>
          <p className="mt-6 text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
            Based in Lagos, Nigeria, we understand the unique cybersecurity
            challenges facing Nigerian businesses. We&apos;re committed to
            providing world-class incident response services at accessible price
            points for the Nigerian market.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-3xl brand-border"
          style={{
            background:
              "linear-gradient(160deg, rgba(28,27,43,0.92) 0%, rgba(14,14,26,0.98) 100%) padding-box, linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color)) border-box",
          }}
          whileHover={{ y: -6, transition: { duration: 0.28 } }}
        >
          <div className="relative overflow-hidden rounded-3xl">
            <video
              ref={videoRef}
              className="h-65 w-full rounded-3xl object-cover md:h-85 lg:h-105"
              controls={playing}
              preload="metadata"
              playsInline
            >
              <source
                src="/video/iRES_Cinematic_Demo (3).mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {!playing && (
              <button
                type="button"
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/30"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full shadow-xl"
                  style={{ background: "var(--btn-bg)" }}
                >
                  <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]" />
                  <PlayIcon className="relative z-10 h-7 w-7 text-white" />
                </motion.div>
              </button>
            )}
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
