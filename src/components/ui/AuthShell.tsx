"use client";

import type { ReactNode } from "react";
import Image from "next/image";

type AuthShellProps = {
  children: ReactNode;
  maxWidthClass?: string;
};

/** Shared secure auth background + glass card frame */
export function AuthShell({
  children,
  maxWidthClass = "max-w-[480px]",
}: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <video
        className="fixed top-0 left-0 z-[-2] h-full w-full object-cover"
        src="/video/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <Image
        src="/images/welcome-signup.png"
        alt=""
        fill
        className="object-cover z-[-3]"
        priority
      />
      <div className="fixed inset-0 z-[-1] bg-[#1C1B2B]/90" />
      <div className="security-grid pointer-events-none fixed inset-0 z-[-1] opacity-50" />
      <div
        className={`relative z-10 w-full ${maxWidthClass} rounded-2xl p-6 sm:p-8 glass-panel brand-border`}
      >
        {children}
      </div>
    </div>
  );
}

export function AuthSecureBadge({ label = "Secure session" }: { label?: string }) {
  return (
    <div className="mb-4 flex items-center justify-center gap-2">
      <span className="status-dot" />
      <span className="text-[11px] uppercase tracking-wider text-white/55">
        {label}
      </span>
    </div>
  );
}
