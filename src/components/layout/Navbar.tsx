"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { clearClientSession } from "@/lib/session";
import {
  getDisplayName,
  profileService,
} from "@/services/profile";
import UserAvatar from "@/components/ui/UserAvatar";
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

  const settingsHref =
    user?.role === "organization"
      ? "/dashboard/organization/settings"
      : "/dashboard/settings";

  const handleLogout = async () => {
    try {
      await profileService.logout();
    } catch {
      // Clear local session even if API fails
    }
    clearUser();
    clearClientSession();
    router.push("/");
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
    {
      name: "Profile & Settings",
      icon: "/images/overview.png",
      href: "/dashboard/settings",
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
    {
      name: "Profile & Settings",
      icon: "/images/overview.png",
      href: "/dashboard/organization/settings",
    },
  ];

  const supportItems = [
    { name: "Call Now", icon: "/images/phone-call.png", href: "tel:+2348100000000" },
    { name: "Email", icon: "/images/email.png", href: "mailto:support@iresorg.com" },
  ];

  const menuItems = user?.role === "organization" ? organizationMenu : individualMenu;

  return (
    <>
      <header className="relative z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#141327]/95 px-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10 transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-white"
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

          <div className="lg:hidden">
            <Image
              src="/logos/ires-logo.svg"
              alt="iRES Logo"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          <div className="hidden w-[300px] items-center rounded-full bg-white/5 px-4 py-2 text-sm ring-1 ring-white/10 lg:flex">
            <Image
              src="/images/search.png"
              alt=""
              width={16}
              height={16}
              className="mr-2 opacity-70"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-white/80 outline-none placeholder-white/40"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="cursor-pointer rounded-full bg-white/5 p-2 ring-1 ring-white/10 transition-colors hover:bg-white/10">
            <Image
              src="/images/bell icon.png"
              alt="Notifications"
              width={20}
              height={20}
            />
          </div>
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex cursor-pointer items-center gap-2 rounded-full bg-white/5 px-2 py-1 ring-1 ring-white/10 transition-colors hover:bg-white/10 sm:px-3"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <UserAvatar user={user} size={32} />
              <span className="hidden text-sm font-medium text-white sm:inline">
                {getDisplayName(user)}
              </span>
              <Image
                src="/images/white-dropdown.png"
                alt=""
                width={14}
                height={14}
                className={`hidden transition-transform sm:block ${showDropdown ? "rotate-180" : ""}`}
              />
            </div>

            {showDropdown && (
              <div className="absolute top-full right-0 z-50 mt-2 w-48 rounded-xl bg-[#141327] p-2 shadow-xl ring-1 ring-white/10">
                <Link
                  href={settingsHref}
                  onClick={() => setShowDropdown(false)}
                  className="block w-full rounded-lg px-4 py-2 text-left text-sm text-white transition-colors hover:bg-white/10"
                >
                  Profile & settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg px-4 py-2 text-left text-sm text-white transition-colors hover:bg-white/10 hover:text-red-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            ref={mobileMenuRef}
            className="flex h-full w-64 flex-col border-r border-white/10 bg-[#141327] px-3 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between px-2">
              <Image
                src="/logos/ires-logo.svg"
                alt="iRES Logo"
                width={55}
                height={55}
                className="h-10 w-auto"
              />
              <button
                onClick={() => setShowMobileMenu(false)}
                className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10"
                aria-label="Close menu"
              >
                <svg
                  className="h-5 w-5 text-white"
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

            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    item.href !== "/dashboard/organization" &&
                    pathname.startsWith(`${item.href}/`));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setShowMobileMenu(false)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={18}
                      height={18}
                      className="opacity-90"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
              {supportItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 hover:bg-white/5 hover:text-white"
                >
                  <Image src={item.icon} alt="" width={18} height={18} />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
