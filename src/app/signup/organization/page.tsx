"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CountrySelection from "@/components/sections/CountrySelection";
import PasswordInput from "@/components/sections/PasswordInput";
import ConfirmPasswordInput from "@/components/sections/ConfirmPassword";

export default function OrganizationSignup() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Signup Card */}
      <div
        className="relative z-10 w-[800px] p-4 rounded-2xl  bg-transparent"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* Logo */}
        <div className="flex justify-between items-start mb-3">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
          {/* Close icon */}
          <Link href="/signup" aria-label="Close" className="w-6 h-6">
            <Image
              src="/images/cancel-icon.png"
              alt="Close"
              width={24}
              height={24}
            />
          </Link>
        </div>

        {/* Main content */}
        <motion.h2
          className="text-2xl font-bold mb-1 bg-clip-text text-transparent text-center -mt-5"
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
        <p className="text-white text-center text-sm mb-4">
          Enter your details below to create an account and get started
        </p>

        {/* Signup Form */}
        <form className="space-y-2 text-xs">
          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <input
                type="text"
                placeholder="Company Name |"
                className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="relative">
              <select className="w-full bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option hidden>Business Type</option>
                <option>Others</option>
              </select>
              <Image
                src="/images/drop_down.svg"
                alt="Arrow Dropdown"
                width={20}
                height={20}
                className="absolute top-2 right-3 pointer-events-none"
              />
            </div>
            <div className="relative">
              <select className="w-full bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                <option hidden>Company Size</option>
                <option>Others</option>
              </select>
              <Image
                src="/images/drop_down.svg"
                alt="Arrow Dropdown"
                width={20}
                height={20}
                className="absolute top-2 right-3 pointer-events-none"
              />
            </div>
          </div>

          {/* Location Input */}
          <div>
            <h5 className="text-gray-300 text-sm mb-2 text-left">
              Company Location
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="relative">
                <select className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                  <option hidden>City</option>
                  <option>Maitama</option>
                </select>
                <Image
                  src="/images/drop_down.svg"
                  alt="Arrow Dropdown"
                  width={20}
                  height={20}
                  className="absolute top-2 right-3 pointer-events-none"
                />
              </div>
              <div className="relative">
                <select className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                  <option hidden>State</option>
                  <option>Abuja</option>
                </select>
                <Image
                  src="/images/drop_down.svg"
                  alt="Arrow Dropdown"
                  width={20}
                  height={20}
                  className="absolute top-2 right-3 pointer-events-none"
                />
              </div>
              <div className="relative">
                <select className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
                  <option hidden>Country</option>
                  <option>Nigeria</option>
                </select>
                <Image
                  src="/images/drop_down.svg"
                  alt="Arrow Dropdown"
                  width={20}
                  height={20}
                  className="absolute top-2 right-3 pointer-events-none"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="(Street / area / lga address) |"
                  className="w-full mt-3 bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Primary Contact Person */}
          <div>
            <div>
              <h3 className="text-gray-300 text-left text-sm mb-2">
                Primary Contact Person
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Full Name |"
                className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Job Title"
                className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                placeholder="Email |"
                className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/*Company Email & Telephone*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="flex items-center bg-gray-700/40 rounded-lg px-4 py-2">
                <Image
                  src="/images/comp_email.svg"
                  alt="Company Email"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <input
                  type="email"
                  placeholder="Company Email"
                  className="bg-transparent w-full text-gray-200 outline-none"
                />
              </div>
              {/* Telephone Input */}
              <div>
                {/* Phone */}
                <CountrySelection />
              </div>
            </div>
          </div>

          {/* Logo and Password */}
          <div className="flex flex-row justify-between items-start mt-2 mb-2">
            <h3 className="text-gray-300 text-sm text-left">
              Upload your company logo
            </h3>
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
              .  .  .
            </motion.span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div>
              <div className="flex flex-col items-center bg-gray-700/40 rounded-lg px-4 py-2">
                <Image
                  src="/images/upload.svg"
                  alt="Upload Icon"
                  width={70}
                  height={70}
                />
                <label htmlFor="dropzone-file" className="space-y-3">
                  <p>
                    <span className="font-semibold italic underline decoration-blue-500 decoration-4">
                      Click to upload
                    </span>{" "}
                    or drag and drop{" "}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Max file size: 15MB
                  </p>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* Password Section */}
            <div className="flex flex-col items-center space-y-2">
              {/* Password Input */}
              <div className="w-full">
                <PasswordInput />
              </div>
              {/* Password Confirmation */}
              <div className="w-full">
                <ConfirmPasswordInput />
              </div>
              <p className="text-xs">
                (Keep your account safe, tight and unique by using combination
                of uppercase & lowercase letters, symbols and numbers)
              </p>
            </div>
          </div>
          <br />
          {/* Submit Button */}
          {/* Button */}
          <Link href="/signup/verify-email">
            <button
              type="submit"
              className="mt-3 w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign up
            </button>
          </Link>
        </form>
        {/* Footer */}
        <p className="mt-4 text-center text-sm text-white/80">
          Already have an account?
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
