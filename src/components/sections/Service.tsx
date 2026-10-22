"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type ServiceIconName = "shield" | "headset" | "scan" | "briefcase";

type Offering = {
  id: string;
  name: string;
  summary: string;
  icon: ServiceIconName;
  eyebrow: string;
  title: string;
  tagline: string;
  paragraphs: string[];
  listTitle: string;
  items: string[];
  objective?: string;
  followTitle?: string;
  followParagraphs?: string[];
  followItems?: string[];
  ctaNote?: string;
  ctaLabel: string;
};

const offerings: Offering[] = [
  {
    id: "soc",
    name: "iRES SOC",
    summary: "Detect and monitor",
    icon: "shield",
    eyebrow: "iRES SOC",
    title: "Continuous Cybersecurity Monitoring and Threat Detection",
    tagline: "See threats sooner. Respond with confidence.",
    paragraphs: [
      "iRES SOC helps organisations improve their ability to detect, analyse and respond to suspicious activities across their digital environments. Through continuous security monitoring, threat detection, incident analysis and structured escalation, we help security teams identify potential threats and make informed decisions.",
    ],
    listTitle: "Our capabilities include",
    items: [
      "Security monitoring and threat detection.",
      "Security alert triage and analysis.",
      "Threat intelligence and threat hunting, where included.",
      "Incident escalation and response coordination.",
      "Security dashboards, reporting and improvement recommendations.",
    ],
    ctaNote:
      "Request an iRES SOC Assessment and discover how to strengthen your organisation's cyber defence.",
    ctaLabel: "Request an iRES SOC Assessment",
  },
  {
    id: "response",
    name: "iRES 24/7",
    summary: "Coordinate response",
    icon: "headset",
    eyebrow: "iRES 24/7",
    title: "24/7 Cyber Incident Response Platform",
    tagline: "When a cyber incident strikes, know what to do next.",
    paragraphs: [
      "The iRES 24/7 Cyber Incident Response Platform provides an organised way to report, classify, track and coordinate cyber incidents. It brings incident reporting, case management, response playbooks, escalation workflows and stakeholder communication into a structured response process.",
      "Designed for organisations that need a clearer, more accountable approach to cyber incident management, iRES helps connect the right people, information and actions when they are needed most.",
    ],
    listTitle: "Our capabilities include",
    items: [
      "24/7 cyber incident reporting channel.",
      "Secure incident registration and case tracking.",
      "Incident triage and severity classification.",
      "Ransomware, data breach, BEC and malware response workflows.",
      "Incident Commander and stakeholder escalation processes.",
      "Executive incident dashboards and SLA monitoring.",
    ],
    objective:
      "Help organisations respond in a more organised, timely and accountable manner when cyber incidents occur.",
    ctaNote:
      "Register your organisation for iRES Cyber Incident Response Services and establish your cyber incident escalation pathway before you need it.",
    ctaLabel: "Register for incident response",
  },
  {
    id: "forensics",
    name: "iRES Forensics",
    summary: "Investigate incidents",
    icon: "scan",
    eyebrow: "iRES Forensics",
    title: "Forensics and Digital Investigation Service",
    tagline: "Uncover the evidence. Establish the facts.",
    paragraphs: [
      "The iRES Forensics and Digital Investigation Service provides specialist technical investigation to help organisations examine digital evidence, reconstruct incident timelines and develop a clearer understanding of suspected cyber incidents and digital misconduct.",
      "Our approach emphasises evidence integrity, documented investigative procedures, objective analysis and clear reporting.",
    ],
    listTitle: "Our capabilities include",
    items: [
      "Digital evidence acquisition and preservation.",
      "Cyber incident timeline reconstruction.",
      "Malware and ransomware investigation.",
      "Endpoint, network and log analysis.",
      "Investigation of suspected insider threats and unauthorised activity.",
      "Forensic findings, technical reporting and remediation recommendations.",
    ],
    objective:
      "Help organisations establish the facts, understand the impact of an incident and make better-informed decisions.",
    ctaNote:
      "Engage iRES for a confidential discussion about your digital investigation requirements.",
    ctaLabel: "Start a confidential discussion",
  },
  {
    id: "ciso",
    name: "iRES CISO-as-a-Service",
    summary: "Strategic oversight",
    icon: "briefcase",
    eyebrow: "Standalone offering",
    title: "iRES CISO-as-a-Service",
    tagline: "Executive cybersecurity leadership. Without the full-time cost.",
    paragraphs: [
      "iRES CISO-as-a-Service (CISOaaS) provides organisations with access to experienced cybersecurity leadership without the cost of employing a full-time Chief Information Security Officer (CISO).",
      "We work with your management team to develop cybersecurity strategies, identify and manage risks, strengthen security controls, oversee compliance activities and prepare your organisation to respond effectively to cyber incidents.",
    ],
    listTitle: "What we do",
    items: [
      "Cybersecurity strategy and governance: develop and oversee a cybersecurity strategy aligned with your business objectives, risk appetite and operational priorities.",
      "Cyber risk management: identify critical cyber risks, assess potential business impacts and establish practical measures to manage them.",
      "Regulatory compliance and assurance: support compliance with applicable regulatory requirements, industry standards and information security frameworks.",
      "Security policies and controls: develop and review information security policies, procedures and control frameworks.",
      "Security operations oversight: provide strategic oversight of security monitoring, vulnerability management, threat detection and remediation activities.",
      "Incident response and business continuity: establish incident response plans, coordinate readiness exercises and help management prepare for cyber crises.",
      "Executive and board reporting: translate technical security issues into clear business risks, actionable recommendations and performance reports.",
      "Third-party and technology risk: assess cybersecurity risks associated with vendors, service providers, technology investments and digital transformation initiatives.",
    ],
    followTitle: "Why choose iRES CISO-as-a-Service?",
    followParagraphs: [
      "With iRES, your organisation gains access to cybersecurity leadership tailored to its needs and budget. We help you make informed security investments, establish clear accountability, improve risk visibility and build a sustainable cybersecurity programme.",
    ],
    ctaLabel: "Talk to us about CISO-as-a-Service",
  },
];

