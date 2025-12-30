"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { removeCookie } from "@/lib/api";
import Link from "next/link";

export default function Navbar() {
  const { user, clearUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setShowMobileMenu(false);
      }
    };

    if (showDropdown || showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown, showMobileMenu]);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

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

  const individualMenu = [
    { name: "Overview", icon: "/images/overview.png", href: "/dashboard" },
    {
      name: "Subscription Plans",
      icon: "/images/renewal.png",
      href: "/dashboard/subscription-plans",
    },
    {
      name: "Transaction History",
      icon: "/images/transaction.png",
      href: "/dashboard/transaction-history",
    },
    {
      name: "Ticket Incident History",
      icon: "/images/ticket.png",
      href: "/dashboard/ticket-incident-history",
    },
  ];

  const organizationMenu = [
    { name: "Overview", icon: "/images/overview.png", href: "/dashboard/organization" },
    {
      name: "Subscription Plans",
      icon: "/images/renewal.png",
      href: "/dashboard/organization/subscription-plans",
    },
    {
      name: "Transaction History",
      icon: "/images/transaction.png",
      href: "/dashboard/organization/transaction-history",
    },
    {
      name: "Ticket Incident History",
      icon: "/images/ticket.png",
      href: "/dashboard/organization/ticket-incident-history",
    },
  ];

  const supportItems = [
    { name: "Call Now", icon: "/images/phone-call.png" },
    { name: "Email", icon: "/images/email.png" },
  ];

  const menuItems = user?.role === "organization" ? organizationMenu : individualMenu;

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-white/10 bg-[#0E0E1A] relative z-40">
        {/* Left Side - Mobile Menu Button + Logo (mobile) / Search (desktop) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Menu Button - Only visible on md and below */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden bg-[#1C1C2E] p-2 rounded-lg hover:bg-[#2A2A3E] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {showMobileMenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo - Only visible on mobile */}
          <div className="lg:hidden">
            <Image
              src="/logos/ires-logo.svg"
              alt="iRES Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Search Bar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex items-center w-[300px] bg-[#1C1C2E] rounded-full px-4 py-2 text-sm">
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
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Notification Icon */}
          <div className="bg-[#1C1C2E] p-2 rounded-full hover:bg-[#2A2A3E] transition-colors cursor-pointer">
            <Image
              src="/images/bell icon.png"
              alt="Notifications"
              width={20}
              height={20}
            />
          </div>
          {/* Profile Section */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer bg-[#1C1C2E] px-2 sm:px-3 py-1 rounded-full hover:bg-[#2A2A3E] transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Image
                src={getProfilePicture()}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
              <span className="hidden sm:inline text-sm font-medium text-white">
                {getUserDisplayName()}
              </span>
              <Image
                src="/images/white-dropdown.png"
                alt="Dropdown"
                width={14}
                height={14}
                className={`hidden sm:block transition-transform ${showDropdown ? "rotate-180" : ""}`}
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

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowMobileMenu(false)}>
          <div
            ref={mobileMenuRef}
            className="w-64 h-full bg-[#383754] flex flex-col py-6 px-4 border-r border-white/5 animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div className="flex items-center justify-between mb-8 pl-2">
              <Image
                src="/logos/ires-logo.svg"
                alt="iRES Logo"
                width={55}
                height={55}
                className="h-10 w-auto"
              />
              <button
                onClick={() => setShowMobileMenu(false)}
                className="lg:hidden bg-[#1C1C2E] p-2 rounded-lg hover:bg-[#2A2A3E] transition-colors"
                aria-label="Close menu"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu */}
            <nav className="space-y-2 flex-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${isActive
                        ? "bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA]"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={18}
                      height={18}
                      className="opacity-90"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Section (Support) */}
            <div className="space-y-2 mt-auto">
              {supportItems.map((item) => (
                <button
                  key={item.name}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                >
                  <Image src={item.icon} alt={item.name} width={18} height={18} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
