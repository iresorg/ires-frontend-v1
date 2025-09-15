'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Button href="/signup" className='rounded-4xl'>
                Sign Up
              </Button>
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
                <div className="pt-2 w-full">
                  <Button href="/signup" onClick={() => setIsMobileMenuOpen(false)} className='!w-full'>
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Section>
      </div>
    </header>
  );
}
