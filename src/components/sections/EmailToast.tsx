"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EmailSentToast({ onClose }: { onClose?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="absolute top-10 right-10 z-50 flex flex-col items-center text-center px-8 py-6 rounded-2xl"
      style={{
        borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "0 0 15px rgba(180, 37, 218, 0.25)",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 hover:opacity-70 transition-opacity cursor-pointer"
      >
        <Image
          src="/images/cancel-icon.png"
          alt="Close"
          width={25}
          height={25}
        />
      </button>

      {/* Title and  Icon */}
      <div className="flex flex-col items-center mb-3">
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] mb-2">
          Forgot Password
        </h2>
        <Image
          src="/images/mail-sent.png"
          alt="Mail Sent"
          width={45}
          height={45}
        />
      </div>

      {/* Message */}
      <p className="text-white text-sm font-medium max-w-[260px] leading-relaxed">
        Kindly check your mail, we’ve sent you a password reset email
      </p>
    </motion.div>
  );
}
