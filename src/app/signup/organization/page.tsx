"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function OrganizationSignup() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Background image*/}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/welcome-signup.png"
          alt="Background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-8 z-20">
        <Image
          src="/logos/ires-logo.svg"
          alt="iRES Logo"
          width={80}
          height={80}
          className="h-10 w-auto"
        />
      </div>

      {/* Close icon */}
      <Link
        href="/signup"
        aria-label="Close"
        className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full flex items-center justify-center"
      >
        <Image
          src="/images/cancel-icon.png"
          alt="Close"
          width={30}
          height={30}
        />
      </Link>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <Image
            src="/images/organization-icon.png"
            alt="Organization Icon"
            width={60}
            height={60}
          />
        </div>

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
          COMING SOON
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 text-base md:text-lg mb-10 max-w-md mx-auto">
          The organization sign-up page is currently being built. Stay tuned 
          we’re almost ready to launch!
        </p>

        {/* Button to go back */}
        <Link
          href="/signup"
          className="inline-block px-8 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#4185DD] to-[#B425DA] hover:opacity-90 transition-all"
        >
          Go Back
        </Link>

        {/* Footer */}
        <p className="mt-16 text-sm text-white/70">
          Copyright © 2025 iRES. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}
