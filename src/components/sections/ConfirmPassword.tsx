"use client";

import { useState } from "react";
import Image from "next/image";

export default function ConfirmPasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center bg-white/10 rounded-lg px-4 py-3 gap-3">
      {/* Lock icon */}
      <Image src="/images/locker.png" alt="Lock" width={20} height={20} />


      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password Confirmation"
        className="bg-transparent w-full text-white placeholder-white/60 outline-none"
      />

      {/* Eye toggle icon */}
      <Image
        src={showPassword ? "/images/eye-opened.png" : "/images/eye-closed.png"}
        alt="Toggle password visibility"
        width={18}
        height={18}
        className="cursor-pointer transition-opacity hover:opacity-80"
        onClick={() => setShowPassword(!showPassword)}
      />
    </div>
  );
}
