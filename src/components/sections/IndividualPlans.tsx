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
      title: "Basic Shield",
      price: "₦15,000/month",
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
      price: "₦30,000/month",
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
      price: "₦50,000/month",
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

      <Section className="relative z-10 py-16 lg:py-24">
        {/* Decorative Shape */}
        <Image
          src="/images/cube.png"
          alt="Decorative shape"
          width={120}
          height={120}
          className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 opacity-70 pointer-events-none"
        />

        {/* Section Title */}
        <div className="flex justify-center mb-16">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Our Plans for Individuals"
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
              className="w-full max-w-[360px] p-[1px] rounded-2xl border border-transparent bg-clip-padding [border-image:linear-gradient(to_right,#4185dd,#b425da)_1] hover:shadow-[0_0_20px_rgba(180,37,218,0.2)] transition-all"
            >
              <div className="h-full bg-black/20 backdrop-blur-sm rounded-2xl p-8 flex flex-col justify-between">
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
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-[#4185dd] to-[#b425da] bg-clip-text text-transparent">
                      {plan.title}
                    </h3>
                  </div>

                  {/* Price & Subtitle */}
                  <p className="bg-gradient-to-r from-[#4185dd] to-[#b425da] bg-clip-text text-transparent text-xl font-semibold mb-1">
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
                  className="mt-8 px-5 py-2.5 rounded-full text-white text-sm font-medium bg-gradient-to-r from-[#4185DD] to-[#B425DA] shadow-lg"
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
