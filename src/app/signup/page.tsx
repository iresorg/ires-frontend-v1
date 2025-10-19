"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/welcome-signup.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" />
      </div>

      {/* Logo  */}
      <div className="absolute top-6 left-8 z-20">
        <Image
          src="/logos/ires-logo.svg"
          alt="iRES Logo"
          width={80}
          height={80}
          className="h-10 w-auto"
        />
      </div>

      {/* Close icon  */}
      <Link
        href="/"
        aria-label="Close"
        className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full flex items-center justify-center"
      >
        <Image src="/images/cancel-icon.png" alt="Close" width={30} height={30} />
      </Link>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        {/* Title */}
        <h1
          className="text-5xl md:text-6xl font-extrabold tracking-wide mb-4"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #4185DD 0%, #B425DA 50%, #FF7FB1 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          WELCOME!
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 text-base md:text-lg mb-10">
          Who do you want to sign up/log in as?
        </p>

        {/* Option buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* Individual */}
          <Link
            href="/signup/individual"
            className="relative w-64 h-44 flex flex-col items-center justify-center rounded-2xl border border-[#4185DD]  transition-all"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src="/images/individual-icon.png"
                alt="individual"
                width={30}
                height={30}
              />
              <span className="text-white text-xl font-semibold tracking-wider">
           Individual
              </span>
            </div>
          </Link>

          {/* Organization */}
          <Link
            href="/signup/organization"
            className="relative w-64 h-44 flex flex-col items-center justify-center rounded-2xl border border-[#4185DD]  transition-all"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src="/images/individual-icon.png"
                alt="Organization"
                width={30}
                height={30}
              />
              <span className="text-white text-xl font-semibold tracking-wider">
                ORGANIZATION
              </span>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-16 text-sm text-white/70">
          Copyright © 2025 iRES. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}
