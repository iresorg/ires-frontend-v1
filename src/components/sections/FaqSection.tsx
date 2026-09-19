"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/ui/Section";

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do I need a subscription to call the emergency hotline?",
    answer:
      "You can call our 24/7 hotline anytime. However, to process your incident, you'll need to enroll in one of our protection plans. If you don't have a plan when you call, we'll assess your needs and sign you up for the appropriate tier, then process your ticket immediately.",
  },
  {
    question: "What are your response times?",
    answer:
      "Response times vary by protection plan tier. All plans receive immediate triage. Higher tiers receive faster mobilization and priority response. Enterprise clients have dedicated teams on standby.",
  },
  {
    question: "Can you respond outside of Lagos?",
    answer:
      "Yes. We provide remote response capabilities nationwide across Nigeria. Our remote response is operational NOW. For urgent situations requiring physical presence, we can deploy to Lagos locations. We're expanding on-site capabilities nationwide.",
  },
  {
    question: "How much does incident response cost?",
    answer:
      "We operate on a subscription model with tiered protection plans. Contact our team for a custom quote based on your organization size and requirements. We provide transparent pricing with no hidden costs.",
  },
  {
    question: "Are you available on weekends and holidays?",
    answer:
      "Yes. Cyber attacks don't respect business hours or holidays. Our 24/7 hotline operates 365 days a year with no exceptions.",
  },
  {
    question: "What if we already have an IT team or security consultant?",
    answer:
      "We work alongside your existing team, not replace them. We provide specialized incident response expertise and 24/7 emergency capabilities that most IT teams lack. We coordinate closely with your staff throughout the response with full knowledge transfer.",
  },
  {
    question: "Do you work with law enforcement?",
    answer:
      "Yes, when required and authorized by you. We coordinate with Nigerian law enforcement (Police Cybercrime Unit, EFCC) and can provide forensic evidence packages suitable for investigations and prosecutions.",
  },
  {
    question: "Can you help with regulatory compliance reporting?",
    answer:
      "Absolutely. We provide incident documentation, breach notification templates, and compliance reporting for NDPR, GDPR, CBN guidelines, and NITDA. We ensure you meet the 72-hour NDPR notification requirement.",
  },
  {
    question: "What certifications do you hold?",
    answer:
      "Our team is actively pursuing industry certifications. We follow international frameworks including NIST, SANS, and ISO/IEC 27035. Contact us for current certification status.",
  },
  {
    question: "What makes you different from international firms?",
    answer:
      "Local presence with nationwide coverage, Nigerian regulatory expertise (NDPR, CBN), understanding of regional threats (BEC patterns, SIM-swap, mobile money fraud), time zone alignment, immediate escalation without international delays, and 60-70% lower cost while maintaining enterprise-grade capabilities. Plus: real humans on the ground, not just software dashboards.",
  },
  {
    question: "How do you track incidents for subscribed organizations?",
    answer:
      "We perform live threat detection and monitoring for organizations on our protection plans. All incident data flows into our internal dashboard for real-time tracking and response coordination.",
  },
];

function FaqAccordionItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
      className="overflow-hidden rounded-2xl bg-[#141327]/80 ring-1 ring-white/10"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03] sm:px-6 sm:py-5"
      >
        <span
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white"
          style={{ background: "var(--btn-bg)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1 text-sm font-semibold text-white sm:text-base">
          {item.question}
        </span>
        <span
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-lg leading-none text-white/70 transition ${
            open ? "bg-white/10 rotate-45" : "bg-white/5"
          }`}
          aria-hidden
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/65 sm:px-6 sm:pb-6 sm:pl-[4.25rem]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="relative z-10 pb-20 lg:pb-28">
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, index) => (
          <FaqAccordionItem
            key={item.question}
            item={item}
            index={index}
            open={openIndex === index}
            onToggle={() =>
              setOpenIndex((current) => (current === index ? null : index))
            }
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mt-12 max-w-3xl rounded-2xl p-6 text-center glass-panel brand-border sm:p-8"
      >
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Still need help?
        </h2>
        <p className="mt-2 text-sm text-white/55">
          Our team can walk you through plans, response coverage, and next steps.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: "var(--btn-bg)" }}
          >
            Contact us
          </Link>
          <Link
            href="/pricing"
            className="inline-flex cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium text-white/80 ring-1 ring-white/15 transition hover:bg-white/5 hover:text-white"
          >
            View plans
          </Link>
        </div>
      </motion.div>
    </Section>
  );
}
