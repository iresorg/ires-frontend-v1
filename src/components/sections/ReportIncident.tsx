"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { contactService } from "@/services/contact";
import { newsletterService } from "@/services/newsletter";
import { SUPPORT_PHONES } from "@/lib/supportContact";
import type { AxiosError } from "axios";

const SEVERITY_OPTIONS = [
  { value: "Critical", hint: "Operations stopped" },
  { value: "High", hint: "Major impact" },
  { value: "Medium", hint: "Contained impact" },
  { value: "Low", hint: "Suspicious activity" },
] as const;

const INCIDENT_TYPES = [
  "Ransomware",
  "Phishing or business email compromise",
  "Data breach or data leak",
  "Malware infection",
  "Account compromise",
  "Denial of service",
  "Insider threat",
  "Fraud or financial loss",
  "Website defacement",
  "Other or not sure",
] as const;

const ONGOING_OPTIONS = ["Yes", "No", "Not sure"] as const;

const WAIT_STEPS = [
  {
    title: "Do not power off affected systems",
    body: "Isolate them from the network instead. Powering off can destroy valuable evidence held in memory.",
  },
  {
    title: "Disconnect, do not delete",
    body: "Remove network cables or disable Wi-Fi on affected devices. Do not delete files or reinstall software.",
  },
  {
    title: "Preserve evidence",
    body: "Keep logs, ransom notes, suspicious emails and screenshots. Note the time you noticed each event.",
  },
  {
    title: "Use a separate channel",
    body: "Assume email and chat may be compromised. Coordinate by phone or a trusted out-of-band channel.",
  },
  {
    title: "Do not pay or engage",
    body: "Do not contact attackers or pay any ransom before speaking with incident responders.",
  },
  {
    title: "Call iRES",
    body: "Report the incident as early as possible. Early response reduces impact and recovery time.",
  },
];

const inputClass =
  "block w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 transition focus:ring-2 focus:ring-[var(--accent-color)]/50";

type FormState = {
  severity: string;
  incidentType: string;
  ongoing: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  detectedAt: string;
  affectedSystems: string;
  description: string;
  confirmed: boolean;
  companyWebsite: string;
};

const emptyForm: FormState = {
  severity: "",
  incidentType: "",
  ongoing: "",
  name: "",
  organization: "",
  phone: "",
  email: "",
  detectedAt: "",
  affectedSystems: "",
  description: "",
  confirmed: false,
  companyWebsite: "",
};

