"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
};

export default function ContactUsSection() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <div className="relative w-full py-12 lg:py-16">
      {/* Background Shape */}
      <motion.div
        className="absolute -bottom-10 right-0 w-40 h-40 lg:w-52 lg:h-52 z-0"
        variants={shapeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        animate={{ y: [0, -20, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Image
          src="/shapes/section-bg-shape-1.svg"
          alt="Background shape"
          width={320}
          height={320}
          className="w-full h-full opacity-60"
        />
      </motion.div>

      <Section className="relative z-10">
        <motion.div
          className="w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Card */}
          <motion.div
            className="relative p-6 sm:p-8 lg:p-12 rounded-3xl border border-transparent bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(var(--bg-color), var(--bg-color)) padding-box, linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color)) border-box",
              border: "1px solid transparent",
            }}
            variants={cardVariants}
          >
            {/* Section Title */}
            <motion.div
              className="text-center mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <SectionTitle
                logo="/logos/ires-logo.svg"
                logoAlt="iRES Logo"
                title="Contact Us"
              />
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="text-center mb-6 sm:mb-8"
              variants={itemVariants}
            >
              <h2 className="text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-2 sm:mb-4">
                We&apos;re Just a{" "}
                <motion.span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, var(--accent-secondary-color), var(--accent-color))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  click away
                </motion.span>
              </h2>
              <p className="text-white/90 text-xs sm:text-sm lg:text-base leading-relaxed">
                Want to learn more about our services or need immediate
                assistance? Connect with us
              </p>
            </motion.div>

            {/* Feature Items */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Dedicated Support Team",
                "Fast and Reliable Assistance",
                "Multiple Ways to Reach Us",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3"
                  variants={itemVariants}
                >
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))",
                    }}
                  >
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-xs sm:text-sm lg:text-base">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Info and Newsletter */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Contact Information */}
              <motion.div
                className="space-y-4 sm:space-y-6 lg:col-span-4"
                variants={itemVariants}
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-4">
                  Get in Touch
                </h3>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                    <Image
                      src="/icons/phone.svg"
                      alt="Phone icon"
                      width={20}
                      height={20}
                      className="w-4 sm:w-5 h-4 sm:h-5"
                    />
                  </div>
                  <span className="text-white text-xs sm:text-sm lg:text-base">
                    +234 810 000 0000
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                    <Image
                      src="/icons/mark_email_unread.svg"
                      alt="Email icon"
                      width={20}
                      height={20}
                      className="w-4 sm:w-5 h-4 sm:h-5"
                    />
                  </div>
                  <span className="text-white text-xs sm:text-sm lg:text-base">
                    iresorg@gmail.com
                  </span>
                </div>
              </motion.div>

              {/* Newsletter Subscription */}
              <motion.div
                className="space-y-3 sm:space-y-4 lg:col-span-8"
                variants={itemVariants}
              >
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-4">
                  Stay Updated
                </h3>
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
                    required
                  />
                  <Button
                    onClick={() =>
                      handleNewsletterSubmit(new Event("submit") as never)
                    }
                    className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm lg:text-base rounded-xl whitespace-nowrap"
                  >
                    Subscribe to Our Newsletter
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}
