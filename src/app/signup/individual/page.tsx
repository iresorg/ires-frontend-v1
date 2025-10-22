"use client";

import Image from "next/image";
import Link from "next/link";
import CountrySelection from "@/components/sections/CountrySelection";
// import PasswordInput from "@/components/sections/PasswordInput";
export default function IndividualSignup() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Signup card */}
      <div
        className="relative z-10 w-[500px] p-8 rounded-2xl  bg-transparent"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* IRES and Close icons */}
        <div className="flex justify-between items-start mb-5">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
          <Link href="/" className="w-6 h-6">
            <Image
              src="/images/cancel-icon.png"
              alt="Close"
              width={24}
              height={24}
            />
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-1  bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent">
          Sign up
        </h2>

        <p className="text-white text-sm mb-6">
          Enter your details below to create an account and get started
        </p>

        {/* Form fields */}
        <form className="flex flex-col gap-3">
          {/* Name fields */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4185DD]"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 bg-white/10 text-white placeholder-white/60 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#4185DD]"
            />
          </div>

          {/* Email */}
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

          {/* Phone */}
            <CountrySelection />
          {/* Password */}
          <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
            <Image
              src="/images/locker.png"
              alt="Lock"
              width={20}
              height={20}
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent w-full text-white placeholder-white/60 outline-none"
            />
            <Image
              src="/images/eye-closed.png"
              alt="Hide"
              width={18}
              height={18}
            />
          </div>
            {/* <PasswordInput /> */}

          {/* Password Confirmation */}
          <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
            <Image
              src="/images/locker.png"
              alt="Lock"
              width={20}
              height={20}
            />
            <input
              type="password"
              placeholder="Password Confirmation"
              className="bg-transparent w-full text-white placeholder-white/60 outline-none"
            />
            <Image
              src="/images/eye-closed.png"
              alt="Hide"
              width={18}
              height={18}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-3 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all"
          >
            Sign up →
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-white/80">
          Already have an account?{" "}
          <Link href="/login" className="text-[#4185DD] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
