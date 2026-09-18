"use client";

import Image from "next/image";
import {
  getUserAvatarUrl,
  getUserInitials,
  type UserProfile,
} from "@/services/profile";

type UserAvatarProps = {
  user: UserProfile | null | undefined;
  size?: number;
  className?: string;
};

export default function UserAvatar({
  user,
  size = 32,
  className = "",
}: UserAvatarProps) {
  const avatarUrl = getUserAvatarUrl(user);
  const initials = getUserInitials(user);

  if (avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt=""
        width={size}
        height={size}
        className={`shrink-0 rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${className}`}
      style={{
        width: size,
        height: size,
        background: "var(--btn-bg)",
        fontSize: Math.max(10, Math.round(size * 0.35)),
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