function FieldSelect({
  id,
  label,
  required,
  placeholder,
  value,
  options,
  open,
  onToggle,
  onSelect,
}: {
  id: string;
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  options: readonly { value: string; hint?: string }[];
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <label id={`${id}-label`} className="mb-2 block text-sm font-medium text-white">
        {label}
        {required ? <span className="text-[#ef4444]"> *</span> : null}
      </label>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={onToggle}
        className={`${inputClass} flex cursor-pointer items-center justify-between gap-3 text-left`}
      >
        <span className={selected ? "text-white" : "text-white/40"}>
          {selected
            ? selected.hint
              ? `${selected.value} — ${selected.hint}`
              : selected.value
            : placeholder}
        </span>
        <span className={`text-white/50 transition ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl bg-[#141327] py-1 shadow-xl ring-1 ring-white/15"
        >
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => onSelect(option.value)}
                  className={`flex w-full cursor-pointer flex-col px-4 py-2.5 text-left text-sm transition hover:bg-white/10 ${
                    isSelected ? "bg-white/5 text-white" : "text-white/80"
                  }`}
                >
                  <span>{option.value}</span>
                  {option.hint ? (
                    <span className="text-xs text-white/45">{option.hint}</span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function ReportIncident() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [openField, setOpenField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribeState, setSubscribeState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [subscribeError, setSubscribeError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-select]")) setOpenField(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (form.companyWebsite.trim()) {
      setSubmitted(true);
      return;
    }

    if (!form.severity || !form.incidentType || !form.ongoing) {
      setError("Choose a severity, incident type, and whether it is ongoing.");
      return;
    }
    if (!form.confirmed) {
      setError("Confirm the information is accurate before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const message = [
        `Severity: ${form.severity}`,
        `Incident type: ${form.incidentType}`,
        `Ongoing: ${form.ongoing}`,
        `Organization: ${form.organization}`,
        form.detectedAt ? `Detected: ${form.detectedAt}` : null,
        form.affectedSystems ? `Affected systems: ${form.affectedSystems}` : null,
        "",
        form.description,
      ]
        .filter((line) => line !== null)
        .join("\n");

      await contactService.submit({
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `Incident report — ${form.severity} — ${form.incidentType}`,
        message,
      });
      setSubmitted(true);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(
        axiosError.response?.data?.message ||
          "Could not send the report. Call the hotline if this is urgent.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubscribeError("");
    if (!email.trim()) {
      setSubscribeError("Enter an email address.");
      setSubscribeState("error");
      return;
    }
    setSubscribeState("loading");
    try {
      await newsletterService.subscribe({ email: email.trim() });
      setEmail("");
      setSubscribeState("done");
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setSubscribeError(
        axiosError.response?.data?.message || "Could not subscribe. Try again.",
      );
      setSubscribeState("error");
    }
  };

  return (
    <div className="relative overflow-hidden">
      <section className="relative pt-32 pb-10 lg:pt-40 lg:pb-14">
        <div className="grid-lines grid-lines-hero pointer-events-none absolute inset-0 -z-10" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(180,37,218,0.28), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(65,133,221,0.22), transparent 50%)",
          }}
        />
        <Section className="relative z-10">
          <p className="text-xs text-white/45">
            <Link href="/" className="cursor-pointer hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            Report an incident
          </p>
          <p
            className="mt-6 text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent-color)" }}
          >
            iRES portal
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
            Report a{" "}
            <span
              className="gradient-shift bg-clip-text font-bold text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
              }}
            >
              cyber incident
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d1d1d1] sm:text-lg">
            Tell us what is happening and an iRES incident handler will call
            you. For critical incidents that are stopping operations, call the
            hotline first.
          </p>
          <div className="mt-8 inline-flex flex-col gap-2 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
              24/7 emergency hotline
            </p>
            {SUPPORT_PHONES.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="cursor-pointer text-lg font-semibold text-white transition hover:opacity-80"
              >
                {phone.display}
              </a>
            ))}
          </div>
        </Section>
      </section>

      <Section className="relative z-10 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:gap-10">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative rounded-3xl p-6 glass-panel brand-border sm:p-8"
          >
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="companyWebsite">Leave this field empty</label>
              <input
                id="companyWebsite"
                name="companyWebsite"
                tabIndex={-1}
                autoComplete="off"
                value={form.companyWebsite}
                onChange={(event) => setField("companyWebsite", event.target.value)}
              />
            </div>

            {submitted ? (
              <div className="py-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
                  Report received
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  An incident handler will call you
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                  If operations are stopped, call the hotline now. Keep affected
                  systems isolated and do not delete evidence.
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  {SUPPORT_PHONES.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="cursor-pointer text-base font-semibold text-white hover:opacity-80"
                    >
                      {phone.display}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div data-select>
                  <FieldSelect
                    id="severity"
                    label="Severity"
                    required
                    placeholder="Select a severity"
                    value={form.severity}
                    open={openField === "severity"}
                    onToggle={() =>
                      setOpenField((current) => (current === "severity" ? null : "severity"))
                    }
                    onSelect={(value) => {
                      setField("severity", value);
                      setOpenField(null);
                    }}
                    options={SEVERITY_OPTIONS}
                  />
                </div>
                <div data-select>
                  <FieldSelect
                    id="incidentType"
                    label="Incident type"
                    required
                    placeholder="Select an option"
                    value={form.incidentType}
                    open={openField === "incidentType"}
                    onToggle={() =>
                      setOpenField((current) =>
                        current === "incidentType" ? null : "incidentType",
                      )
                    }
                    onSelect={(value) => {
                      setField("incidentType", value);
                      setOpenField(null);
                    }}
                    options={INCIDENT_TYPES.map((value) => ({ value }))}
                  />
                </div>
                <div data-select>
                  <FieldSelect
                    id="ongoing"
                    label="Is the incident ongoing?"
                    required
                    placeholder="Select an option"
                    value={form.ongoing}
                    open={openField === "ongoing"}
                    onToggle={() =>
                      setOpenField((current) => (current === "ongoing" ? null : "ongoing"))
                    }
                    onSelect={(value) => {
                      setField("ongoing", value);
                      setOpenField(null);
                    }}
                    options={ONGOING_OPTIONS.map((value) => ({ value }))}
                  />
                </div>

                {(
                  [
                    { id: "name", label: "Your name", type: "text", required: true },
                    { id: "organization", label: "Organization", type: "text", required: true },
                    { id: "phone", label: "Phone (we will call this number)", type: "tel", required: true },
                    { id: "email", label: "Email (use a trusted account)", type: "email", required: true },
                  ] as const
                ).map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="mb-2 block text-sm font-medium text-white">
                      {field.label}
                      <span className="text-[#ef4444]"> *</span>
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      required={field.required}
                      value={form[field.id]}
                      onChange={(event) => setField(field.id, event.target.value)}
                      className={inputClass}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="detectedAt" className="mb-2 block text-sm font-medium text-white">
                    When was it detected?{" "}
                    <span className="font-normal text-white/40">(optional)</span>
                  </label>
                  <input
                    id="detectedAt"
                    type="datetime-local"
                    value={form.detectedAt}
                    onChange={(event) => setField("detectedAt", event.target.value)}
                    className={`${inputClass} [color-scheme:dark]`}
                  />
                </div>

                <div>
                  <label htmlFor="affectedSystems" className="mb-2 block text-sm font-medium text-white">
                    Affected systems{" "}
                    <span className="font-normal text-white/40">(optional)</span>
                  </label>
                  <input
                    id="affectedSystems"
                    value={form.affectedSystems}
                    onChange={(event) => setField("affectedSystems", event.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-medium text-white">
                    What happened?
                    <span className="text-[#ef4444]"> *</span>
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={5}
                    value={form.description}
                    onChange={(event) => setField("description", event.target.value)}
                    className={inputClass}
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/75">
                  <input
                    type="checkbox"
                    checked={form.confirmed}
                    onChange={(event) => setField("confirmed", event.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--accent-color)]"
                  />
                  I confirm the information is accurate to the best of my
                  knowledge and agree to iRES processing it to respond to this
                  incident.
                </label>

                {error ? (
                  <p role="alert" className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-300 ring-1 ring-red-400/30">
                    {error}
                  </p>
                ) : null}

                <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl py-3">
                  {isSubmitting ? "Sending..." : "Submit incident report"}
                </Button>
              </div>
            )}
          </form>

          <aside className="rounded-3xl p-6 glass-panel brand-border sm:p-8">
            <p className="text-sm font-semibold text-white">While you wait</p>
            <ol className="mt-6 space-y-5">
              {WAIT_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold text-white"
                    style={{ background: "var(--btn-bg)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/55">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <div className="mt-8 rounded-3xl p-6 glass-panel brand-border sm:p-8">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--accent-color)" }}
          >
            Existing iRES clients
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Sign in to track an investigation
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
            Use the secure portal to track investigations, communicate with
            responders, and view response updates.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-white/75">
            <li>Track investigations</li>
            <li>Communicate with responders</li>
            <li>View response updates</li>
          </ul>
          <Link
            href="/login"
            className="mt-6 inline-flex cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: "var(--btn-bg)" }}
          >
            Go to the client portal
          </Link>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl p-6 glass-panel brand-border sm:p-10">
          <div className="grid-lines grid-lines-hero pointer-events-none absolute inset-0 opacity-80" />
          <div className="relative z-10 mx-auto max-w-xl text-center">
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--accent-color)" }}
            >
              Stay informed
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              Incident guidance in your inbox
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Practical notes on cyber incidents, response, and how to stay
              protected. Monthly. No spam. Unsubscribe any time.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className={inputClass}
                required
              />
              <Button
                type="submit"
                disabled={subscribeState === "loading"}
                className="rounded-xl px-6 py-3"
              >
                {subscribeState === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {subscribeState === "done" ? (
              <p className="mt-3 text-sm text-emerald-300">You are subscribed.</p>
            ) : null}
            {subscribeState === "error" ? (
              <p className="mt-3 text-sm text-red-300">{subscribeError}</p>
            ) : null}
          </div>
        </div>
      </Section>
    </div>
  );
}
