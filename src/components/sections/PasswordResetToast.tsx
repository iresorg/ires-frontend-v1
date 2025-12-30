"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PasswordResetToast({
  onClose,
}: {
  onClose?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="absolute top-10 right-10 z-50 flex flex-col items-center justify-center text-center px-8 py-5 rounded-2xl bg-transparent"
      style={{
        borderImage: "linear-gradient(90deg, #4185DD, #5D207F, #B425DA) 1",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 cursor-pointer"
      >
        <Image
          src="/images/cancel-icon.png"
          alt="Close"
          width={25}
          height={25}
        />
      </button>

      {/* Toast Body */}
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src="/images/pwreset-success.svg"
          alt="Success Icon"
          width={45}
          height={45}
          className="mb-2"
        />
        <h3 className="text-white font-bold text-lg tracking-wide">
          Successful Password Reset
        </h3>
        <p className="text-white/80 text-sm leading-snug mb-3">
          You can now use your new password to log in
        </p>

        {/* Log In Button */}
        <Link
          href="/login"
          className="px-10 py-2 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] hover:opacity-90 transition-all"
        >
          Log In
        </Link>
      </div>
    </motion.div>
  );
}
