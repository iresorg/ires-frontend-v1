'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useAuthStore } from '@/store/auth';
import { removeCookie } from '@/lib/api';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, clearUser, fetchUser } = useAuthStore();

  // Fetch user profile when component mounts if authenticated but user is null
  useEffect(() => {
    const token = typeof document !== "undefined" ? document.cookie.includes("auth_token") : false;
    if (token && !user && isAuthenticated) {
      fetchUser();
    }
  }, [user, isAuthenticated, fetchUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'About Us', href: '/about' },
    { label: 'Organization', href: '/organization' },
    { label: 'Individual', href: '/individual' },
    { label: 'Explore Plans', href: '/pricing' },
    { label: 'Our Services', href: '/services' },
  ];

  const handleLogout = () => {
    clearUser();
    removeCookie("auth_token");
    removeCookie("refresh_token");
    setShowUserDropdown(false);
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

  // Get dashboard route based on role
  const getDashboardRoute = () => {
    if (!user) return "/dashboard";
    return user.role === "organization" ? "/dashboard/organization" : "/dashboard";
  };

  return (
    <header
      className="absolute w-full top-0 left-0 right-0 z-100 bg-transparent transition-colors duration-300"

    >
      <div className="relative top-0 z-100">
        <Section className='py-8'>
          <div className="flex items-center justify-between"
            style={
              isScrolled
                ? {
                  background: 'var(--secondary)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  borderBottom: '1px solid var(--divider-color)',
                  borderRadius: '100px',
                  padding: '0px 10px'
                }
                : undefined
            }>
            {/* Logo */}
            <Link href="/" className="flex items-center">
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
              className="hidden lg:flex items-center space-x-8 rounded-4xl px-4 capitalize"
              style={
                !isScrolled
                  ? {
                    background: 'var(--secondary)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderBottom: '1px solid var(--divider-color)',
                    borderRadius: '100px',
                    padding: '0px 10px'
                  }
                  : undefined
              }
            >
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-base font-normal px-3 py-3 my-2 text-[#D1D1D1] hover:bg-[var(--secondary)] rounded-4xl"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Button or User Profile */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full transition-colors hover:bg-white/10"
                    style={{
                      background: isScrolled ? 'transparent' : 'var(--secondary)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
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
                      className={`transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#1C1C2E] rounded-lg border border-white/10 shadow-lg z-50">
                      <div className="p-2">
                        <Link
                          href={getDashboardRoute()}
                          onClick={() => setShowUserDropdown(false)}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md transition-colors"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-md hover:text-red-400 transition-colors mt-1"
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
                    className="text-base font-medium px-4 py-2 text-white hover:text-white/80 transition-colors"
                  >
                    Login
                  </Link>
                  <Button href="/signup" className='rounded-4xl'>
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg transition-all duration-200 bg-[var(--btn-bg)]"
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              style={{
                background: 'var(--btn-bg-reverse)',
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
            <div className="md:hidden mt-4 p-4 rounded-lg" style={{ background: 'var(--btn-bg)' }}>
              <div className="flex flex-col space-y-3">
                <Link
                  href="/about"
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  style={{ color: 'var(--foreground)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/organization"
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  style={{ color: 'var(--foreground)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Organization
                </Link>
                <Link
                  href="/individual"
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  style={{ color: 'var(--foreground)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Individual
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  style={{ color: 'var(--foreground)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Explore Plans
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  style={{ color: 'var(--foreground)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Our Services
                </Link>
                {isAuthenticated && user ? (
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <Image
                        src={getProfilePicture()}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                      <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        {getUserDisplayName()}
                      </span>
                    </div>
                    <Link
                      href={getDashboardRoute()}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:text-red-400"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 space-y-2 w-full">
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm font-medium px-4 py-2 rounded-lg transition-colors text-center"
                      style={{ color: 'var(--foreground)' }}
                    >
                      Login
                    </Link>
                    <Button href="/signup" onClick={() => setIsMobileMenuOpen(false)} className='!w-full'>
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </Section>
      </div>
    </header>
  );
}
