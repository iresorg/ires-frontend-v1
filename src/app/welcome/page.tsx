"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuthSecureBadge } from "@/components/ui/AuthShell";

export default function WelcomePage() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-8">
      <Image
        src="/images/welcome-signup.png"
        alt=""
        fill
        className="object-cover z-[-3]"
        priority
      />
      <div className="fixed inset-0 bg-[#1C1B2B]/90 z-[-1]" />
      <div className="security-grid pointer-events-none fixed inset-0 z-[-1] opacity-50" />

      <div className="relative z-10 w-full max-w-[480px] p-8 sm:p-10 rounded-2xl glass-panel brand-border text-center">
        <AuthSecureBadge />

        <div className="relative flex justify-center mb-5 mx-auto w-fit">
          <span className="pulse-ring absolute inset-0 rounded-full border-2 border-[var(--accent-color)]" />
          <Image
            src="/images/shield-icon.png"
            alt="Security Icon"
            width={60}
            height={60}
            className="relative z-10"
          />
        </div>

        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-4 text-center tracking-wide bg-clip-text text-transparent gradient-shift"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          WELCOME TO iRES!
        </motion.h2>

        <p className="text-white text-xs mb-8 leading-relaxed">
          Let&apos;s start your onboarding to know more<br /> about your organization and
          choose a<br /> recommended and suitable plan for you
        </p>

        <Link href="/dashboard">
          <button
            className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all cursor-pointer"
            style={{ background: "var(--btn-bg)" }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
