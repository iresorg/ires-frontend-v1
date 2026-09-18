"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

export default function GetStartedSection() {
  const cards = [
    {
      title: "Free Quick Guide",
      text: "Download a step-by-step security starter kit.",
      btnText: "Download",
    },
    {
      title: "Easy SignUp",
      text: "Create an account in minutes and choose a plan for you.",
      btnText: "Sign Up",
    },
    {
      title: "Explore Plans",
      text: "Explore and subscribe to a suitable affordable plan for you.",
      btnText: "Explore Plans",
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />
      <div className="security-grid absolute inset-0 opacity-30 pointer-events-none" />

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
          src="/images/cube.png"
          alt="Decorative sphere"
          width={130}
          height={130}
          className="absolute top-0 right-0 translate-x-[10px] translate-y-[-10px] opacity-80 pointer-events-none"
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="flex justify-center mb-12">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Get Started – Protect Your Digital Life Today"
          />
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mx-auto rounded-[24px] max-w-5xl w-full p-6 md:p-10 glass-panel brand-border"
        >
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base mb-12"
          >
            Don’t wait until it’s too late. Whether you’re tech-savvy
            <br /> or just getting started, our plans fit your lifestyle.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.28 } }}
                className="relative w-full sm:max-w-xs md:max-w-full rounded-[20px] p-6 h-full text-center flex flex-col justify-between glass-panel brand-border"
              >
                <div>
                  <h3
                    className="font-semibold text-base md:text-lg mb-2 bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-white text-xs md:text-sm mb-4">
                    {card.text}
                  </p>
                </div>

                {card.btnText === "Sign Up" ? (
                  <Link
                    href="/signup"
                    className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition cursor-pointer mt-auto inline-block"
                    style={{ background: "var(--btn-bg)" }}
                  >
                    {card.btnText}
                  </Link>
                ) : card.btnText === "Explore Plans" ? (
                  <Link
                    href="/pricing"
                    className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition cursor-pointer mt-auto inline-block"
                    style={{ background: "var(--btn-bg)" }}
                  >
                    {card.btnText}
                  </Link>
                ) : (
                  <Link
                    href="/downloads/quick-guide.pdf"
                    download
                    className="px-6 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition cursor-pointer mt-auto inline-block"
                    style={{ background: "var(--btn-bg)" }}
                  >
                    {card.btnText}
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-6 lg:mt-0 flex justify-center lg:justify-end lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-[-2rem]">
          <Button
            href="tel:+1234567890"
            className="flex items-center gap-2 px-6 py-2 text-sm"
          >
            <div className="relative w-6 h-6 rounded-full flex items-center justify-center">
              <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]" />
              <Image
                src="/images/call.png"
                alt="Call Icon"
                width={18}
                height={18}
                className="relative z-10"
              />
            </div>
            Call Now
          </Button>
        </div>
      </div>
    </section>
  );
}
