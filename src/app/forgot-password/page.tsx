"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { authService } from "@/services/auth";
import type { AxiosError } from "axios";
import { AuthSecureBadge } from "@/components/ui/AuthShell";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsLoading(true);
    setError("");
    setShowError(false);

    try {
      await authService.forgotPassword({ email: email.trim() });
      setEmailSent(true);
    } catch (err) {
      console.error("Forgot password error:", err);
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMsg = axiosError.response?.data?.message || "Failed to send reset email. Please try again.";
      setError(errorMsg);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-6 sm:py-8">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-[-2]"
        src="/video/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <Image
        src="/images/welcome-signup.png"
        alt="Background"
        fill
        className="object-cover z-[-3]"
        priority
      />

      <div className="fixed inset-0 bg-[#1C1B2B]/90 z-[-1]" />
      <div className="security-grid pointer-events-none fixed inset-0 z-[-1] opacity-50" />

      {/* Success Screen */}
      {emailSent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-[450px] p-5 sm:p-6 md:p-8 rounded-2xl glass-panel brand-border"
        >
          <div className="flex justify-between items-start mb-4 sm:mb-5">
            <Image
              src="/logos/ires-logo.svg"
              alt="iRES Logo"
              width={55}
              height={55}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-[55px] md:h-[55px]"
            />
            <Link href="/login" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 opacity-80 transition hover:opacity-100">
              <Image
                src="/images/cancel-icon.png"
                alt="Close"
                width={25}
                height={25}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
            </Link>
          </div>

          <AuthSecureBadge label="Secure reset" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative flex justify-center mb-4 sm:mb-5"
          >
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
              style={{ background: "var(--btn-bg)" }}
            >
              <svg
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="pulse-ring absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[var(--accent-color)]" />
          </motion.div>

          <div className="text-center space-y-2 mb-4 sm:mb-5">
            <motion.h2
              className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent gradient-shift"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
              }}
            >
              Reset Link Sent!
            </motion.h2>
            <p className="text-white/80 text-xs sm:text-sm px-2">
              We&apos;ve sent a password reset link to <span className="font-semibold text-white">{email}</span>
            </p>
            <p className="text-white/60 text-xs px-2">
              Please check your email and click on the link to reset your password.
            </p>
          </div>

          <Link
            href="/login"
            className="block w-full py-2.5 sm:py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all cursor-pointer text-center text-sm sm:text-base"
            style={{ background: "var(--btn-bg)" }}
          >
            Back to Login
          </Link>
        </motion.div>
      ) : (
        <>
          <AnimatePresence>
            {showError && error && (
              <motion.div
                key="error-toast"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="absolute top-4 right-4 sm:top-10 sm:right-10 z-50 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 rounded-2xl max-w-[90%] sm:max-w-none glass-panel brand-border"
              >
                <button
                  onClick={() => setShowError(false)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  <Image
                    src="/images/cancel-icon.png"
                    alt="Close"
                    width={25}
                    height={25}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </button>

                <div className="flex flex-col items-center gap-2 mb-2 sm:mb-3">
                  <Image
                    src="/images/mail-error.png"
                    alt="Error Icon"
                    width={28}
                    height={28}
                    className="w-6 h-6 sm:w-7 sm:h-7"
                  />
                  <p className="text-white font-bold text-base sm:text-lg md:text-xl">
                    Error
                  </p>
                </div>

                <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 px-2">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative z-10 w-full max-w-[450px] p-5 sm:p-6 md:p-8 rounded-2xl glass-panel brand-border">
            <div className="flex justify-between items-start mb-4 sm:mb-5">
              <Image
                src="/logos/ires-logo.svg"
                alt="iRES Logo"
                width={55}
                height={55}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-[55px] md:h-[55px]"
              />
              <Link href="/login" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 opacity-80 transition hover:opacity-100">
                <Image
                  src="/images/cancel-icon.png"
                  alt="Close"
                  width={25}
                  height={25}
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                />
              </Link>
            </div>

            <AuthSecureBadge />

            <motion.h2
              className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-center bg-clip-text text-transparent gradient-shift"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
              }}
            >
              Forgot Password
            </motion.h2>

            <p className="text-white/80 text-center text-xs sm:text-sm mb-5 sm:mb-6 px-2">
              Enter your registered email
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
              <div className="flex items-center bg-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 gap-2 sm:gap-3 ring-1 ring-white/5 transition focus-within:ring-[var(--accent-color)]/40">
                <Image
                  src="/images/email-icon.png"
                  alt="Email"
                  width={18}
                  height={18}
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent w-full text-white placeholder-white/60 outline-none text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 sm:mt-2 w-full py-2.5 sm:py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ background: "var(--btn-bg)" }}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
