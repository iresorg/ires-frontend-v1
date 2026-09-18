"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { authService } from "@/services/auth";
import PasswordResetToast from "@/components/sections/PasswordResetToast";
import type { AxiosError } from "axios";
import { AuthShell, AuthSecureBadge } from "@/components/ui/AuthShell";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  // Get email and token from URL params
  useEffect(() => {
    const paramsEmail = searchParams.get("email");
    const paramsToken = searchParams.get("token");

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const currentEmail = paramsEmail || urlParams.get("email") || "";
      const currentToken = paramsToken || urlParams.get("token") || "";

      setEmail(currentEmail);
      setToken(currentToken);

      if (!currentEmail || !currentToken) {
        setError("Invalid reset link. Please request a new password reset.");
        setShowError(true);
      }
    } else {
      setEmail(paramsEmail || "");
      setToken(paramsToken || "");

      if (!paramsEmail || !paramsToken) {
        setError("Invalid reset link. Please request a new password reset.");
        setShowError(true);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!password.trim()) {
      setError("Please enter a password");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    if (!email || !token) {
      setError("Invalid reset link. Please request a new password reset.");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }


    setIsLoading(true);
    setError("");
    setShowError(false);

    try {
      await authService.resetPassword({
        email: email.trim(),
        token: token.trim(),
        newPassword: password.trim(),
      });

      setPasswordReset(true);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      console.error("Reset password error:", err);
      const axiosError = err as AxiosError<{ message?: string; error?: boolean }>;
      const errorMsg = axiosError.response?.data?.message || "Failed to reset password. Please try again.";
      setError(errorMsg);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {passwordReset && (
          <PasswordResetToast onClose={() => setPasswordReset(false)} />
        )}
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

      <AuthShell maxWidthClass="max-w-[450px]">
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
              width={24}
              height={24}
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
            />
          </Link>
        </div>

        <AuthSecureBadge />

        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 text-center bg-clip-text text-transparent gradient-shift"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
          }}
        >
          Reset Password
        </motion.h2>

        <p className="text-white/80 text-center text-xs sm:text-sm mb-5 sm:mb-6 px-2">
          Enter your new password below. Make sure it&apos;s different from your previous password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 space-y-1 sm:space-y-2">
          <div className="flex items-center bg-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 gap-2 sm:gap-3 ring-1 ring-white/5 transition focus-within:ring-[var(--accent-color)]/40">
            <Image
              src="/images/locker.png"
              alt="Lock"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full text-white placeholder-white/60 outline-none text-sm sm:text-base"
            />
            <Image
              src={showPassword ? "/images/eye-opened.png" : "/images/eye-closed.png"}
              alt="Toggle password visibility"
              width={18}
              height={18}
              className="cursor-pointer transition-opacity hover:opacity-80 w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="flex items-center bg-white/10 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 gap-2 sm:gap-3 ring-1 ring-white/5 transition focus-within:ring-[var(--accent-color)]/40">
            <Image
              src="/images/locker.png"
              alt="Lock"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Password Confirmation"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent w-full text-white placeholder-white/60 outline-none text-sm sm:text-base"
            />
            <Image
              src={showConfirmPassword ? "/images/eye-opened.png" : "/images/eye-closed.png"}
              alt="Toggle password visibility"
              width={18}
              height={18}
              className="cursor-pointer transition-opacity hover:opacity-80 w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <p className="text-xs sm:text-sm text-white/60">Both passwords must match</p>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-1 sm:mt-2 w-full py-2.5 sm:py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            style={{ background: "var(--btn-bg)" }}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </AuthShell>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <div className="fixed inset-0 bg-[#1C1B2B]/90 z-[-1]" />
        <div className="text-white text-sm">Loading...</div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
