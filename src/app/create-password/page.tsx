"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PasswordInput from "@/components/sections/PasswordInput";
import ConfirmPasswordInput from "@/components/sections/ConfirmPassword";
import PasswordResetToast from "@/components/sections/PasswordResetToast";

export default function CreatePassword() {
  const [passwordReset, setPasswordReset] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordReset(true);
  };

  return (
   <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        {/*  Background Video */}
        <video
          className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
          src="/video/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
  
        {/*  Fallback Image */}
        <Image
          src="/images/welcome-signup.png"
          alt="Background"
          fill
          className="object-cover z-[-3]"
          priority
        />
  
        {/* Overlay */}
        <div className="fixed inset-0 bg-[#1C1B2B]/90 z-[-1]" />
      {/* Success Toast */}
      {passwordReset && (
        <PasswordResetToast onClose={() => setPasswordReset(false)} />
      )}

      <div
        className="relative z-10 w-[450px] p-8 rounded-2xl bg-transparent"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* Logo and Close */}
        <div className="flex justify-between items-start mb-5">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
          <Link href="/login" className="w-6 h-6">
            <Image
              src="/images/cancel-icon.png"
              alt="Close"
              width={24}
              height={24}
            />
          </Link>
        </div>

        {/* Title */}
        <motion.h2
          className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
            backgroundSize: "200% auto",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          Create New Password
        </motion.h2>

        <p className="text-white/80 text-center text-sm mb-6">
          Your new password must be different from previously used passwords
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 space-y-2">
          <PasswordInput />
          <ConfirmPasswordInput />
          <p className="text-sm text-white/60">Both passwords must match</p>

          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
