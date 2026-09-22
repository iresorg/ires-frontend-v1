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
import { clearClientSession } from "@/lib/session";
import { useAuthStore } from "@/store/auth";

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
  const [linkInvalid, setLinkInvalid] = useState(false);

  // Email link: {PUBLIC_FRONTEND_URL}/reset-password?token=…&email=…
  useEffect(() => {
    const paramsEmail = searchParams.get("email");
    const paramsToken = searchParams.get("token");

    let currentEmail = paramsEmail || "";
    let currentToken = paramsToken || "";

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      currentEmail = paramsEmail || urlParams.get("email") || "";
      currentToken = paramsToken || urlParams.get("token") || "";
    }

    try {
      currentEmail = currentEmail ? decodeURIComponent(currentEmail) : "";
    } catch {
      // keep raw value
    }

    setEmail(currentEmail.trim());
    setToken(currentToken.trim());

    if (!currentEmail.trim() || !currentToken.trim()) {
      setLinkInvalid(true);
      setError("Invalid or incomplete reset link. Request a new password reset.");
      setShowError(true);
    } else {
      setLinkInvalid(false);
    }
  }, [searchParams]);

  const showToastError = (message: string) => {
    setError(message);
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (linkInvalid || !email || !token) {
      showToastError(
        "Invalid reset link. Please request a new password reset.",
      );
      return;
    }

    if (!password.trim()) {
      showToastError("Please enter a password");
      return;
    }

    if (password.length < 6) {
      showToastError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      showToastError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");
    setShowError(false);

    try {
      // POST {API}/api/v1/accounts/auth/reset-password (backend — not Netlify)
      await authService.resetPassword({
        email: email.trim(),
        token: token.trim(),
        newPassword: password,
      });

      // Server invalidates all sessions on password reset
      clearClientSession();
      useAuthStore.getState().clearUser();

      setPasswordReset(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      console.error("Reset password error:", err);
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMsg =
        axiosError.response?.data?.message ||
        (err instanceof Error && err.message.includes("API base URL")
          ? err.message
          : "Failed to reset password. Please try again.");
      showToastError(errorMsg);
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
            className="absolute top-4 right-4 z-50 flex max-w-[90%] flex-col items-center rounded-2xl px-4 py-4 text-center glass-panel brand-border sm:top-10 sm:right-10 sm:max-w-none sm:px-6 sm:py-5 md:px-8"
          >
            <button
              type="button"
              onClick={() => setShowError(false)}
              className="absolute top-2 right-2 cursor-pointer transition-opacity hover:opacity-70 sm:top-3 sm:right-3"
            >
              <Image
                src="/images/cancel-icon.png"
                alt="Close"
                width={25}
                height={25}
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </button>

            <div className="mb-2 flex flex-col items-center gap-2 sm:mb-3">
              <Image
                src="/images/mail-error.png"
                alt="Error Icon"
                width={28}
                height={28}
                className="h-6 w-6 sm:h-7 sm:w-7"
              />
              <p className="text-base font-bold text-white sm:text-lg md:text-xl">
                Error
              </p>
            </div>

            <p className="mb-3 px-2 text-xs text-white sm:mb-4 sm:text-sm">
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthShell maxWidthClass="max-w-[450px]">
        <div className="mb-4 flex items-start justify-between sm:mb-5">
          <Link href="/" className="transition hover:opacity-90">
            <Image
              src="/logos/ires-logo.svg"
              alt="iRES Logo"
              width={55}
              height={55}
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-[55px] md:w-[55px]"
            />
          </Link>
          <Link
            href="/login"
            className="h-5 w-5 shrink-0 opacity-80 transition hover:opacity-100 sm:h-6 sm:w-6"
          >
            <Image
              src="/images/cancel-icon.png"
              alt="Close"
              width={24}
              height={24}
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
            />
          </Link>
        </div>

        <AuthSecureBadge label="Secure reset" />

        <motion.h2
          className="mb-1 bg-clip-text text-center text-xl font-bold text-transparent gradient-shift sm:mb-2 sm:text-2xl md:text-3xl"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
          }}
        >
          Reset Password
        </motion.h2>

        {linkInvalid ? (
          <div className="mt-4 space-y-4 text-center">
            <p className="px-2 text-sm text-white/70">
              This reset link is missing a token or email. Open the link from
              your email, or request a new one.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex w-full items-center justify-center rounded-lg py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:py-3 sm:text-base"
              style={{ background: "var(--btn-bg)" }}
            >
              Request new reset link
            </Link>
            <Link
              href="/login"
              className="block text-sm text-white/60 transition hover:text-white"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-5 px-2 text-center text-xs text-white/80 sm:mb-6 sm:text-sm">
              {email
                ? `Choose a new password for ${email}`
                : "Enter your new password below."}
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 space-y-1 sm:gap-4 sm:space-y-2"
            >
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 ring-1 ring-white/5 transition focus-within:ring-[var(--accent-color)]/40 sm:gap-3 sm:px-4 sm:py-3">
                <Image
                  src="/images/locker.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={6}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder-white/60 sm:text-base"
                />
                <Image
                  src={
                    showPassword
                      ? "/images/eye-opened.png"
                      : "/images/eye-closed.png"
                  }
                  alt="Toggle password visibility"
                  width={18}
                  height={18}
                  className="h-4 w-4 shrink-0 cursor-pointer transition-opacity hover:opacity-80 sm:h-[18px] sm:w-[18px]"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 ring-1 ring-white/5 transition focus-within:ring-[var(--accent-color)]/40 sm:gap-3 sm:px-4 sm:py-3">
                <Image
                  src="/images/locker.png"
                  alt=""
                  width={20}
                  height={20}
                  className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={6}
                  className="w-full bg-transparent text-sm text-white outline-none placeholder-white/60 sm:text-base"
                />
                <Image
                  src={
                    showConfirmPassword
                      ? "/images/eye-opened.png"
                      : "/images/eye-closed.png"
                  }
                  alt="Toggle password visibility"
                  width={18}
                  height={18}
                  className="h-4 w-4 shrink-0 cursor-pointer transition-opacity hover:opacity-80 sm:h-[18px] sm:w-[18px]"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              </div>

              <p className="text-xs text-white/60 sm:text-sm">
                At least 6 characters. Both passwords must match.
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 w-full cursor-pointer rounded-lg py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-2 sm:py-3 sm:text-base"
                style={{ background: "var(--btn-bg)" }}
              >
                {isLoading ? "Resetting..." : "Reset password"}
              </button>
            </form>
          </>
        )}
      </AuthShell>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="relative flex min-h-screen w-full items-center justify-center">
          <div className="fixed inset-0 z-[-1] bg-[#1C1B2B]/90" />
          <div className="text-sm text-white">Loading...</div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
