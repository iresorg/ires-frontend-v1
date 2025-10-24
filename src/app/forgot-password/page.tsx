"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Simulate email sending
    setEmailSent(true);
  };

  // Automatically redirect after showing the success message
  useEffect(() => {
    if (emailSent) {
      const timer = setTimeout(() => {
        router.push("/create-password");
      }, 3000); // redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [emailSent, router]);

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
          className="text-2xl font-bold mb-2 text-center bg-clip-text text-transparent"
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
          Forgot Password
        </motion.h2>

        {/* Conditional content */}
        {!emailSent ? (
          <>
            <p className="text-white/80 text-center text-sm mb-6">
              Enter your registered email
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent w-full text-white placeholder-white/60 outline-none"
                />
              </div>

              {/* Send button */}
              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="text-center flex flex-col items-center justify-center py-10">
            <Image
              src="/images/mail-sent.png"
              alt="Mail sent"
              width={60}
              height={60}
              className="mb-5"
            />
            <p className="text-white/90 text-sm leading-relaxed font-bold">
              Kindly check your mail, we’ve sent you
              <br /> a password reset email
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
