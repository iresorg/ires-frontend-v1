"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SuccessToast({ onClose }: { onClose?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="absolute top-10 right-10 z-50 flex flex-col items-center text-center px-8 py-5 rounded-2xl bg-transparent "
      style={{
        borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "0 0 15px rgba(180, 37, 218, 0.25)",
      }}
    >
      {/* Close button */}
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

      {/* Title Row */}
      <div className="flex items-center gap-2 mb-1">
        <p className="text-white font-semibold text-sm tracking-wide">
          Sign up Successful
        </p>
        <Image
          src="/images/shield-checkmark.png"
          alt="Success Icon"
          width={20}
          height={20}
        />
      </div>

      {/* Message */}
      <h3
        className="text-white font-bold text-xl tracking-wider "
        style={{
          fontFamily: "'Mancondo', serif", 
        }}
      >
        WELCOME TO iRES
      </h3>
    </motion.div>
  );
}
