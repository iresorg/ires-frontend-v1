"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AuthSecureBadge } from "@/components/ui/AuthShell";

export default function WelcomeSignupPage() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 -z-10 w-full h-full object-cover"
        src="/video/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/welcome-signup.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-[#1C1B2B]/90 -z-10" />
      <div className="security-grid pointer-events-none absolute inset-0 -z-[9] opacity-50" />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20">
        <Image
          src="/logos/ires-logo.svg"
          alt="iRES Logo"
          width={80}
          height={80}
          className="h-8 w-auto sm:h-10"
        />
      </div>

      <Link
        href="/"
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center opacity-80 transition hover:opacity-100"
      >
        <Image
          src="/images/cancel-icon.png"
          alt="Close"
          width={30}
          height={30}
          className="w-5 h-5 sm:w-[30px] sm:h-[30px]"
        />
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 sm:px-6 py-8 sm:py-0"
      >
        <AuthSecureBadge />

        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide mb-3 sm:mb-4 bg-clip-text text-transparent gradient-shift"
          style={{
            backgroundImage:
              "linear-gradient(90deg, var(--accent-color) 0%, var(--accent-secondary-color) 50%, #FF7FB1 100%)",
          }}
        >
          WELCOME!
        </h1>

        <p className="text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10 px-2">
          Who do you want to sign up/log in as?
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl mx-auto">
          <Link
            href="/signup/individual"
            className="relative w-full max-w-[280px] sm:w-64 h-36 sm:h-40 md:h-44 flex flex-col items-center justify-center rounded-2xl glass-panel brand-border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(65,133,221,0.25)]"
          >
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
              <Image
                src="/images/individual-icon.png"
                alt="individual"
                width={30}
                height={30}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px]"
              />
              <span className="text-white text-lg sm:text-xl font-semibold tracking-wider">
                Individual
              </span>
            </div>
          </Link>

          <Link
            href="/signup/organization"
            className="relative w-full max-w-[280px] sm:w-64 h-36 sm:h-40 md:h-44 flex flex-col items-center justify-center rounded-2xl glass-panel brand-border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(65,133,221,0.25)]"
          >
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
              <Image
                src="/images/organization-icon.png"
                alt="organization"
                width={30}
                height={30}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-[30px] md:h-[30px]"
              />
              <span className="text-white text-lg sm:text-xl font-semibold tracking-wider">
                Organization
              </span>
            </div>
          </Link>
        </div>

        <p className="mt-8 sm:mt-12 md:mt-16 text-xs sm:text-sm text-white/80 px-2">
          Copyright © 2025 iRES. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}
