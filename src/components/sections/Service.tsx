"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function OurServices() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const services = [
    "24/7 Advanced Network Security and Threat Monitoring",
    "Proactive Threat Detection & Incident Response",
    "Managed Security Services for Complete Protection",
    "Data Encryption & Backup Management Solutions",
    "Cyber Risk Assessment & Compliance Solutions",
    "Ransomware Protection & Recovery Services Expertise",
  ];

  const details = [
    {
      title: services[0],
      overview:
        "Security never sleeps, and neither do we. We provide continuous surveillance of your entire digital ecosystem to identify suspicious activity the moment it happens.",
      features: [
        "Real-Time Alerts: Immediate notifications for any anomalies or unauthorized access attempts.",
        "SIEM Integration: Advanced logging and correlation of events across all devices to spot complex patterns.",
        "Always-On Eyes: Our Security Operations Center (SOC) watches your network nights, weekends, and holidays.",
      ],
      why: "Attacks can happen at 3 AM. We ensure there is always a human and algorithmic shield guarding your infrastructure, drastically reducing the time between breach and detection.",
    },
    {
      title: services[1],
      overview:
        "Don't wait for an attack to happen. We actively hunt for hidden threats within your network and neutralize them before they can cause damage.",
      features: [
        "Threat Hunting: Using AI and behavioral analysis to find threats that evade standard firewalls.",
        "Rapid Containment: Instant isolation of infected devices to prevent the spread of malware.",
        "Forensics & Root Cause: We don’t just stop the attack; we figure out exactly how they got in so it never happens again.",
      ],
      why: "Average breach detection time is often months. We cut that down to minutes, minimizing downtime, data loss, and reputational damage.",
    },
    {
      title: services[2],
      overview:
        "Think of us as your outsourced Chief Information Security Officer (CISO). We handle the complexity of your entire security posture so you can focus on running your business.",
      features: [
        "End-to-End Management: We manage firewalls, antivirus, patches, and user access policies.",
        "Cost Efficiency: Access enterprise-grade security tools and expertise at a fraction of the cost of an in-house team.",
        "Strategic Planning: Regular reports and roadmaps to improve your security maturity over time.",
      ],
      why: "Eliminate the talent gap. You get a team of veteran experts managing your security stack 24/7/365 without the overhead of hiring and training internal staff.",
    },
    {
      title: services[3],
      overview:
        "Your data is your most valuable asset. We render it unreadable to hackers and ensure you have an indestructible copy stored safely away.",
      features: [
        "AES-256 Encryption: Military-grade encryption protects your data both at rest and in transit.",
        "Immutable Backups: Backups that cannot be altered or deleted by ransomware or malicious insiders.",
        "Disaster Recovery: A clear, tested plan to restore your data quickly in the event of a catastrophe.",
      ],
      why: "Even if a hacker steals your files, they can’t read them. And if they delete them, we can restore them. It’s the ultimate fail-safe for business continuity.",
    },
    {
      title: services[4],
      overview:
        "Navigate the complex world of regulations with ease. We identify gaps in your security and help you meet industry standards like GDPR, HIPAA, PCI-DSS, and NIST.",
      features: [
        "Vulnerability Scanning: Automated scans to find software bugs, weak passwords, and misconfigurations.",
        "Gap Analysis: A detailed report showing exactly where your security is versus where it needs to be.",
        "Audit Preparation: We organize your documentation and controls to ensure you pass external audits with ease.",
      ],
      why: "Avoid heavy fines and legal liabilities while proving to clients and partners that you take their data privacy seriously.",
    },
    {
      title: services[5],
      overview:
        "Ransomware is the #1 threat to modern businesses. Our multi-layered defense stops encryption attacks and guarantees you never have to pay a ransom.",
      features: [
        "Behavioral Blocking: Detects unauthorized file encryption and stops it instantly.",
        "Endpoint Defense: Hardening servers and workstations against common entry vectors like phishing.",
        "Negotiation & Recovery: In worst-case scenarios, we handle recovery and incident management.",
      ],
      why: "Paying a ransom doesn’t guarantee your data back. Our protection ensures you're never held hostage by cybercriminals.",
    },
  ];

  return (
    <>
      <section className="relative w-full py-16 lg:py-24 overflow-hidden">
        {/* Background overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: "var(--bg-c)",
            backgroundImage: "var(--bg-shape)",
          }}
        />

        {/* EARTH FLOATING */}
        <motion.div
          className="absolute -top-10 -left-10 z-0"
          animate={{ y: [0, -15, 0] }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <Image
            src="/images/earth.png"
            alt="Decorative Shape"
            width={130}
            height={130}
            className="opacity-80"
          />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 lg:px-12">
          {/* Title */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center items-center mb-12"
          >
            <Image
              src="/logos/ires-logo.svg"
              alt="iRES Logo"
              width={30}
              height={30}
              className="mr-2"
            />
            <h2 className="text-white text-lg md:text-xl font-semibold">
              Our Services
            </h2>
          </motion.div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative rounded-2xl overflow-hidden hover:scale-[1.03] transition-transform duration-300 "
                  >
                    {/* Gradient border */}
                    <div className="absolute inset-0 rounded-2xl p-[3px] bg-gradient-to-r from-[#4185DD] to-[#601474] blur-[1px]" />

                    <div className="relative rounded-2xl bg-[#13131A]/90 backdrop-blur-sm p-6 text-center border border-[#ffffff10]">
                      <p className="text-white text-sm font-medium mb-4 min-h-[48px]">
                        {service}
                      </p>

                      <button
                        onClick={() => setSelectedIndex(i)}
                        className="px-5 py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-[#4185DD] to-[#B425DA] hover:opacity-90 transition cursor-pointer"
                      >
                        More Info
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* PLAY BUTTON */}
              <motion.button
                className="mt-10 w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "var(--accent-secondary-color)" }}
                aria-label="Play video"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 25px rgba(180, 37, 218, 0.5)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                }}
              >
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  }}
                >
                  <PlayIcon className="w-6 h-6 text-white" />
                </motion.div>
              </motion.button>
            </div>

            {/* RIGHT IMAGE AREA */}
            <motion.div
              className="lg:col-span-6 relative w-full flex justify-center lg:justify-end"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -30, 0] }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/ellipse.png"
                  alt="Background Ellipse"
                  width={440}
                  height={440}
                  className="w-80 h-80 lg:w-[440px] lg:h-[440px] opacity-80"
                />
              </motion.div>

              <motion.div
                className="relative z-10"
                animate={{ y: [0, -20, 0] }}
                transition={{
                  y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Image
                  src="/images/cyberman.png"
                  alt="Service Illustration"
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== MODAL ===================== */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#0F0F15] max-w-lg w-full rounded-2xl p-6 border border-white/10 text-white shadow-xl overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent">
              {details[selectedIndex].title}
            </h2>

            <p className="text-white/80 text-sm mb-4">
              <strong>Overview:</strong> {details[selectedIndex].overview}
            </p>

            <h3 className="font-semibold mt-4 mb-2">Key Features</h3>
            <ul className="list-disc ml-5 text-white/80 text-sm space-y-1">
              {details[selectedIndex].features.map((f, k) => (
                <li key={k}>{f}</li>
              ))}
            </ul>

            <p className="text-white/80 text-sm mt-4">
              <strong>Why You Need It:</strong> {details[selectedIndex].why}
            </p>

            <button
              onClick={() => setSelectedIndex(null)}
              className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-[#4185DD] to-[#B425DA] text-white font-medium hover:opacity-90 transition cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
