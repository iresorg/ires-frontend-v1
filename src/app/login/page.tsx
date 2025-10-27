"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Login card */}
      <div
        className="relative z-10 w-[480px] p-8 rounded-2xl bg-transparent"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* IRES logo and close icon */}
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

        {/* Title */}
        <motion.h2
          className="text-2xl font-bold mb-1 text-center bg-clip-text text-transparent"
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
          Welcome Back!
        </motion.h2>

        <p className="text-white text-center text-sm mb-6">
          Delighted to see you again <br />
          Log in to your account below
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {/* Email input */}
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

          {/* Password input */}
          <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
            <Image src="/images/locker.png" alt="Lock" width={20} height={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent w-full text-white placeholder-white/60 outline-none"
            />
            <Image
              src={
                showPassword ? "/images/eye-opened.png" : "/images/eye-closed.png"
              }
              alt="Toggle Password"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Login button */}
          <Link href="/welcome">
          <button
            type="submit"
            className="mt-2 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer"
          >
            Log in
          </button>
          </Link>
        </form>

        {/* Footer */}
        <div className="mt-5 text-center text-sm text-white/80">
          <p className="font-medium">
            Don’t have an account?{" "}
            <Link href="/signup" className="hover:underline">
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
                Sign up for Free
              </motion.span>
            </Link>
          </p>

          <p className="mt-1">
            <Link href="/forgot-password" className="hover:underline">
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
                Forgot Password?
              </motion.span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
