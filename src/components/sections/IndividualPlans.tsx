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
      title: "Basic Shield",
      price: "₦50,000/month",
      subtitle: "For Everyday phone & social media users",
      features: [
        "Incident reporting via phone/email",
        "Social media account recovery",
        "Basic scam & fraud advisory",
        "Personal data privacy checks",
        "1 cyber incident resolution / month",
        "24–48 hrs response time",
      ],
    },
    {
      icon: "/images/guard.png",
      title: "Safe Guard",
      price: "₦80,000/month",
      subtitle: "For Freelancers, small-scale sellers, influencers",
      features: [
        "Priority incident handling",
        "Malware & spyware removal",
        "Payment fraud investigation",
        "Social media & email breach recovery",
        "Data loss prevention tips",
        "Up to 2 incidents resolved / month",
        "12–24 hrs response time",
      ],
    },
    {
      icon: "/images/fortress.png",
      title: "Total Lockdown",
      price: "₦100,000/month",
      subtitle: "For High-risk individuals, public figures, executives",
      features: [
        "24/7 priority access",
        "Advanced account monitoring",
        "Comprehensive breach investigation",
        "Device security optimization",
        "Data recovery support",
        "3 incidents resolution / month",
        "4–6 hrs response time",
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
                    <i>{plan.price}</i>
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
