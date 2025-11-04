"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VerifyEmail() {
  const [timer, setTimer] = useState(60);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleVerify = () => {
    const success = Math.random() > 0.5;

  
    setShowSuccess(false);
    setShowError(false);

    setTimeout(() => {
      if (success) setShowSuccess(true);
      else setShowError(true);
    }, 400); 

    setTimeout(() => {
      setShowSuccess(false);
      setShowError(false);
    }, 4000);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[url('/images/welcome-signup.png')] bg-cover bg-center">
      {/* Toasts */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            key="success-toast"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="absolute top-10 right-10 z-50 flex flex-col items-center text-center px-8 py-5 rounded-2xl "
            style={{
              borderImage:
                "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 0 15px rgba(180, 37, 218, 0.25)",
            }}
          >
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-3 right-3 hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Image
                src="/images/cancel-icon.png"
                alt="Close"
                width={25}
                height={25}
              />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Image
                src="/images/shield-checkmark.png"
                alt="Success Icon"
                width={24}
                height={24}
              />
              <p className="text-white font-bold text-xl">Congratulations!</p>
            </div>

            <p className="text-white text-sm">
              Your email has been successfully verified
            </p>
          </motion.div>
        )}

        {showError && (
          <motion.div
            key="error-toast"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="absolute top-10 right-10 z-50 flex flex-col items-center text-center px-8 py-6 rounded-2xl"
            style={{
              borderImage:
                "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
              borderWidth: "1px",
              borderStyle: "solid",
              boxShadow: "0 0 15px rgba(180, 37, 218, 0.25)",
            }}
          >
            <button
              onClick={() => setShowError(false)}
              className="absolute top-3 right-3 hover:opacity-70 transition-opacity"
            >
              <Image
                src="/images/cancel-icon.png"
                alt="Close"
                width={25}
                height={25}
              />
            </button>

            <div className="flex flex-col items-center gap-2 mb-3">
              <Image
                src="/images/mail-error.png"
                alt="Error Icon"
                width={28}
                height={28}
              />
              <p className="text-white font-bold text-xl">
                Email Verification Error
              </p>
            </div>

            <p className="text-white text-sm mb-4">
              Looks like you entered an invalid code
            </p>

            <motion.button
              onClick={() => setTimer(100)}
              className="px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer"
            >
              Resend Email
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verification card */}
      <div
        className="relative z-10 w-[500px] p-8 rounded-2xl bg-transparent"
        style={{
          borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #601474) 1",
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
          <Link href="/signup/individual" className="w-6 h-6">
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
          className="text-2xl font-bold mb-1 bg-clip-text text-transparent text-center"
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
          Check your email
        </motion.h2>

        <p className="text-white text-sm text-center mb-6">
          Kindly enter the 6-digit code we sent to example@gmail.com
        </p>

        {/* Code inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-white text-xl bg-white/10 rounded-md outline-none focus:ring-2 focus:ring-[#4185DD]"
            />
          ))}
        </div>

        {/* Resend text */}
        <div className="text-center text-white/80 text-sm mb-6">
          Didn’t receive code?{" "}
          {timer > 0 ? (
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
              Resend in 0:{timer.toString().padStart(2, "0")}
            </motion.span>
          ) : (
            <motion.button
              onClick={() => setTimer(60)}
              className="font-semibold bg-clip-text text-transparent inline-block hover:underline"
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
              Resend
            </motion.button>
          )}
        </div>

        {/* Verify button */}
        <button
          onClick={handleVerify}
          type="button"
          className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all cursor-pointer"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
}
