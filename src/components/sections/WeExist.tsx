"use client";

import { useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
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
    <div className="relative w-full">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      <Section className="relative z-10 py-16 lg:py-24">
        {/* Title */}
        <div className="flex items-center justify-center space-x-3">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={28}
            height={28}
          />
          <span className="text-lg font-semibold text-white">
            Why We Exist
          </span>
        </div>

        {/* Video */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-12 w-full max-w-4xl overflow-hidden rounded-2xl bg-linear-to-r from-[#4185DD] to-[#B425DA] p-0.5"
        >
          <div className="relative rounded-2xl bg-[#0E0E11]">
            <video
              ref={videoRef}
              className="h-65 w-full rounded-2xl object-cover md:h-85 lg:h-105"
              controls={playing}
              preload="metadata"
              playsInline
            >
              <source src="/video/iRES_Cinematic_Demo (3).mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {!playing && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition hover:bg-black/30"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-[#4185DD] to-[#B425DA] shadow-xl"
                >
                  <PlayIcon className="h-7 w-7 text-white" />
                </motion.div>
              </button>
            )}
          </div>
        </motion.div>
      </Section>
    </div>
  );
}