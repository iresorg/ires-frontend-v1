"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { individualRegistrationSchema, type IndividualRegistrationFormData } from "@/validation/auth";
import { authService } from "@/services/auth";
import SuccessToast from "@/components/sections/SucessToast";
import ErrorToast from "@/components/sections/ErrorToast";
import type { AxiosError } from "axios";

const countries = [
  { name: "Nigeria", code: "+234", flag: "/images/nigeria-flag.png" },
  { name: "Ghana", code: "+233", flag: "/images/ghana-flag.png" },
  { name: "United States", code: "+1", flag: "/images/usa-flag.png" },
  { name: "United Kingdom", code: "+44", flag: "/images/uk-flag.png" },
];

export default function IndividualSignup() {
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IndividualRegistrationFormData>({
    resolver: zodResolver(individualRegistrationSchema),
  });

  const onSubmit = async (data: IndividualRegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const phoneNumber = `${selectedCountry.code}${data.phoneNumber.replace(/\D/g, "")}`;

      // Handle file input - react-hook-form returns FileList
      let profilePicture: File | undefined;
      if (data.profilePicture) {
        if (data.profilePicture instanceof FileList && data.profilePicture.length > 0) {
          profilePicture = data.profilePicture[0];
        } else if (data.profilePicture instanceof File) {
          profilePicture = data.profilePicture;
        }
      }

      const result = await authService.registerIndividual({
        email: data.email,
        password: data.password,
        role: "individual",
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber,
        profilePicture,
      });

      // Redirect to verify email page with account ID and email immediately
      if (result?.id) {
        router.replace(`/signup/verify-email?accountId=${result.id}&email=${encodeURIComponent(data.email)}`);
      } else {
        router.replace(`/signup/verify-email?email=${encodeURIComponent(data.email)}`);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message || "Registration failed. Please try again.";
      setToastMessage(errorMessage);
      setToastType("error");
      setTimeout(() => setToastType(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Toasts */}
      {toastType === "success" && (
        <SuccessToast onClose={() => setToastType(null)} message={toastMessage} />
      )}
      {toastType === "error" && (
        <ErrorToast onClose={() => setToastType(null)} message={toastMessage} />
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

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4185DD]"
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4185DD]"
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

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
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number with Country Selection */}
          <div>
            <div className="relative">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-3">
                <div
                  className="flex items-center gap-[4px] cursor-pointer select-none"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                >
                  <Image
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    width={20}
                    height={14}
                    className="rounded-sm"
                  />
                  <Image
                    src="/images/dropdown.png"
                    alt="Dropdown"
                    width={16}
                    height={16}
                    className={`transition-transform ${countryDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </div>
                <input
                  type="tel"
                  placeholder={`${selectedCountry.code} 910 000 0000`}
                  {...register("phoneNumber")}
                  className="bg-transparent w-full text-white placeholder-white/60 outline-none ml-1"
                />
              </div>
              {countryDropdownOpen && (
                <div className="absolute left-4 top-[105%] w-44 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg z-10">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country);
                        setCountryDropdownOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 cursor-pointer"
                    >
                      <Image
                        src={country.flag}
                        alt={country.name}
                        width={18}
                        height={12}
                        className="rounded-sm"
                      />
                      <span className="text-white text-sm">{country.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.phoneNumber && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.phoneNumber.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
              <Image src="/images/locker.png" alt="Lock" width={20} height={20} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                className="bg-transparent w-full text-white placeholder-white/60 outline-none"
              />
              <Image
                src={showPassword ? "/images/eye-opened.png" : "/images/eye-closed.png"}
                alt="Toggle password visibility"
                width={18}
                height={18}
                className="cursor-pointer transition-opacity hover:opacity-80"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
              <Image src="/images/locker.png" alt="Lock" width={20} height={20} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Password Confirmation"
                {...register("confirmPassword")}
                className="bg-transparent w-full text-white placeholder-white/60 outline-none"
              />
              <Image
                src={showConfirmPassword ? "/images/eye-opened.png" : "/images/eye-closed.png"}
                alt="Toggle password visibility"
                width={18}
                height={18}
                className="cursor-pointer transition-opacity hover:opacity-80"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Profile Picture (Optional) */}
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("profilePicture")}
              className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4185DD] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white file:cursor-pointer hover:file:bg-white/30"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing up..." : "Sign up"}
            {!isSubmitting && (
              <Image
                src="/images/arrow-right.png"
                alt="Arrow"
                width={16}
                height={16}
              />
            )}
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
