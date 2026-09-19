"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const SUPPORT_EMAIL = "support@iresorg.com";

const SUBJECT_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "support", label: "Technical Support" },
] as const;

const contactInfo = [
  {
    name: "Email",
    description: "Get in touch with our team",
    icon: EnvelopeIcon,
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
  },
  {
    name: "Phone",
    description: "Call us directly",
    icon: PhoneIcon,
    value: "+234 810 000 0000",
    href: "tel:+2348100000000",
  },
  {
    name: "Office",
    description: "Visit our headquarters",
    icon: MapPinIcon,
    value: "Plot 1606 Okay Akoko Close Off Lagos Street Garki Abuja",
    href: "https://maps.google.com/?q=Plot+1606+Okay+Akoko+Close+Off+Lagos+Street+Garki+Abuja",
  },
];

const inputClass =
  "block w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-[var(--accent-color)]/50";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [subjectOpen, setSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement>(null);

  const selectedSubject = SUBJECT_OPTIONS.find(
    (option) => option.value === formData.subject,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectRef.current &&
        !subjectRef.current.contains(event.target as Node)
      ) {
        setSubjectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectLabel = selectedSubject?.label ?? "Contact inquiry";
    const mailtoSubject = encodeURIComponent(
      `[iRES Contact] ${subjectLabel} — ${formData.name}`,
    );
    const mailtoBody = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        formData.phone ? `Phone: ${formData.phone}` : null,
        `Subject: ${subjectLabel}`,
        "",
        formData.message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <div className="relative overflow-hidden">
        <div className="security-grid pointer-events-none absolute inset-0 opacity-40" />

        <Section className="relative z-10 pt-32 pb-12 lg:pt-40 lg:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <SectionTitle
              logo="/logos/ires-logo.svg"
              logoAlt="iRES Logo"
              title="Contact"
            />
            <h1 className="mt-6 text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
              <span
                className="gradient-shift bg-clip-text font-bold text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                }}
              >
                Contact Us
              </span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-[#d1d1d1] sm:text-lg">
              Have questions about our services or need help getting started?
              We&apos;re here to help.
            </p>
          </motion.div>
        </Section>

        <Section className="relative z-10 pb-20 lg:pb-28">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl p-6 sm:p-8 glass-panel brand-border"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-[11px] uppercase tracking-wider text-white/55">
                  Encrypted inquiry
                </span>
              </div>

              {(
                [
                  { id: "name", label: "Name", type: "text", required: true },
                  { id: "email", label: "Email", type: "email", required: true },
                  { id: "phone", label: "Phone", type: "tel", required: false },
                ] as const
              ).map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.id}
                    id={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required={field.required}
                    className={inputClass}
                  />
                </div>
              ))}

              <div ref={subjectRef} className="relative">
                <label
                  id="subject-label"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Subject
                </label>
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={subjectOpen}
                  aria-labelledby="subject-label"
                  onClick={() => setSubjectOpen((open) => !open)}
                  className={`${inputClass} flex cursor-pointer items-center justify-between gap-3 text-left`}
                >
                  <span
                    className={
                      selectedSubject ? "text-white" : "text-white/40"
                    }
                  >
                    {selectedSubject?.label ?? "Select a subject"}
                  </span>
                  <Image
                    src="/images/white-dropdown.png"
                    alt=""
                    width={12}
                    height={12}
                    className={`shrink-0 transition-transform ${
                      subjectOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Hidden required input so native form validation still applies */}
                <input
                  tabIndex={-1}
                  required
                  value={formData.subject}
                  onChange={() => undefined}
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                  aria-hidden
                />

                {subjectOpen && (
                  <ul
                    role="listbox"
                    aria-labelledby="subject-label"
                    className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl bg-[#141327] py-1 shadow-xl ring-1 ring-white/15"
                  >
                    {SUBJECT_OPTIONS.map((option) => {
                      const isSelected = formData.subject === option.value;
                      return (
                        <li key={option.value} role="option" aria-selected={isSelected}>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                subject: option.value,
                              }));
                              setSubjectOpen(false);
                            }}
                            className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-white/10 ${
                              isSelected
                                ? "bg-white/5 text-white"
                                : "text-white/80"
                            }`}
                          >
                            {option.label}
                            {isSelected && (
                              <span
                                className="text-xs"
                                style={{ color: "var(--accent-color)" }}
                              >
                                ✓
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <Button type="submit" className="w-full rounded-xl py-3">
                Send Message
              </Button>
            </motion.form>

            <motion.div
              className="rounded-3xl p-6 sm:p-8 glass-panel brand-border lg:pl-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--accent-color)" }}
              >
                Get in touch
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                We&apos;re here to help
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#d1d1d1]">
                Have questions about our services or need support? Reach out
                through any of these channels.
              </p>
              <dl className="mt-10 space-y-5">
                {contactInfo.map((item) => (
                  <div
                    key={item.name}
                    className="flex gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 transition hover:bg-white/[0.07]"
                  >
                    <dt className="flex-none">
                      <span className="sr-only">{item.name}</span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                        <item.icon
                          className="h-5 w-5"
                          style={{ color: "var(--accent-color)" }}
                          aria-hidden="true"
                        />
                      </div>
                    </dt>
                    <dd>
                      <a
                        href={item.href}
                        className="cursor-pointer font-medium text-white transition hover:opacity-80"
                      >
                        {item.value}
                      </a>
                      <p className="mt-1 text-sm text-white/60">
                        {item.description}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-white">Need help?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  Browse answers about plans, response times, coverage, and
                  compliance before you write in.
                </p>
                <Link
                  href="/faq"
                  className="mt-4 inline-flex cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  style={{ background: "var(--btn-bg)" }}
                >
                  View FAQs
                </Link>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
  );
}
