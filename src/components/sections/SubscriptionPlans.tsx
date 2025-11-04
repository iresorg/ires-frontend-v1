"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import { motion } from "framer-motion";
export default function SubscriptionPlansPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen  text-white flex flex-col items-center justify-center px-4  relative">
        {/* Background gradient blob */}
        <div className="absolute inset-0 " />

        {/* CURRENT PLAN tag */}
        <div className="absolute top-10 left-20 flex items-center">
          <div
            className="relative px-4 py-1.5 rounded-md text-sm font-semibold text-white 
                  bg-[#0B0B13]/90 border border-transparent 
                  bg-clip-padding 
                  before:absolute before:inset-0 before:rounded-md 
                  before:p-[1px] before:bg-gradient-to-r before:from-[#4185DD] before:to-[#B425DA] 
                  before:-z-10 shadow-[0_0_10px_rgba(180,37,218,0.4)]"
          >
            Current Plan
            {/* Little triangle pointer */}
            <div
              className="absolute bottom-[-6px] left-5 w-0 h-0 
                    border-l-[6px] border-r-[6px] border-t-[6px] border-transparent 
                    border-t-[#0B0B13]"
            />
          </div>
                  
        </div>

        {/* Cards wrapper */}
        <div className="flex flex-wrap gap-6 justify-center items-start mt-20">
          {/* First Card */}
          <div className="relative w-[320px] rounded-2xl p-[1px] bg-gradient-to-r from-[#4185DD] to-[#B425DA]">
            <div className="bg-[#1C1B2B] rounded-2xl p-5 flex flex-col justify-between h-full space-y-1.5">
              {/* Title */}
              <div className="flex items-center space-x-2 relative">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full relative
               bg-[#141327]
               before:absolute before:inset-0 before:rounded-full
               before:p-[1px] before:bg-gradient-to-r before:from-[#B425DA] before:to-[#4185DD]
               before:-z-10"
                >
                  <Image
                    src="/images/Shield.png"
                    alt="Basic Shield"
                    width={20}
                    height={20}
                    className="text-[#4185DD]"
                  />

                  <h3
                    className="font-semibold text-sm bg-gradient-to-r from-[#70A4FF] to-[#601474]
                 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(226,120,255,0.6)]"
                  >
                    Basic Shield
                  </h3>
                </div>
              </div>

              {/* Price */}
              <p className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent text-xl  font-semibold mt-3 italic">
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
                  ₦15,000/Month
                </motion.span>
              </p>
              <p className="text-xs text-gray-400 italic mt-1">
                For everyday phone & social media users
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-4.5 text-sm text-gray-300">
                {[
                  "Incident reporting via phone/email",
                  "Social media account recovery",
                  "Basic scam & fraud advisory",
                  "Personal data privacy checks",
                  "1 Cyber incident resolution / month",
                  "24–48 hrs response time",
                ].map((text, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Image
                      src="/images/checkbox.png"
                      alt="check"
                      width={14}
                      height={14}
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              {/* Footer Buttons */}
              <div className="flex justify-between mt-6 text-xs font-medium">
                <button className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] text-white rounded-md px-4 py-1 cursor-pointer">
                  Expiry Date
                  <br />
                  <span className="text-[10px]">23/11/2025</span>
                </button>
                <button className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] px-4 py-2 rounded-md cursor-pointer">
                  Renew Plan
                </button>
              </div>
            </div>
          </div>

          {/* second card */}
          <div className="relative w-[320px] rounded-2xl p-[1px] bg-gradient-to-r from-[#4185DD] to-[#B425DA]">
            <div className="bg-[#1C1B2B] rounded-2xl p-5 flex flex-col justify-between h-full space-y-1">
              {/* Title */}
              <div className="flex items-center space-x-2 relative">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full relative
               bg-[#141327]
               before:absolute before:inset-0 before:rounded-full
               before:p-[1px] before:bg-gradient-to-r before:from-[#B425DA] before:to-[#4185DD]
               before:-z-10"
                >
                  <Image
                    src="/images/guard.png"
                    alt="Safe Guard"
                    width={20}
                    height={20}
                    className="text-[#4185DD]"
                  />

                  <h3
                    className="font-semibold text-sm bg-gradient-to-r from-[#70A4FF] to-[#601474]
                 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(226,120,255,0.6)]"
                  >
                    Safe Guard
                  </h3>
                </div>
              </div>

              {/* Price */}
              <p className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent text-xl  font-semibold mt-3 italic">
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
                  ₦30,000/Month
                </motion.span>
              </p>
              <p className="text-xs text-gray-400 italic mt-1">
                For freelancers, small scale sellers & influencers
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {[
                  "Priority incident handling",
                  "Malware & spyware removal",
                  "Payment fraud investigation",
                  "Social media & email breach recovery",
                  "Data loss prevention tips",
                  "Up to 2 incidents resolved / month",
                  "12–24hrs response time",
                ].map((text, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Image
                      src="/images/checkbox.png"
                      alt="check"
                      width={14}
                      height={14}
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] mt-6 px-4 py-2 rounded-md text-xs font-medium cursor-pointer">
                Choose Plan
              </button>
            </div>
          </div>

          {/* third card */}
          <div className="relative w-[320px] rounded-2xl p-[1px] bg-gradient-to-r from-[#4185DD] to-[#B425DA]">
            <div className="bg-[#1C1B2B] rounded-2xl p-5 flex flex-col justify-between h-full space-y-1">
              {/* Title */}
              <div className="flex items-center space-x-2 relative">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full relative
               bg-[#141327]
               before:absolute before:inset-0 before:rounded-full
               before:p-[1px] before:bg-gradient-to-r before:from-[#B425DA] before:to-[#4185DD]
               before:-z-10"
                >
                  <Image
                    src="/images/fortress.png"
                    alt="Total Lockdown"
                    width={20}
                    height={20}
                    className="text-[#4185DD]"
                  />

                  <h3
                    className="font-semibold text-sm bg-gradient-to-r from-[#70A4FF] to-[#E278FF]
                 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(226,120,255,0.6)]"
                  >
                    Total Lockdown
                  </h3>
                </div>
              </div>

              {/* Price */}
              <p className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent text-xl  font-semibold mt-3 italic">
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
                  ₦50,000/Month
                </motion.span>
              </p>
              <p className="text-xs text-gray-400 italic mt-1">
                For high-risk individuals, public figures & executives
              </p>

              {/* Features */}
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {[
                  "24/7 priority access",
                  "Advanced account monitoring",
                  "Comprehensive breach investigation",
                  "Device security optimization",
                  "Data recovery support",
                  "3 incidents resolution / month",
                  "4–6hrs response time",
                ].map((text, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <Image
                      src="/images/checkbox.png"
                      alt="check"
                      width={14}
                      height={14}
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <button className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] mt-6 px-4 py-2 rounded-md text-xs font-medium cursor-pointer">
                Choose Plan
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-white text-sm text-center">
          Copyright © 2025 iRES. All Rights Reserved.
        </footer>
      </div>
    </DashboardLayout>
  );
}