const cardSurface = {
  background:
    "linear-gradient(#2a2740, #2a2740) padding-box, linear-gradient(135deg, #4185dd, #b425da) border-box",
};

const companions = [
  {
    id: "soc",
    label: "iRES SOC — security monitoring and threat detection.",
  },
  {
    id: "response",
    label: "iRES 24/7 Cyber Incident Response Platform — incident reporting, escalation and response coordination.",
  },
  {
    id: "forensics",
    label: "iRES Forensics and Digital Investigation — digital evidence analysis and investigation of cyber incidents.",
  },
];

function ServiceIcon({ name }: { name: ServiceIconName }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true as const,
  };

  if (name === "briefcase") {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3 5 6v6c0 4.2 2.8 7.4 7 9 4.2-1.6 7-4.8 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (name === "headset") {
    return (
      <svg {...common}>
        <path d="M4 13a8 8 0 0 1 16 0" />
        <path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2Z" />
        <path d="M20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2Z" />
        <path d="M18 19a4 4 0 0 1-4 2h-2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
      <path d="M11 8v3l2 1" />
    </svg>
  );
}

function CapabilityList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/75">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-color)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ServiceDetail({ service, titleId }: { service: Offering; titleId: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-secondary-color)]">
        {service.eyebrow}
      </p>
      <h3 id={titleId} className="mt-3 text-2xl font-semibold text-white">{service.title}</h3>
      <p className="mt-3 text-base text-white/90">{service.tagline}</p>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/70">
        {service.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <h4 className="mt-6 text-sm font-semibold text-white">{service.listTitle}</h4>
      <CapabilityList items={service.items} />
      {service.objective ? (
        <p className="mt-6 text-sm leading-relaxed text-white/70">
          <span className="font-semibold text-white">Our objective: </span>
          {service.objective}
        </p>
      ) : null}
      {service.followTitle ? (
        <h4 className="mt-8 text-sm font-semibold text-white">{service.followTitle}</h4>
      ) : null}
      {service.followParagraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-relaxed text-white/70">
          {paragraph}
        </p>
      ))}
      {service.followItems ? <CapabilityList items={service.followItems} /> : null}
      {service.ctaNote ? (
        <p className="mt-6 text-sm leading-relaxed text-white/70">{service.ctaNote}</p>
      ) : null}
      <Link
        href="/contact"
        className="mt-4 inline-flex cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white"
        style={{ background: "var(--btn-bg)" }}
      >
        {service.ctaLabel}
      </Link>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLarge(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isLarge;
}

function ServiceOverlay({
  service,
  isLarge,
  onClose,
}: {
  service: Offering;
  isLarge: boolean;
  onClose: () => void;
}) {
  const titleId = "service-detail-title";

  if (isLarge) {
    return (
      <motion.div
        className="fixed inset-0 z-[220] flex items-center justify-center bg-[#0b0b16]/80 px-6 py-10 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="brand-border flex max-h-[min(82vh,760px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl shadow-2xl"
          style={cardSurface}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
            <p className="text-sm font-semibold text-white">{service.name}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
            <ServiceDetail service={service} titleId={titleId} />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[220] flex flex-col"
      style={{ background: "linear-gradient(180deg, #243056 0%, #1c1b2b 34%, #2a1838 100%)" }}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-4 py-4">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M15 6 9 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-white">{service.name}</p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
        <ServiceDetail service={service} titleId={titleId} />
      </div>
    </motion.div>
  );
}

export default function OurServices() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const isLarge = useIsLargeScreen();
  const active = offerings.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="relative w-full overflow-hidden py-14 lg:py-20">
      <div className="security-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((item) => {
            const selected = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                aria-haspopup="dialog"
                className={`brand-border group flex h-full min-h-[220px] cursor-pointer flex-col items-center rounded-3xl px-5 py-6 text-center transition hover:-translate-y-1 ${
                  selected ? "ring-2 ring-white/80" : ""
                }`}
                style={cardSurface}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <ServiceIcon name={item.icon} />
                </span>
                <p className="mt-4 text-base font-semibold leading-snug text-white">{item.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white">{item.summary}</p>
                <p className="mt-auto pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#9ec5ff]">
                  View details
                </p>
              </button>
            );
          })}
        </div>

        <div className="brand-border mt-14 rounded-3xl px-6 py-8 sm:px-8" style={cardSurface}>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            CISOaaS stands on its own
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white sm:text-base">
            It can also complement the wider iRES portfolio, connecting strategic oversight
            with:
          </p>
          <ul className="mt-5 space-y-3">
            {companions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  className="flex cursor-pointer gap-3 text-left text-sm leading-relaxed text-white hover:text-[#9ec5ff]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-color)]" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {mounted && active
        ? createPortal(
            <AnimatePresence mode="wait">
              <ServiceOverlay
                key={`${active.id}-${isLarge ? "modal" : "slide"}`}
                service={active}
                isLarge={isLarge}
                onClose={() => setActiveId(null)}
              />
            </AnimatePresence>,
            document.body,
          )
        : null}
    </section>
  );
}
