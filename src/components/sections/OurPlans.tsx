"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

export default function OurPlans() {
  const plans = [
    {
      icon: "/images/Shield.png",
      title: "Business Shield",
      price: "₦80,000/month",
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
      price: "₦200,000/month",
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

      <Section className="relative z-10 py-16 lg:py-24">
        {/* Decorative Shapes */}
        <Image
          src="/images/earth.png"
          alt="Decorative shape"
          width={130}
          height={130}
          className="absolute top-0 left-0 -translate-x-1/3 opacity-70 pointer-events-none"
        />
        <Image
          src="/images/grid-cube.png"
          alt="Decorative shape"
          width={150}
          height={150}
          className="absolute bottom-0 right-0 translate-x-1/3 opacity-70 pointer-events-none"
        />

        {/* Section Title */}
        <div className="flex justify-center mb-16">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Our Plans for Organizations"
          />
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`w-full max-w-[360px] p-[1px] rounded-2xl 
                bg-gradient-to-r from-[#4185DD] to-[#B425DA]`}
            >
              <div className="h-full bg-[#0E0E11]/90 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between">
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
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent">
                      {plan.title}
                    </h3>
                  </div>

                  {/* Price & Subtitle */}
                  <p className="bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent text-xl font-semibold mb-1">
                    <i>{plan.price}</i>
                  </p>
                  <p className="text-[#b3b3b3] text-sm mb-6">{plan.subtitle}</p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <Image
                          src="/images/checkbox.png"
                          alt="Check icon"
                          width={18}
                          height={18}
                          className="mt-0.5"
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-5 py-2.5 rounded-full text-white text-sm font-medium bg-gradient-to-r from-[#4185DD] to-[#B425DA] shadow-lg cursor-pointer"
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
