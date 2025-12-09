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

const shapeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};

export default function OurPlans() {
  const { handleSubscribeNavigation } = useAuthNavigation();
  const plans = [
    {
      icon: "/images/Shield.png",
      title: "Business Shield",
      price: "₦150,000/month",
      subtitle: "For Small businesses (1–10 staff)",
      features: [
        "Incident reporting hotline",
        "Phishing & scam prevention",
        "Basic ransomware & malware response",
        "Website & email breach recovery",
        "2 cyber incident resolution / month",
        "24–48 hrs response time",
      ],
    },
    {
      icon: "/images/guard.png",
      title: "Enterprise Guard",
      price: "₦250,000/month",
      subtitle: "For Medium-sized businesses (11–50 staff)",
      features: [
        "Dedicated account manager",
        "Network intrusion detection",
        "Ransomware containment & removal",
        "DDoS attack mitigation",
        "Payment system compromise investigation",
        "Up to 5 incidents resolved / month",
        "12–24 hrs response time",
      ],
    },
    {
      icon: "/images/fortress.png",
      title: "Corporate Fortress",
      price: "₦500,000/month",
      subtitle: "For Large corporations & critical sectors",
      features: [
        "24/7 SOC (Security Operations Center) support",
        "Onsite & remote incident response",
        "Insider threat detection",
        "Advanced threat hunting & forensics",
        "Unlimited incidents / month",
        "SLA: under 4 hrs response time",
      ],
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      <Section className="relative z-10 py-16 lg:py-24 px-4 sm:px-6 lg:px-12">
        {/* Decorative Shapes with Bounce */}
        <motion.div
          className="absolute top-0 left-0 -translate-x-1/3 opacity-70 pointer-events-none w-32 h-32 lg:w-40 lg:h-40"
          variants={shapeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate={{ y: [0, -20, 0] }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src="/images/earth.png"
            alt="Decorative shape"
            width={130}
            height={130}

          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0 translate-x-1/3 opacity-70 pointer-events-none w-36 h-36 lg:w-44 lg:h-44"
          variants={shapeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          animate={{ y: [0, 15, 0] }}
          transition={{
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src="/images/grid-cube.png"
            alt="Decorative shape"
            width={150}
            height={150}
            className="w-full h-full"
          />
        </motion.div>

        {/* Section Title */}
        <div className="flex justify-center mb-12">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Our Plans for Organizations"
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
              className="w-full max-w-sm sm:max-w-xs lg:max-w-full p-px rounded-2xl  bg-linear-to-r from-[#4185DD] to-[#B425DA]"
            >
              <div className="h-full bg-[#0E0E11]/90 backdrop-blur-md rounded-2xl p-6 xl:p-8 flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-4">
                    <Image
                      src={plan.icon}
                      alt={`${plan.title} Icon`}
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                    <h3 className="text-lg sm:text-xl font-semibold  bg-linear-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent">
                      {plan.title}
                    </h3>
                  </div>

                  {/* Price & Subtitle */}
                  <p className=" bg-linear-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent text-lg sm:text-xl font-semibold mb-1">
                    <i>{plan.price}</i>
                  </p>
                  <p className="text-[#b3b3b3] text-xs sm:text-sm mb-6">
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
                  className="mt-6 sm:mt-8 px-4 sm:px-5 py-2.5 rounded-full text-white text-sm sm:text-base font-medium  bg-linear-to-r from-[#4185DD] to-[#B425DA] shadow-lg cursor-pointer"
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
