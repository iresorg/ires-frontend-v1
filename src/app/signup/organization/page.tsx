"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function OrganizationSignup() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Background image*/}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/welcome-signup.png"
          alt="Background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-8 z-20">
        <Image
          src="/logos/ires-logo.svg"
          alt="iRES Logo"
          width={80}
          height={80}
          className="h-10 w-auto"
        />
      </div>

      {/* Close icon */}
      <Link
        href="/signup"
        aria-label="Close"
        className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full flex items-center justify-center"
      >
        <Image
          src="/images/cancel-icon.png"
          alt="Close"
          width={30}
          height={30}
        />
      </Link>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6 border border-white/20 rounded-2xl py-5 max-w-5xl w-full max-h-[97vh] overflow-y-auto"
      >
        {/* Title */}
        <h1
          className="text-3xl md:text-2xl font-semibold tracking-wide mb-1"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #4185DD 0%, #B425DA 50%, #FF7FB1 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Sign Up
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 text-base md:text-md mb-3 max-w-lg mx-auto">
          Enter your details below to create an account and get started
        </p>

        {/* Signup Form */}
        <form className="space-y-4 text-sm">
          {/* Company Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name |"
              className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option hidden>Business Type</option>
              <option>Others</option>
            </select>
            <select className="w-full bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option hidden>Company Size</option>
              <option>Others</option>
            </select>
          </div>

          {/* Location Input */}
          <div>
            <h3 className="text-gray-300 text-sm mb-2 text-left">
              Company Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option hidden>City</option>
                <option>Maitama</option>
              </select>
              <select className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option hidden>State</option>
                <option>Abuja</option>
              </select>
              <select className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option hidden>Country</option>
                <option>Nigeria</option>
              </select>
              <input
                type="text"
                placeholder="(Street / area / lga address) |"
                className="w-full mt-3 bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Primary Contact Person */}
          <div>
            <div>
              <h3 className="text-gray-300 text-left text-sm mb-2">
                Primary Contact Person
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name |"
                className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Job Title"
                className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                placeholder="Email |"
                className="bg-gray-700/40 text-gray-200 rounded-lg px-4 py-2 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/*Company Email & Telephone*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
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
              <div className="flex items-center bg-gray-700/40 rounded-lg px-4 py-2">
                <div className="flex flex-row items-center mr-4">
                  <Image
                    src="/images/9ja_flag.svg"
                    alt="Nigerian Flag"
                    width={20}
                    height={20}
                  />
                  <Image
                    src="/images/drop_down.svg"
                    alt="Arrow Dropdown"
                    width={20}
                    height={20}
                  />
                </div>
                <input
                  type="tel"
                  placeholder="+234 910 000 0000"
                  className="bg-transparent w-full text-gray-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Logo and Password */}
          <h3 className="text-left">Upload your company logo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div>
              <div className="flex flex-col items-center bg-gray-700/40 rounded-lg px-4 py-2">
                <Image
                  src="/images/upload.svg"
                  alt="Upload Icon"
                  width={50}
                  height={50}
                />
                <label htmlFor="dropzone-file">
                  <p>
                    <span className="font-semibold italic underline">Click to upload</span> or
                    drag and drop{" "}
                  </p>
                  <p className="text-xs text-gray-500">Max file size: 15MB</p>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-full flex flex-row items-center bg-gray-700/40 rounded-lg px-4 py-2">
                <Image
                  src="/images/pw_lock.svg"
                  alt="Password Lock Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <input
                  type="password"
                  placeholder="Create Password |"
                  className="bg-transparent w-full text-gray-200 outline-none"
                />
                <Image
                  src="/images/mdi_eye.svg"
                  alt="Eye Icon"
                  width={20}
                  height={20}
                />
              </div>

              <div className="w-full flex flex-row items-center bg-gray-700/40 rounded-lg px-4 py-2">
                <Image
                  src="/images/pw_lock.svg"
                  alt="Password Lock Icon"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <input
                  type="password"
                  placeholder="Confirm Password |"
                  className="bg-transparent w-full text-gray-200 outline-none"
                />
                <Image
                  src="/images/mdi_eye.svg"
                  alt="Eye Icon"
                  width={20}
                  height={20}
                />
              </div>
              <p className="text-xs">
                (Keep your account safe, tight and unique by using combination
                of uppercase & lowercase letters, symbols and numbers)
              </p>
            </div>
          </div>
          <br /><br />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg mb-2  transition-colors"
          >
            Sign up
          </button>
        </form>
        <p className="mb-2 ">
          Already have an account?
          <Link href="/login" className="text-purple-400 hover:underline ml-1">
            Login
          </Link>
        </p>

        {/* Footer */}
        <p className="mt-5 text-sm text-white/70">
          Copyright © 2025 iRES. All Rights Reserved.
        </p>
      </motion.div>
    </div>
  );
}
