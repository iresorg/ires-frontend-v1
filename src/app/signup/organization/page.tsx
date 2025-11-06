"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CountrySelection from "@/components/sections/CountrySelection";
import { useState, ChangeEvent, DragEvent } from "react";
import { useRouter } from "next/navigation"; 
export default function OrganizationSignup() {
 const router = useRouter();

 const [fileName, setFileName] = useState<string | null>(null);
 const [isDragging, setIsDragging] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleFileChange = (file: File) => {
   if (file) {
     setFileName(file.name);
   }
 };

 const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files.length > 0) {
     handleFileChange(e.target.files[0]);
   }
 };

 const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
   e.preventDefault();
   setIsDragging(true);
 };

 const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
   e.preventDefault();
   setIsDragging(false);
 };

 const handleDrop = (e: DragEvent<HTMLDivElement>) => {
   e.preventDefault();
   setIsDragging(false);
   if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
     handleFileChange(e.dataTransfer.files[0]);
     e.dataTransfer.clearData();
   }
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   setIsSubmitting(true);
   try {
     // Simulate API call
     await new Promise((resolve) => setTimeout(resolve, 2000));

     console.log("Organization signed up!");

    
     router.push("/welcome");
   } catch (error) {
     console.error("Signup failed", error);
   } finally {
     setIsSubmitting(false);
   }
 };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Signup Card */}
      <div
        className="relative z-10 w-[800px] p-4 rounded-2xl bg-transparent mt-50 mb-2"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* Logo */}
        <div className="flex justify-between items-start">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
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
        <form className="space-y-2 text-xs" onSubmit={handleSubmit}>
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
              <label
                htmlFor="company-size"
                className="block text-gray-500 text-[10px] mt-2 mb-2"
              >
                (Numbers of employees?)
              </label>
              <select
                id="company-size"
                className="w-full bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option hidden>Company Size</option>
                <option>1–10 employees</option>
                <option>11–50 employees</option>
                <option>51–200 employees</option>
                <option>201–500 employees</option>
                <option>500+ employees</option>
              </select>
              <Image
                src="/images/drop_down.svg"
                alt="Arrow Dropdown"
                width={20}
                height={20}
                className="absolute top-9 right-3 pointer-events-none"
              />
            </div>
          </div>

          {/* Location Input */}
          <div>
            <label
              htmlFor="company-Location"
              className="block text-gray-500 text-[12px] mt-2 mb-2"
            >
              Company Location
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="relative">
                <select className="w-full bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
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
                <select className="w-full bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
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
                <select className="w-full bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none">
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
              <label className="block text-gray-500 mt-2 mb-2">
                Primary Contact Person
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Full Name |"
                className="bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                placeholder="Job Title"
                className="bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                placeholder="Email |"
                className="bg-gray-700/40 text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="bg-transparent w-full text-gray-500 outline-none"
                />
              </div>
              {/* Telephone Input */}
              <div>
                <CountrySelection />
              </div>
            </div>
          </div>

          {/* Logo and Password */}
          <label
            htmlFor="company-logo"
            className="block text-gray-500 text-md mt-2 mb-2"
          >
            Upload your company logo
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div
              className="bg-gray-700/40 rounded-lg border-[2px] border-dashed"
              style={{
                borderImage:
                  "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
                borderImageSlice: 1,
                borderStyle: isDragging ? "dashed" : "solid",
              }}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <Image
                  src="/images/upload.svg"
                  alt="Upload Icon"
                  width={70}
                  height={70}
                />
                <label htmlFor="dropzone-file" className="space-y-3">
                  {fileName ? (
                    <p className="text-sm text-gray-300 text-center">
                      {fileName}
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold italic underline decoration-blue-500 decoration-4">
                        Click to upload
                      </span>{" "}
                      or drag and drop{" "}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 text-center">
                    Max file size: 15MB
                  </p>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>

            {/* Password Section */}
            <div className="flex flex-col items-center space-y-2">
              {/* Password Input */}
              <div className="w-full">
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
                    className="bg-transparent w-full text-white placeholder-white/60 outline-none"
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
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="w-full">
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
                  <Image
                    src="/images/locker.png"
                    alt="Lock"
                    width={20}
                    height={20}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="bg-transparent w-full text-white placeholder-white/60 outline-none"
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
                    className="cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
              </div>

              <p className="text-[8px] text-gray-500 text-center leading-snug">
                (Keep your account safe, tight and unique by using a combination
                of uppercase & lowercase letters, symbols and numbers)
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
           
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-[60%] py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Signing up..." : "Sign up"}
              </button>
        
          </div>
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
