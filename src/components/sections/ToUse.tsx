"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.2, 0, 0, 1] as const },
  },
};

export default function ToUseServices() {
  const { handleSignUpNavigation, goToPricing } = useAuthNavigation();

  const steps = [
    {
      title: "Sign Up",
      text: "Creating an account with us is your first step to experiencing protection.",
      button: "Sign Up",
    },
    {
      title: "Subscribe To A Plan",
      text: "Subscribe to a suitable and affordable plan to get help.",
      button: "Explore Plans",
    },
    {
      title: "Call Hotline",
      text: "Put a call through our hotline for all your cyber emergencies we’re available 24/7.",
      button: "Call Now",
    },
    {
      title: "Stay Safe",
      text: "Our team resolves your emergencies and keeps you updated with safety tips.",
      button: "Sign Up",
    },
  ];

  return (
    <section className="relative w-full py-14 lg:py-20 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />
      <div className="security-grid absolute inset-0 opacity-30 pointer-events-none" />

      <motion.div
        className="absolute top-0 right-0 z-0 float-y"
        animate={{ y: [0, -20, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        <Image
          src="/images/eclipes.png"
          alt="Decorative Shape"
          width={100}
          height={100}
          className="opacity-80"
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-lg md:text-xl lg:text-2xl font-light text-white leading-tight">
            <span
              className="gradient-shift mr-2 inline-block bg-clip-text font-bold text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
              }}
            >
              To Use
            </span>
            Our Services
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={`${step.title}-${index}`}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.28 } }}
              className="group relative flex h-full flex-col rounded-3xl p-6 brand-border"
              style={{
                background:
                  "linear-gradient(160deg, rgba(28,27,43,0.92) 0%, rgba(14,14,26,0.98) 100%) padding-box, linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color)) border-box",
              }}
            >
              <div className="flex flex-col justify-between h-full min-h-[220px] text-center">
                <div>
                  <h3
                    className="font-semibold text-base mb-3 bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--accent-secondary-color), var(--accent-color))",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-white/90 text-sm mb-5 leading-relaxed">
                    {step.text}
                  </p>
                </div>

                <button
                  className="px-5 py-2 rounded-xl text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
                  style={{ background: "var(--btn-bg)" }}
                  onClick={() => {
                    if (step.button === "Sign Up") {
                      handleSignUpNavigation();
                      return;
                    }

                    if (step.button === "Explore Plans") {
                      goToPricing();
                      return;
                    }

                    if (step.button === "Call Now") {
                      window.location.href = "tel:+1234567890";
                      return;
                    }
                  }}
                >
                  {step.button}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
