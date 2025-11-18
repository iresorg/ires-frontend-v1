"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import type { AxiosError } from "axios";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [accountId, setAccountId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [timer, setTimer] = useState(60);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Read query params from URL
  useEffect(() => {
    // Try useSearchParams first
    const paramsAccountId = searchParams.get("accountId");
    const paramsEmail = searchParams.get("email");

    // Fallback to window.location if useSearchParams doesn't work
    if (!paramsAccountId || !paramsEmail) {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        setAccountId(urlParams.get("accountId") || "");
        setEmail(urlParams.get("email") || "");
      }
    } else {
      setAccountId(paramsAccountId || "");
      setEmail(paramsEmail || "");
    }
  }, [searchParams]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    // Focus the last filled input or the last input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleResendOtp = async () => {
    // Get fresh email from URL in case state hasn't updated
    const currentEmail = email || (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("email") : "");

    if (!currentEmail) {
      setErrorMessage("Email not found. Please try registering again.");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsResending(true);
    setShowError(false);

    try {
      await authService.resendOtp({
        email: currentEmail,
      });

      // Reset timer and OTP inputs on success
      setTimer(60);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();

      // Show success message briefly
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Resend OTP error:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMsg = axiosError.response?.data?.message || "Failed to resend OTP. Please try again.";
      setErrorMessage(errorMsg);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setErrorMessage("Please enter the complete 6-digit code");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    // Get fresh params from URL in case state hasn't updated
    const currentAccountId = accountId || (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("accountId") : "");
    const currentEmail = email || (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("email") : "");

    if (!currentAccountId || !currentEmail) {
      setErrorMessage("Missing account information. Please try registering again.");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setIsVerifying(true);
    setShowSuccess(false);
    setShowError(false);

    try {

      const result = await authService.verifyEmail({
        accountId: currentAccountId,
        email: currentEmail,
        otp: otpString,
      });

      if (result.verified) {
        setShowSuccess(true);
        // Redirect to login page immediately after successful verification
        router.push("/login");
      }
    } catch (error) {
      console.error("Verification error:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMsg = axiosError.response?.data?.message || "Invalid or expired OTP. Please try again.";
      setErrorMessage(errorMsg);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-12">
      {/* Toasts */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            key="success-toast"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 sm:top-10 sm:right-10 z-50 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 rounded-2xl max-w-[90%] sm:max-w-none"
            style={{
              borderImage:
                "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 0 15px rgba(180, 37, 218, 0.25)",
            }}
          >
            <button
              onClick={() => setShowSuccess(false)}
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

            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/images/badge.png"
                alt="Success Icon"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
              <p className="text-white font-bold text-base sm:text-lg md:text-xl">Congratulations!</p>
            </div>

            <p className="text-white text-xs sm:text-sm">
              Your email has been successfully verified
            </p>
          </motion.div>
        )}

        {showError && (
          <motion.div
            key="error-toast"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 sm:top-10 sm:right-10 z-50 flex flex-col items-center text-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-2xl max-w-[90%] sm:max-w-none"
            style={{
              borderImage:
                "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 0 15px rgba(180, 37, 218, 0.25)",
            }}
          >
            <button
              onClick={() => setShowError(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 hover:opacity-70 transition-opacity"
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
                Email Verification Error
              </p>
            </div>

            <p className="text-white text-xs sm:text-sm mb-3 sm:mb-4 px-2">
              {errorMessage || "Looks like you entered an invalid code"}
            </p>

            <motion.button
              onClick={handleResendOtp}
              disabled={isResending}
              className="px-4 sm:px-6 py-2 rounded-lg text-white font-semibold bg-linear-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isResending ? "Resending..." : "Resend Email"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verification card */}
      <div
        className="relative z-10 w-full max-w-[500px] p-6 sm:p-8 rounded-2xl bg-transparent"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4 sm:mb-5">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-[55px] md:h-[55px]"
          />
          <Link href="/signup/individual" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0">
            <Image
              src="/images/cancel-icon.png"
              alt="Close"
              width={24}
              height={24}
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </Link>
        </div>

        {/* Title */}
        <motion.h2
          className="text-xl sm:text-2xl font-bold mb-1 bg-clip-text text-transparent text-center"
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
          Check your email
        </motion.h2>

        <p className="text-white text-xs sm:text-sm text-center mb-5 sm:mb-6 px-2">
          Kindly enter the 6-digit code we sent to {email || "your email"}
        </p>

        {/* Code inputs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-5 sm:mb-6 px-2" onPaste={handlePaste}>
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[i]}
              onChange={(e) => handleOtpChange(i, e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-white text-lg sm:text-xl bg-white/10 rounded-md outline-none focus:ring-2 focus:ring-[#4185DD]"
            />
          ))}
        </div>

        {/* Resend text */}
        <div className="text-center text-white/80 text-xs sm:text-sm mb-5 sm:mb-6 px-2">
          Didn&apos;t receive code?{" "}
          {timer > 0 ? (
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
              Resend in 0:{timer.toString().padStart(2, "0")}
            </motion.span>
          ) : (
            <motion.button
              onClick={handleResendOtp}
              disabled={isResending}
              className="font-semibold bg-clip-text text-transparent inline-block hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
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
              {isResending ? "Resending..." : "Resend"}
            </motion.button>
          )}
        </div>

        {/* Verify button */}
        <button
          onClick={handleVerify}
          type="button"
          disabled={isVerifying || otp.join("").length !== 6}
          className="w-full py-2.5 sm:py-3 rounded-lg text-white font-semibold bg-linear-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="relative w-full min-h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center px-4 py-8">
        <div className="text-white text-sm sm:text-base">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
