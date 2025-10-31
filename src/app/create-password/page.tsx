"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/sections/PasswordInput";
import ConfirmPasswordInput from "@/components/sections/ConfirmPassword";

export default function CreatePassword() {
  const [passwordReset, setPasswordReset] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordReset(true);
  };

  // Automatically redirect after showing the success message
  useEffect(() => {
    if (passwordReset) {
      const timer = setTimeout(() => {
        router.push("/create-password");
      }, 3000); // redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [passwordReset, router]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      <div
        className="relative z-10 w-[450px] p-8 rounded-2xl bg-transparent"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* Conditional content */}
        {!passwordReset ? (
          <div>
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

            <div>
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
                Your new password must be different from previously used
                passwords
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 space-y-2"
              >
                {/* Password Input */}
                <div className="w-full">
                  <PasswordInput />
                </div>
                {/* Password Confirmation */}
                <div className="w-full">
                  <ConfirmPasswordInput />
                </div>
                <p className="text-md">Both passwords must match</p>

                {/* Send button */}
                <button
                  type="submit"
                  className="mt-2 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <Link href="/login" className="absolute top-8 right-8 w-6 h-6 z-20">
              <Image
                src="/images/cancel-icon.png"
                alt="Close"
                width={24}
                height={24}
              />
            </Link>
            <div className="text-center flex flex-col items-center justify-center py-7">
              <Image
                src="/images/pwreset-success.svg"
                alt="Mail sent"
                width={60}
                height={60}
                className="mb-5"
              />
              <h2 className="text-2xl font-bold">Successful Password Reset</h2>
              <p className="text-white/90 text-sm leading-relaxed w-full">
                You can now use your new password to log in to your account
              </p>
              <br />
              <Link href="/login" className="w-full">
                <button
                  type="button"
                  className="mt-3 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Log In
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
