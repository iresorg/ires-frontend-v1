"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Border Card */}
      <div
        className="relative z-10 w-[480px] p-10 rounded-2xl bg-transparent text-center"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* shield image */}
        <div className="flex justify-center mb-5">
          <Image
            src="/images/shield-icon.png"
            alt="Security Icon"
            width={60}
            height={60}
          />
        </div>

        {/* Title */}
        <motion.h2
          className="text-4xl font-bold mb-4 text-white text-center tracking-wide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          WELCOME TO iRES!
        </motion.h2>

        {/* Description */}
        <p className="text-white text-xs mb-8 leading-relaxed">
          Let’s start your onboarding to know more<br/> about your organization and
          choose a<br/> recommended and suitable plan for you
        </p>

        {/* Get Started Button */}
        <Link href="/dashboard">
          <button className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
