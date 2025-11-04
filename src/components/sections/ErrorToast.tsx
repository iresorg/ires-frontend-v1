"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ErrorToast({ onClose }: { onClose?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="absolute top-10 right-10 z-50 flex flex-col items-center text-center px-8 py-5 rounded-2xl bg-transparent"
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
          width={16}
          height={16}
        />
      </button>

      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Image
          src="/images/warning.png"
          alt="Error Icon"
          width={22}
          height={22}
        />
        <p className="text-white font-semibold text-sm">
          Something went wrong!
        </p>
      </div>

      {/* Message */}
      <p className="text-white/80 text-sm leading-snug max-w-xs">
        Kindly refill your details and sign up again
      </p>
    </motion.div>
  );
}
