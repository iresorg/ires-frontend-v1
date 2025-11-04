"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import CountrySelection from "@/components/sections/CountrySelection";
import PasswordInput from "@/components/sections/PasswordInput";
import ConfirmPasswordInput from "@/components/sections/ConfirmPassword";
import SuccessToast from "@/components/sections/SucessToast";
import ErrorToast from "@/components/sections/ErrorToast";

export default function IndividualSignup() {
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    const success = Math.random() > 0.5;

    if (success) {
      setToastType("success");
    } else {
      setToastType("error");
    }

    setTimeout(() => setToastType(null), 5000);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Toasts */}
      {toastType === "success" && (
        <SuccessToast onClose={() => setToastType(null)} />
      )}
      {toastType === "error" && (
        <ErrorToast onClose={() => setToastType(null)} />
      )}

      {/* Signup Card */}
      <div
        className="relative z-10 w-[500px] p-8 rounded-2xl bg-transparent"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <div className="flex justify-between items-start mb-5">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
          <Link href="/signup" className="w-6 h-6">
            <Image
              src="/images/cancel-icon.png"
              alt="Close"
              width={24}
              height={24}
            />
          </Link>
        </div>

        <motion.h2
          className="text-2xl font-bold mb-1 bg-clip-text text-transparent"
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
          Sign up
        </motion.h2>
        <p className="text-white text-sm mb-6">
          Enter your details below to create an account and get started
        </p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4185DD]"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4185DD]"
            />
          </div>

          <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
            <Image
              src="/images/email-icon.png"
              alt="Email"
              width={18}
              height={18}
            />
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent w-full text-white placeholder-white/60 outline-none"
            />
          </div>

          <CountrySelection />
          <PasswordInput />
          <ConfirmPasswordInput />

          <button
            type="submit"
            className="mt-3 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Sign up
            <Image
              src="/images/arrow-right.png"
              alt="Arrow"
              width={16}
              height={16}
            />
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link href="/login" className="hover:underline">
            <motion.span
              className="font-semibold bg-clip-text text-transparent inline-block"
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
              Log in
            </motion.span>
          </Link>
        </p>
      </div>
    </div>
  );
}
