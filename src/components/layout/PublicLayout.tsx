"use client"

import Header from './Header'
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />

            {/* Main content */}
            <main className="">{children}</main>

            <Footer />
        </>
    )
} 