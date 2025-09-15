"use client"

import Link from 'next/link'
import Header from './Header'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            {/* Main content */}
            <main className="">{children}</main>

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