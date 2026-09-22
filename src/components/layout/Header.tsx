"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { useAuthStore } from "@/store/auth";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { getAccessToken } from "@/lib/accessToken";
import { clearClientSession } from "@/lib/session";
import {
  getDisplayName,
  profileService,
} from "@/services/profile";
import UserAvatar from "@/components/ui/UserAvatar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  // Avoid SSR/client mismatch until after mount
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, clearUser, fetchUser } = useAuthStore();
  const { handleSignUpNavigation } = useAuthNavigation();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user profile when component mounts if authenticated but user is null
  useEffect(() => {
    if (!mounted) return;
    const hasToken = !!getAccessToken();
    if (hasToken && !user && isAuthenticated) {
      fetchUser({ silent: true });
    }
  }, [mounted, user, isAuthenticated, fetchUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    if (showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (!mounted) return;
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  const navItems = [
    { label: "About Us", href: "/about" },
    { label: "Organization", href: "/organization" },
    { label: "Individual", href: "/individual" },
    { label: "Pricing", href: "/pricing" },
    { label: "Services", href: "/services" },
    { label: "Contact Us", href: "/contact" },
  ];

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
    setShowUserDropdown(false);
    router.push("/");
  };

  const getDashboardRoute = () => {
    if (!user) return "/dashboard";
    return user.role === "organization"
      ? "/dashboard/organization"
      : "/dashboard";
  };

  // Match SSR output until after mount (persist may already have a user on the client)
  const showUserMenu = mounted && isAuthenticated && !!user;

  return (
    <header className="fixed top-0 left-0 right-0 z-100 w-full bg-transparent transition-all duration-300">
      <div className="relative z-100">
        <Section className={`transition-all duration-300 ${isScrolled ? "py-3" : "py-8"}`}>
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? "rounded-full px-3 py-1.5 bg-[#1c1b2b]/90 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
                : ""
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex cursor-pointer items-center">
              <Image
                src="/logos/ires-logo.svg"
                alt="iRES Logo"
                width={120}
                height={40}
                className="h-10 lg:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              className={`hidden items-center gap-0.5 capitalize lg:flex ${
                !isScrolled
                  ? "rounded-full px-1.5 py-1"
                  : "rounded-full px-1 py-0.5"
              }`}
              style={
                !isScrolled
                  ? {
                      background: "var(--secondary)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }
                  : undefined
              }
            >
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="cursor-pointer whitespace-nowrap rounded-full px-2 py-1.5 text-sm font-normal text-[#D1D1D1] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]/50 xl:px-3.5 xl:py-2 xl:text-base 2xl:px-4 2xl:text-base"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button or User Profile */}
            <div className="hidden items-center gap-2 lg:flex xl:gap-3">
              {showUserMenu ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex max-w-[200px] cursor-pointer items-center gap-2 rounded-full px-2.5 py-1.5 transition-colors hover:bg-white/10 xl:max-w-none xl:px-3 xl:py-2"
                    style={{
                      background: isScrolled
                        ? "transparent"
                        : "var(--secondary)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  >
                    <UserAvatar user={user} size={28} />
                    <span className="hidden truncate text-xs font-medium text-white xl:inline xl:text-sm 2xl:text-base">
                      {getDisplayName(user)}
                    </span>
                    <Image
                      src="/images/white-dropdown.png"
                      alt=""
                      width={12}
                      height={12}
                      className={`hidden shrink-0 transition-transform xl:block ${
                        showUserDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#1C1C2E] rounded-lg border border-white/10 shadow-lg z-50">
                      <div className="p-2">
                        <Link
                          href={getDashboardRoute()}
                          onClick={() => setShowUserDropdown(false)}
                          className="block w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm text-white transition-colors hover:bg-white/10 xl:text-base"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href={settingsHref}
                          onClick={() => setShowUserDropdown(false)}
                          className="mt-1 block w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm text-white transition-colors hover:bg-white/10 xl:text-base"
                        >
                          Profile & settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="mt-1 w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm text-white transition-colors hover:bg-white/10 hover:text-red-400 xl:text-base"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="cursor-pointer px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:text-white/80 xl:px-3 xl:text-sm 2xl:text-base"
                  >
                    Login
                  </Link>
                  <Button
                    onClick={handleSignUpNavigation}
                    className="rounded-4xl px-3 py-1.5 text-xs xl:px-4 xl:text-sm 2xl:text-base"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="rounded-lg p-2 transition-all duration-200 lg:hidden"
              aria-label={
                isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
              }
              style={{
                background: "var(--btn-bg-reverse)",
              }}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6 text-white"
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
              ) : (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div
              className="mt-3 max-h-[min(70vh,520px)] overflow-y-auto rounded-2xl p-3 sm:mt-4 sm:p-4 lg:hidden"
              style={{ background: "var(--btn-bg)" }}
            >
              <nav className="flex flex-col gap-1">
                {navItems.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-white/10"
                    style={{ color: "var(--foreground)" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
              {showUserMenu ? (
                  <div className="mt-3 space-y-1 border-t border-white/15 pt-3">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <UserAvatar user={user} size={32} />
                      <span
                        className="truncate text-sm font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        {getDisplayName(user)}
                      </span>
                    </div>
                    <Link
                      href={getDashboardRoute()}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block cursor-pointer rounded-lg px-3 py-2.5 text-md font-medium transition-colors hover:bg-white/10"
                      style={{ color: "var(--foreground)" }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={settingsHref}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block cursor-pointer rounded-lg px-3 py-2.5 text-md font-medium transition-colors hover:bg-white/10"
                      style={{ color: "var(--foreground)" }}
                    >
                      Profile & settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-md font-medium transition-colors hover:bg-white/10 hover:text-red-300"
                      style={{ color: "var(--foreground)" }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 space-y-2 border-t border-white/15 pt-3">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block cursor-pointer rounded-lg px-3 py-3 text-center text-md font-medium text-white transition-colors hover:bg-white/10"
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block cursor-pointer rounded-lg px-3 py-3 text-center text-md font-medium text-white transition-opacity hover:opacity-90"
                      style={{
                        background: "var(--btn-bg)",
                      }}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
            </div>
          )}
        </Section>
      </div>
    </header>
  );
}
