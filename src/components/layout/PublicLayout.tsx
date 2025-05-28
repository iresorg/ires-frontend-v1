'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Call for Responders', href: '/responders' },
]

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch
    if (!mounted) {
        return null
    }

    return (
        <>
            {/* Header */}
            <header className="fixed inset-x-0 top-0 z-50 bg-black text-white shadow">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold text-purple-500 hover:text-purple-400 focus:text-purple-400">
                            IRES
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-semibold leading-6 transition-colors ${pathname === item.href
                                        ? 'text-purple-400'
                                        : 'text-white hover:text-purple-400 focus:text-purple-400'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="rounded-md p-2 text-white hover:text-purple-400 focus:text-purple-400"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            )}
                        </button>
                        <Link
                            href="/contact"
                            className="text-sm font-semibold leading-6 text-white hover:text-purple-400 focus:text-purple-400"
                        >
                            Contact Us
                        </Link>
                    </div>
                </nav>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="fixed inset-0 bg-black/90" onClick={() => setMobileMenuOpen(false)} />
                        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="-m-1.5 p-1.5 text-2xl font-bold text-purple-500 hover:text-purple-400 focus:text-purple-400">
                                    IRES
                                </Link>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors ${pathname === item.href
                                                        ? 'text-purple-400'
                                                        : 'text-white hover:text-purple-400 focus:text-purple-400'
                                                    }`}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <button
                                            onClick={() => {
                                                setTheme(theme === 'dark' ? 'light' : 'dark')
                                                setMobileMenuOpen(false)
                                            }}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:text-purple-400 focus:text-purple-400"
                                        >
                                            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
                                        </button>
                                        <Link
                                            href="/contact"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:text-purple-400 focus:text-purple-400"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Main content */}
            <main className="pt-16 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">{children}</main>

            {/* Footer */}
            <footer className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]">
                <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        <Link href="/privacy" className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300">
                            Terms of Service
                        </Link>
                    </div>
                    <div className="mt-8 md:order-1 md:mt-0">
                        <p className="text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
                            &copy; {new Date().getFullYear()} IRES. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    )
} 