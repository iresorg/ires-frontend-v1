"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginFormData } from "@/validation/auth";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import type { AxiosError } from "axios";
import ErrorToast from "@/components/sections/ErrorToast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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

      // Get user from store (set by auth service after login)
      const currentUser = useAuthStore.getState().user;

      // Redirect based on user role
      if (currentUser) {
        if (currentUser.role === "organization") {
          router.push("/dashboard/organization");
        } else {
          // Default for "individual" or unknown roles
          router.push("/dashboard");
        }
      } else {
        // fallback
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
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Error Toast */}
      {showError && (
        <ErrorToast
          onClose={() => setShowError(false)}
          message={errorMessage}
        />
      )}

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
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
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
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <div>
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
                {...register("email")}
                className="bg-transparent w-full text-white placeholder-white/60 outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 ml-4">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
              <Image
                src="/images/locker.png"
                alt="Lock"
                width={20}
                height={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="bg-transparent w-full text-white placeholder-white/60 outline-none"
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
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 ml-4">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
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
