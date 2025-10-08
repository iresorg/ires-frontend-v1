"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";

export default function OurPlans() {
  const plans = [
    {
      icon: "/images/shield-icon.png", 
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
      buttonColor: "from-[#4185DD] to-[#B425DA]",
    },
    {
      icon: "/images/guard-icon.png",
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
      buttonColor: "from-[#4185DD] to-[#B425DA]",
    },
    {
      icon: "/images/fortress-icon.png",
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
      buttonColor: "from-[#4185DD] to-[#B425DA]",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background same as WhyWeExist */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "var(--bg-c)",
          backgroundImage: "var(--bg-shape)",
        }}
      />

      <section className="relative z-10 py-24">
        {/* Decorative shapes */}
        <Image
          src="/images/earth.png"
          alt="Decorative shape"
          width={130}
          height={130}
          className="absolute top-[-40px] left-[-40px] opacity-70"
        />
        <Image
          src="/images/grid-cube.png"
          alt="Decorative shape"
          width={150}
          height={150}
          className="absolute bottom-[-40px] right-[-40px] opacity-70"
        />

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="flex justify-center mb-12">
            <SectionTitle
              logo="/logos/ires-logo.svg"
              logoAlt="iRES Logo"
              title="Our Plans for Organizations "
            />
          </div>
        </div>
        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0 relative z-10">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-b from-[#1A1A1D] to-[#111112] border border-[#ffffff0a] rounded-2xl p-[1px] hover:border-[#B425DA]/50 transition-all"
            >
              <div className="h-full bg-[#0E0E11]/90 rounded-2xl p-8 flex flex-col justify-between">
                <div>
                  {/* Title with icon image */}
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src={plan.icon}
                      alt={`${plan.title} Icon`}
                      width={22}
                      height={22}
                    />
                    <h3 className="text-[#B425DA] font-semibold text-lg">
                      {plan.title}
                    </h3>
                  </div>

                  <p className="text-white text-xl font-semibold mb-1">
                    {plan.price}
                  </p>
                  <p className="text-[#b3b3b3] text-sm mb-6">{plan.subtitle}</p>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <Image
                          src="/images/check.png"
                          alt="Check"
                          width={18}
                          height={18}
                          className="mt-0.5"
                        />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`mt-8 px-5 py-2.5 rounded-full bg-gradient-to-r ${plan.buttonColor} text-white text-sm font-medium`}
                >
                  Choose Plan
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
