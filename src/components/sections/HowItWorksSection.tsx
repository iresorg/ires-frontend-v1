"use client";

import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0, 0, 1] as const },
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

const processSteps = [
  {
    step: "01",
    icon: "/icons/phone.svg",
    title: "Contact us",
    description: "Reach us instantly through our hotline or online form",
    highlight: "24/7",
  },
  {
    step: "02",
    icon: "/icons/laptop.svg",
    title: "We Investigate",
    description:
      "Our cyber responders analyze your incident & outline the best",
    highlight: "solution",
  },
  {
    step: "03",
    icon: "/icons/shield.svg",
    title: "We Take Action",
    description:
      "We contain threats, recover accounts, secure data and block",
    highlight: "attackers",
  },
  {
    step: "04",
    icon: "/icons/lock.svg",
    title: "Stay Protected",
    description: "We close the case, strengthen your defenses and give",
    highlight: "tips",
  },
];

const serviceCards = [
  {
    title: "SignUp",
    description:
      "Creating an account with us is your first step to experiencing protection.",
    buttonText: "Sign Up",
    buttonHref: undefined,
    icon: "/images/shield-checkmark.png",
  },
  {
    title: "Subscribe To A Plan",
    description:
      "Subscribe to a suitable and affordable plan to get help from us.",
    buttonText: "Explore Plans",
    buttonHref: "/pricing",
    icon: "/images/badge.png",
  },
  {
    title: "Call Hotline",
    description:
      "Put a call through our hotline, for all your cyber emergencies, we're available 24/7",
    buttonText: "Call Now",
    buttonHref: "tel:+1234567890",
    icon: "/images/call.png",
  },
  {
    title: "Stay Safe",
    description:
      "Our team resolves your emergencies, we continue to update you with tips to keep you protected",
    buttonText: "Sign Up",
    buttonHref: undefined,
    icon: "/images/guard.png",
  },
];

export default function HowItWorksSection() {
  return (
    <div className="relative w-full overflow-hidden py-14 lg:py-20">
      <div className="security-grid absolute inset-0 opacity-30 pointer-events-none" />

      <Section className="relative z-10">
        <motion.div
          className="space-y-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.div className="space-y-4 text-start" variants={itemVariants}>
            <SectionTitle
              logo="/logos/ires-logo.svg"
              logoAlt="iRES Logo"
              title="How It Works"
            />
            <h2 className="mt-2 text-lg font-light leading-tight text-white lg:mt-6 lg:text-2xl xl:text-3xl">
              <motion.span
                className="gradient-shift mr-2 inline-block bg-clip-text font-bold text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                }}
              >
                Learn
              </motion.span>
              how our system works
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
            variants={containerVariants}
          >
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative h-full">
                <motion.div
                  className="group relative flex h-full flex-col rounded-3xl p-6 text-center xl:p-8 brand-border"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(28,27,43,0.92) 0%, rgba(14,14,26,0.98) 100%)",
                  }}
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.28 },
                  }}
                >
                  <span
                    className="absolute left-4 top-4 text-xs font-semibold tracking-widest"
                    style={{ color: "var(--accent-color)" }}
                  >
                    {step.step}
                  </span>

                  <motion.div
                    className="mb-5 mt-2 flex justify-center"
                    variants={itemVariants}
                  >
                    <div className="relative flex h-14 w-14 items-center justify-center xl:h-16 xl:w-16">
                      <span className="absolute inset-0 rounded-full bg-[var(--accent-color)]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <Image
                        src={step.icon}
                        alt=""
                        width={40}
                        height={40}
                        className="relative z-10 h-10 w-10 xl:h-12 xl:w-12 object-contain"
                      />
                    </div>
                  </motion.div>

                  <h3 className="mb-3 text-lg font-bold text-white lg:text-xl">
                    {step.title}
                  </h3>

                  <p className="flex-1 text-sm leading-relaxed text-white/90 lg:text-base">
                    {step.description}{" "}
                    <span
                      className="font-bold bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, var(--accent-color), var(--accent-secondary-color))",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {step.highlight}
                    </span>
                    .
                  </p>
                </motion.div>

                {index < processSteps.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 -right-2.5 z-10 hidden -translate-y-1/2 lg:block"
                    variants={itemVariants}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ background: "var(--btn-bg)" }}
                    >
                      <svg
                        className="h-4 w-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div className="space-y-10" variants={containerVariants}>
            <motion.div className="space-y-4 text-start" variants={itemVariants}>
              <h2 className="mt-2 text-lg font-light leading-tight text-white lg:mt-6 lg:text-2xl xl:text-3xl">
                <motion.span
                  className="gradient-shift mr-2 inline-block bg-clip-text font-bold text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                  }}
                >
                  To Use
                </motion.span>
                Our Services
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
              variants={containerVariants}
            >
              {serviceCards.map((service) => (
                <motion.div
                  key={service.title}
                  className="group relative flex h-full flex-col rounded-3xl p-6 xl:p-8 brand-border"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(28,27,43,0.92) 0%, rgba(14,14,26,0.98) 100%)",
                  }}
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.28 },
                  }}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <Image
                      src={service.icon}
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  </div>

                  <h3
                    className="mb-4 text-lg font-bold lg:text-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent-secondary-color), var(--accent-color))",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p className="mb-6 flex-1 text-sm leading-relaxed text-white/90 lg:text-base">
                    {service.description}
                  </p>

                  <ServiceCardButton service={service} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>
    </div>
  );
}

function ServiceCardButton({
  service,
}: {
  service: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref?: string;
    icon: string;
  };
}) {
  const { handleSignUpNavigation, goToPricing } = useAuthNavigation();

  if (service.buttonText === "Sign Up") {
    return (
      <div className="mt-auto">
        <Button
          onClick={handleSignUpNavigation}
          className="w-full rounded-xl px-6 py-3 text-sm lg:text-base"
        >
          {service.buttonText}
        </Button>
      </div>
    );
  }

  if (service.buttonText === "Explore Plans") {
    return (
      <div className="mt-auto">
        <Button
          href={service.buttonHref}
          onClick={goToPricing}
          className="w-full rounded-xl px-6 py-3 text-sm lg:text-base"
        >
          {service.buttonText}
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-auto">
      <Button
        href={service.buttonHref}
        className="w-full rounded-xl px-6 py-3 text-sm lg:text-base"
      >
        {service.buttonText}
      </Button>
    </div>
  );
}
