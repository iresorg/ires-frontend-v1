"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Company Info */}
            <motion.div className="space-y-6" variants={itemVariants}>
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
                      style={{ color: "var(--accent-secondary-color)" }}
                    >
                      Incident
                    </span>
                    <span className="text-white">
                      {" "}
                      Response Emergency System
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-white/80 text-sm leading-relaxed">
                Experience fast security response like never before with
                cutting-edge technology to keep you safe. This is iRES - Real
                Time, Real People, Real Protection
              </p>

              {/* Social Icons */}
              <div className="flex gap-3">
                {/* LinkedIn */}
                <Link
                  href="https://www.linkedin.com/company/iresorg/"
                  target="_blank"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Image
                    src="/icons/linkedin.svg"
                    alt="linkedin"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>

                {/* Instagram */}
                <Link
                  href="https://www.instagram.com/iresorgg/"
                  target="_blank"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Image
                    src="/icons/instagram.svg"
                    alt="instagram"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>

                {/* X / Twitter */}
                <Link
                  href="https://x.com/iRESorg?t=L-aamPkbfZi06TbjYsXfjA&s=09"
                  target="_blank"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Image
                    src="/icons/twitter.svg"
                    alt="twitter-x"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </Link>

                {/* YouTube */}
                <Link
                  href="https://www.youtube.com/@iresorg"
                  target="_blank"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform hover:scale-110"
                >
                  <Image
                    src="/icons/youtube.svg"
                    alt="youtube"
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
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Pricing Plans", href: "/pricing" },
                  { name: "Organizations", href: "/organization" },
                  { name: "Individuals", href: "/individual" },
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
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { name: "Our Services", href: "/services" },
                  { name: "FAQs", href: "/faq" },
                  { name: "Blogs", href: "/blog" },
                  { name: "Terms of Service & Conditions", href: "/terms" },
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

            {/* Contact Info */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h3 className="text-white font-bold text-lg">
                Contact Information
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/icons/location_on.svg"
                    alt="location"
                    width={20}
                    height={20}
                    className="w-5 h-5 mt-1"
                  />
                  <span className="text-white/80 text-sm">
                     Lagos, Nigeria.
                  </span>
                </div>

                {/* Updated Emails */}
                <div className="flex flex-col gap-2">
                  {[
                    "iresorgg@gmail.com",
                    "techsupport@iresorg.com",
                    "customersupport@iresorg.com",
                  ].map((email) => (
                    <div key={email} className="flex items-start gap-3">
                      <Image
                        src="/icons/mark_email_unread.svg"
                        alt="email"
                        width={20}
                        height={20}
                        className="w-5 h-5 mt-1"
                      />
                      <span className="text-white/80 text-sm">{email}</span>
                    </div>
                  ))}
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/icons/phone.svg"
                    alt="phone"
                    width={20}
                    height={20}
                    className="w-5 h-5 mt-1"
                  />
                  <span className="text-white/80 text-sm">
                    +234 810 000 0000
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-white/10 py-6 mt-10"
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
  );
}
