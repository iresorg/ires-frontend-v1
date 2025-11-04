"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { removeCookie } from "@/lib/api";

export default function Navbar() {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    // Clear user data from store
    clearUser();
    // Remove auth tokens from cookies
    removeCookie("auth_token");
    removeCookie("refresh_token");
    // Redirect to home page
    router.push("/");
  };

  // Get user display name based on role
  const getUserDisplayName = () => {
    if (!user) return "User";

    if (user.role === "organization" && user.organizationProfile) {
      return user.organizationProfile.organizationName;
    }

    if (user.role === "individual" && user.individualProfile) {
      return `${user.individualProfile.firstName} ${user.individualProfile.lastName}`;
    }

    // Fallback to email username
    return user.email.split("@")[0] || "User";
  };

  // Get profile picture URL
  const getProfilePicture = () => {
    if (!user) return "/images/avatar.png";

    if (user.role === "individual" && user.individualProfile?.profilePicture) {
      try {
        const parsed = JSON.parse(user.individualProfile.profilePicture);
        return parsed.url || "/images/avatar.png";
      } catch {
        return "/images/avatar.png";
      }
    }

    if (user.role === "organization" && user.organizationProfile?.logoUrl) {
      try {
        const parsed = JSON.parse(user.organizationProfile.logoUrl);
        return parsed.url || "/images/avatar.png";
      } catch {
        return "/images/avatar.png";
      }
    }

    return "/images/avatar.png";
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0E0E1A]">
      {/* Search Bar */}
      <div className="flex items-center w-[300px] bg-[#1C1C2E] rounded-full px-4 py-2 text-sm">
        <Image
          src="/images/search.png"
          alt="Search Icon"
          width={16}
          height={16}
          className="opacity-70 mr-2"
        />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-white/70 w-full placeholder-white/50"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-5">
        {/* Notification Icon */}
        <div className="bg-[#1C1C2E] p-2 rounded-full">
          <Image
            src="/images/bell icon.png"
            alt="Notifications"
            width={20}
            height={20}
            className=" cursor-pointer"
          />
        </div>
        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer bg-[#1C1C2E] px-3 py-1 rounded-full"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              src={getProfilePicture()}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="text-sm font-medium text-white">
              {getUserDisplayName()}
            </span>
            <Image
              src="/images/white-dropdown.png"
              alt="Dropdown"
              width={14}
              height={14}
              className={`transition-transform ${showDropdown ? "rotate-180" : ""}`}
            />
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1C1C2E] rounded-lg border border-white/10 shadow-lg z-50">
              <div className="p-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md hover:text-red-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
