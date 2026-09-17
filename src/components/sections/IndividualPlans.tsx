"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

export default function OurPlans() {
  const { handleSubscribeNavigation } = useAuthNavigation();
  const plans = [
    {
      icon: "/images/Shield.png",
      title: "Individual Protection",
      subtitle: "Individuals facing personal cyber attacks or online harassment",
      features: [
        "24/7 emergency hotline access ",
        "Confidential consultation and triage ",
        "Full incident response for personal threats ",
        "Account recovery services ",
        "Identity theft investigation ",
        "Privacy breach remediation ",
        "Evidence documentation for legal action ",
        "Law enforcement coordination",
      ],
    },
    {
      icon: "/images/guard.png",
      title: "One-Off Plan",
      subtitle: "Designed for individuals and small businesses who need immediate assistance for a single incident or threat (common cases include social media account compromise). We recover hacked social media accounts.",
      features: [
        "Immediate response to a single incident ",
        "Social media account recovery and security hardening ",
        "Investigation of online harassment or threats ",
        "Guidance on preventing future incidents ",
        "Documentation for potential legal action ",
        "Coordination with law enforcement if necessary",
      ],
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      <Section className="relative z-10 py-8 lg:py-12 px-4 sm:px-6 lg:px-12">
        {/* Decorative Shape with Bounce */}
        <motion.div
          className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 opacity-70 pointer-events-none w-24 h-24 lg:w-32 lg:h-32"
          animate={{ y: [0, -20, 0] }}
          transition={{
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src="/images/cube.png"
            alt="Decorative shape"
            width={100}
            height={100}

          />
        </motion.div>

        {/* Section Title */}
        <div className="flex justify-center mb-16">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Our Plans for Individuals"
          />
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 justify-items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-sm sm:max-w-xs lg:max-w-full p-px rounded-2xl bg-linear-to-r from-[#4185DD] to-[#B425DA]"
            >
              <div className="h-full bg-[#0E0E11]/90 backdrop-blur-md rounded-2xl p-6 xl:p-8 flex flex-col justify-between">
                <div>
                  {/* Header with Icon */}
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src={plan.icon}
                      alt={`${plan.title} Icon`}
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                    <h3 className="text-lg sm:text-xl font-semibold  bg-linear-to-r from-[#28292a] to-[#B425DA] bg-clip-text text-transparent">
                      {plan.title}
                    </h3>
                  </div>

                  {/* Price & Subtitle */}
                  <p className=" bg-linear-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent text-lg sm:text-xl font-semibold mb-1">
                  </p>
                  <p className="text-[#b3b3b3] text-sm sm:text-base mb-6">
                    {plan.subtitle}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 sm:space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 sm:gap-3 text-white/90"
                      >
                        <Image
                          src="/images/checkbox.png"
                          alt="Check icon"
                          width={16}
                          height={16}
                          className="mt-1 sm:mt-0.5"
                        />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubscribeNavigation}
                  className="mt-6 sm:mt-8 px-4 sm:px-5 py-2.5 rounded-full text-white text-sm sm:text-base font-medium bg-linear-to-r from-[#4185DD] to-[#B425DA] shadow-lg cursor-pointer w-full"
                >
                  Choose Plan
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
