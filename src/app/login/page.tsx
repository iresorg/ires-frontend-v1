"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, type LoginFormData } from "@/validation/auth";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import type { AxiosError } from "axios";
import ErrorToast from "@/components/sections/ErrorToast";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setShowError(false);

    try {
      await authService.login({
        email: data.email,
        password: data.password,
      });

      const currentUser = useAuthStore.getState().user;
      const redirect = searchParams.get("redirect");

      if (redirect && redirect.startsWith("/")) {
        router.push(redirect);
        return;
      }

      if (currentUser) {
        if (currentUser.role === "organization") {
          router.push("/dashboard/organization");
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMsg =
        axiosError.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
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
      <div className="security-grid fixed inset-0 z-[-1] opacity-50 pointer-events-none" />

      {showError && (
        <ErrorToast
          onClose={() => setShowError(false)}
          message={errorMessage}
        />
      )}

      <motion.div
        className="relative z-10 w-full max-w-[480px] p-6 sm:p-8 rounded-2xl glass-panel brand-border"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.2, 0, 0, 1] }}
      >
        <div className="flex justify-between items-start mb-4 sm:mb-5">
          <Link href="/" aria-label="Go to homepage" className="shrink-0 transition hover:opacity-90">
            <Image
              src="/logos/ires-logo.svg"
              alt="iRES Logo"
              width={55}
              height={55}
              className="w-12 h-12 sm:w-[55px] sm:h-[55px]"
            />
          </Link>
          <Link href="/signup" className="w-6 h-6 shrink-0 opacity-80 transition hover:opacity-100">
            <Image
              src="/images/cancel-icon.png"
              alt="Close"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </Link>
        </div>

        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="status-dot" />
          <span className="text-[11px] uppercase tracking-wider text-white/55">
            Secure session
          </span>
        </div>

        <motion.h2
          className="text-xl sm:text-2xl font-bold mb-1 text-center bg-clip-text text-transparent gradient-shift"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
          }}
        >
          Welcome Back!
        </motion.h2>

        <p className="text-white text-center text-xs sm:text-sm mb-5 sm:mb-6">
          Delighted to see you again <br />
          Log in to your account below
        </p>

        <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
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
                {...register("email")}
                className="bg-transparent w-full text-white placeholder-white/60 outline-none text-sm sm:text-base"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 ml-3 sm:ml-4">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
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
                {...register("password")}
                className="bg-transparent w-full text-white placeholder-white/60 outline-none text-sm sm:text-base"
              />
              <Image
                src={
                  showPassword
                    ? "/images/eye-opened.png"
                    : "/images/eye-closed.png"
                }
                alt="Toggle Password"
                width={20}
                height={20}
                className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 ml-3 sm:ml-4">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full py-2.5 sm:py-3 rounded-lg text-white font-semibold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base hover:opacity-90"
            style={{ background: "var(--btn-bg)" }}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 sm:mt-5 text-center text-xs sm:text-sm text-white/80">
          <p className="font-medium">
            Don&apos;t have an account?{" "}
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
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#1C1B2B] text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#4185DD]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
