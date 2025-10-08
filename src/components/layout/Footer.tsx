'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6
        }
    }
}

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#1A1A2E] text-white">
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
                {/* Main Footer Content */}
                <motion.div
                    className="py-16 lg:py-20"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Company Information */}
                        <motion.div className="lg:col-span-1 space-y-6" variants={itemVariants}>
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <Image
                                    src="/logos/ires-logo.svg"
                                    alt="iRES Logo"
                                    width={40}
                                    height={40}
                                    className="w-10 h-10"
                                />
                                <div>
                                   
                                    <div className="text-sm">
                                        <span 
                                            className="font-medium"
                                            style={{ color: 'var(--accent-secondary-color)' }}
                                        >
                                            Incident
                                        </span>
                                        <span className="text-white"> Response Emergency System</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-white/80 text-sm leading-relaxed">
                                Experience fast security response like never before with cutting-edge technology to keep you safe. 
                                This is iRES - Real Time, Real People, Real Protection.
                            </p>

                            {/* Social Media Icons */}
                            <div className="flex gap-3">
                                <Link
                                    href="#"
                                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:scale-110"
                                 
                                >
                                    <Image
                                        src="/icons/linkedin.svg"
                                        alt="LinkedIn"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:scale-110"
                                
                                >
                                    <Image
                                        src="/icons/facebook.svg"
                                        alt="Facebook"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:scale-110"
                                   
                                >
                                    <Image
                                        src="/icons/instagram.svg"
                                        alt="Instagram"
                                        width={20}
                                        height={20}
                                        className="w-5 h-5"
                                    />
                                </Link>
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div className="space-y-6" variants={itemVariants}>
                            <h3 className="text-white font-bold text-lg">Quick Links</h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Home', href: '/' },
                                    { name: 'About Us', href: '/about' },
                                    { name: 'Pricing Plans', href: '/pricing' },
                                    { name: 'Organizations', href: '/organization' },
                                    { name: 'Individuals', href: '/individual' }
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-white/80 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Services */}
                        <motion.div className="space-y-6" variants={itemVariants}>
                            <h3 className="text-white font-bold text-lg">Services</h3>
                            <ul className="space-y-3">
                                {[
                                    { name: 'Our Services', href: '/services' },
                                    { name: 'FAQs', href: '/faq' },
                                    { name: 'Blogs', href: '/blog' },
                                    { name: 'Terms of Service & Conditions', href: '/terms' },
                                    { name: 'Newsletter SignUp', href: '/newsletter' }
                                ].map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-white/80 hover:text-white transition-colors text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div className="space-y-6" variants={itemVariants}>
                            <h3 className="text-white font-bold text-lg">Contact Information</h3>
                            <div className="space-y-4">
                                {/* Location */}
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                        <Image
                                            src="/icons/location_on.svg"
                                            alt="Location"
                                            width={20}
                                            height={20}
                                            className="w-5 h-5"
                                          
                                        />
                                    </div>
                                    <span className="text-white/80 text-sm">
                                        17 Whatever, Somewhere, Lagos, Nigeria
                                    </span>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                        <Image
                                            src="/icons/mark_email_unread.svg"
                                            alt="Email"
                                            width={20}
                                            height={20}
                                            className="w-5 h-5"
                                           
                                        />
                                    </div>
                                    <span className="text-white/80 text-sm">
                                        iresorgsupport@gmail.com
                                    </span>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                                        <Image
                                            src="/icons/phone.svg"
                                            alt="Phone"
                                            width={20}
                                            height={20}
                                            className="w-5 h-5"
                                         
                                        />
                                    </div>
                                    <span className="text-white/80 text-sm">
                                        +234 810 000 0000
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Copyright Bar */}
                <motion.div
                    className="border-t border-white/10 py-6"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div className="text-center">
                        <p className="text-white/60 text-sm">
                            Copyright © {currentYear} IRES. All Rights Reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}
