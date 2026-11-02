"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import {
  incidentReportService,
  type IncidentReportResponse,
} from "@/services/incidentReport";
import { newsletterService } from "@/services/newsletter";
import { SUPPORT_PHONES } from "@/lib/supportContact";
import { isValidEmail } from "@/lib/email";
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

const inputErrorClass =
  "block w-full rounded-xl border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none ring-1 ring-red-400/60 transition focus:ring-2 focus:ring-red-400/40";

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

type FieldErrors = Partial<
  Record<
    | "severity"
    | "incidentType"
    | "ongoing"
    | "name"
    | "phone"
    | "email"
    | "description"
    | "confirmed",
    string
  >
>;

function RequiredMark() {
  return <span className="text-[#ef4444]"> *</span>;
}

function internationalPhone(href: string) {
  const digits = href.replace(/^tel:\+/, "");
  if (!digits.startsWith("234") || digits.length < 13) return href.replace(/^tel:/, "");
  const local = digits.slice(3);
  return `+234 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
}

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
  error,
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
  error?: string;
}) {
  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <label id={`${id}-label`} className="mb-2 block text-sm font-medium text-white">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        aria-invalid={Boolean(error)}
        onClick={onToggle}
        className={`${error ? inputErrorClass : inputClass} flex cursor-pointer items-center justify-between gap-3 text-left`}
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
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function ReportIncident() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [openField, setOpenField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reportResult, setReportResult] = useState<IncidentReportResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formKey, setFormKey] = useState(0);
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

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (
      key === "severity" ||
      key === "incidentType" ||
      key === "ongoing" ||
      key === "name" ||
      key === "phone" ||
      key === "email" ||
      key === "description" ||
      key === "confirmed"
    ) {
      clearFieldError(key);
    }
  };

  const validate = (state: FormState): FieldErrors => {
    const next: FieldErrors = {};
    if (!state.severity) next.severity = "Select a severity.";
    if (!state.incidentType.trim()) next.incidentType = "Select an incident type.";
    if (!state.ongoing) next.ongoing = "Select whether the incident is ongoing.";
    if (!state.name.trim()) next.name = "Your name is required.";
    else if (state.name.trim().length > 120) next.name = "Name must be 120 characters or fewer.";
    if (!state.phone.trim()) next.phone = "Phone is required.";
    else if (state.phone.trim().length > 40) next.phone = "Phone must be 40 characters or fewer.";
    if (!state.email.trim()) next.email = "Email is required.";
    else if (!isValidEmail(state.email)) next.email = "Enter a valid email address.";
    if (!state.description.trim()) next.description = "Describe what happened.";
    else if (state.description.trim().length > 8000) {
      next.description = "Description must be 8000 characters or fewer.";
    }
    if (!state.confirmed) {
      next.confirmed = "Confirm the information is accurate before submitting.";
    }
    return next;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (isSubmitting || submitted) return;

    const nextErrors = validate(form);
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setError("Fix the highlighted fields before submitting.");
      return;
    }

    const severity = SEVERITY_OPTIONS.find((option) => option.value === form.severity);
    const ongoing = ONGOING_OPTIONS.find((option) => option === form.ongoing);
    if (!severity || !ongoing) {
      setError("Choose a severity and whether it is ongoing.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await incidentReportService.submit({
        severity: severity.value,
        incidentType: form.incidentType,
        ongoing,
        name: form.name,
        organization: form.organization,
        phone: form.phone,
        email: form.email.trim().toLowerCase(),
        detectedAt: form.detectedAt,
        affectedSystems: form.affectedSystems,
        description: form.description,
        confirmed: true,
      });
      setReportResult(result);
      setForm(emptyForm);
      setFieldErrors({});
      setOpenField(null);
      setSubmitted(false);
      setFormKey((key) => key + 1);
      setShowSuccess(true);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string | string[] }>;
      const message = axiosError.response?.data?.message;
      const text = Array.isArray(message) ? message.filter(Boolean).join(" ") : message;
      setError(text || "Could not send the report. Call the hotline if this is urgent.");
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

          <div className="mt-6 grid items-center gap-8 lg:mt-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,420px)] lg:gap-10 xl:gap-14">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="h-0.5 w-8 shrink-0 rounded-full"
                  style={{ background: "var(--accent-secondary-color)" }}
                />
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm"
                  style={{ color: "var(--accent-secondary-color)" }}
                >
                  iRES portal
                </p>
              </div>
              <h1 className="mt-4 max-w-3xl text-4xl font-light leading-[1.05] text-white sm:text-5xl lg:text-6xl">
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
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d1d1d1] sm:text-lg">
                Tell us what is happening and an iRES incident handler will call
                you. For critical incidents that are stopping operations, call the
                hotline first.
              </p>
            </div>

            <div className="w-full rounded-[28px] bg-[#e54848] p-5 text-white shadow-[0_20px_40px_rgba(180,40,40,0.28)] sm:p-6">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ff8f8a] sm:h-16 sm:w-16">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden
                    className="h-7 w-7 text-white sm:h-8 sm:w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-xs">
                    24/7 emergency hotline
                  </p>
                  <div className="mt-1.5 flex flex-col gap-0.5">
                    {SUPPORT_PHONES.map((phone) => (
                      <a
                        key={phone.href}
                        href={phone.href}
                        className="cursor-pointer text-lg font-bold leading-tight tracking-tight text-white transition hover:text-white/80 sm:text-xl lg:text-2xl"
                      >
                        {internationalPhone(phone.href)}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      <Section className="relative z-10 pt-16 pb-16 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.7fr)] lg:gap-14">
          <form
            key={formKey}
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative"
            autoComplete="off"
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

            <div className="space-y-6">
                <div>
                  <p className="mb-3 text-sm font-medium text-white">
                    Severity
                    <RequiredMark />
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {SEVERITY_OPTIONS.map((option) => {
                      const selected = form.severity === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setField("severity", option.value)}
                          className={`cursor-pointer rounded-xl px-3 py-3 text-left transition ${
                            selected
                              ? "bg-white/10 ring-2 ring-[var(--accent-color)]"
                              : fieldErrors.severity
                                ? "bg-white/5 ring-1 ring-red-400/60 hover:bg-white/10"
                                : "bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                          }`}
                        >
                          <span className="block text-sm font-semibold text-white">
                            {option.value}
                          </span>
                          <span className="mt-0.5 block text-xs text-white/50">
                            {option.hint}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {fieldErrors.severity ? (
                    <p role="alert" className="mt-1.5 text-xs text-red-300">
                      {fieldErrors.severity}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div data-select>
                    <FieldSelect
                      id="incidentType"
                      label="Incident type"
                      required
                      placeholder="Select an option"
                      value={form.incidentType}
                      error={fieldErrors.incidentType}
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
                      error={fieldErrors.ongoing}
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
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                      Your name
                      <RequiredMark />
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      maxLength={120}
                      value={form.name}
                      onChange={(event) => setField("name", event.target.value)}
                      aria-invalid={Boolean(fieldErrors.name)}
                      className={fieldErrors.name ? inputErrorClass : inputClass}
                    />
                    {fieldErrors.name ? (
                      <p role="alert" className="mt-1.5 text-xs text-red-300">
                        {fieldErrors.name}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="organization"
                      className="mb-2 block text-sm font-medium text-white"
                    >
                      Organization{" "}
                      <span className="font-normal text-white/45">(optional)</span>
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      maxLength={200}
                      value={form.organization}
                      onChange={(event) => setField("organization", event.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-white">
                      Phone (we will call this number)
                      <RequiredMark />
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      maxLength={40}
                      value={form.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      className={fieldErrors.phone ? inputErrorClass : inputClass}
                    />
                    {fieldErrors.phone ? (
                      <p role="alert" className="mt-1.5 text-xs text-red-300">
                        {fieldErrors.phone}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                      Email (use a trusted account)
                      <RequiredMark />
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={form.email}
                      onChange={(event) => setField("email", event.target.value)}
                      onBlur={() => {
                        if (!form.email.trim()) {
                          setFieldErrors((prev) => ({ ...prev, email: "Email is required." }));
                        } else if (!isValidEmail(form.email)) {
                          setFieldErrors((prev) => ({
                            ...prev,
                            email: "Enter a valid email address.",
                          }));
                        }
                      }}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby="email-help email-error"
                      className={fieldErrors.email ? inputErrorClass : inputClass}
                    />
                    <p id="email-help" className="mt-2 text-xs leading-relaxed text-white/55">
                      This email is used to create or find your iRES account so you can
                      follow the incident. If you are new, we will send a temporary
                      password to it.
                    </p>
                    {fieldErrors.email ? (
                      <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-300">
                        {fieldErrors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
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
                      placeholder="For example: email, file server, website"
                      value={form.affectedSystems}
                      onChange={(event) => setField("affectedSystems", event.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-medium text-white">
                    What happened?
                    <RequiredMark />
                  </label>
                  <textarea
                    id="description"
                    rows={5}
                    maxLength={8000}
                    placeholder="Describe what you observed, any messages or ransom notes, and actions already taken."
                    value={form.description}
                    onChange={(event) => setField("description", event.target.value)}
                    aria-invalid={Boolean(fieldErrors.description)}
                    className={fieldErrors.description ? inputErrorClass : inputClass}
                  />
                  {fieldErrors.description ? (
                    <p role="alert" className="mt-1.5 text-xs text-red-300">
                      {fieldErrors.description}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-white/75">
                    <input
                      type="checkbox"
                      checked={form.confirmed}
                      onChange={(event) => setField("confirmed", event.target.checked)}
                      aria-invalid={Boolean(fieldErrors.confirmed)}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[var(--accent-color)]"
                    />
                    <span>
                      I confirm the information is accurate to the best of my
                      knowledge and agree to iRES processing it to respond to this
                      incident.
                      <RequiredMark />
                    </span>
                  </label>
                  {fieldErrors.confirmed ? (
                    <p role="alert" className="mt-1.5 text-xs text-red-300">
                      {fieldErrors.confirmed}
                    </p>
                  ) : null}
                </div>

                {error ? (
                  <p role="alert" className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-300 ring-1 ring-red-400/30">
                    {error}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="w-full rounded-full px-6 py-3 disabled:opacity-40 sm:w-auto"
                >
                  {submitted ? "Report sent" : isSubmitting ? "Sending..." : "Submit incident report"}
                </Button>
                {submitted ? (
                  <p className="text-sm text-white/55">
                    This report has been sent. Wait for our support team to reply
                    before sending another.
                  </p>
                ) : null}
              </div>
          </form>

          <aside className="rounded-3xl bg-[#14132a] p-6 sm:p-8">
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

        <div className="mt-20 lg:mt-28">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="h-0.5 w-8 shrink-0 rounded-full"
                  style={{ background: "var(--accent-secondary-color)" }}
                />
                <p
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--accent-secondary-color)" }}
                >
                  Stay informed
                </p>
              </div>
              <h2 className="mt-4 max-w-xl text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">
                Incident guidance in your inbox
              </h2>
            </div>

            <form onSubmit={handleSubscribe} className="w-full">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:bg-[#2a2940] sm:p-1.5 sm:pl-5 sm:ring-1 sm:ring-white/25">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full rounded-full bg-[#2a2940] px-5 py-3.5 text-sm text-white outline-none ring-1 ring-white/30 placeholder:text-white/75 focus:ring-2 focus:ring-[var(--accent-color)] sm:flex-1 sm:bg-transparent sm:px-0 sm:py-2.5 sm:ring-0"
                />
                <Button
                  type="submit"
                  disabled={subscribeState === "loading"}
                  className="w-full shrink-0 rounded-full px-6 py-3.5 sm:w-auto sm:py-3"
                >
                  {subscribeState === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <p className="mt-3 text-xs text-white/45 sm:pl-5">
                Monthly. No spam. Unsubscribe any time.
              </p>
              {subscribeState === "done" ? (
                <p className="mt-2 text-sm text-emerald-300 sm:pl-5">You are subscribed.</p>
              ) : null}
              {subscribeState === "error" ? (
                <p className="mt-2 text-sm text-red-300 sm:pl-5">{subscribeError}</p>
              ) : null}
            </form>
          </div>
        </div>
      </Section>

      {isSubmitting ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b0b16]/80 px-4 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex w-full max-w-sm flex-col items-center rounded-3xl bg-[#14132a] px-8 py-10 text-center">
            <span className="h-11 w-11 animate-spin rounded-full border-2 border-white/15 border-t-white" />
            <p className="mt-5 text-lg font-semibold text-white">Sending your report</p>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              Please wait. Keep this page open.
            </p>
          </div>
        </div>
      ) : null}

      {showSuccess ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0b0b16]/80 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-success-title"
        >
          <div className="w-full max-w-md rounded-3xl bg-[#14132a] p-6 text-center sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              Report received
            </p>
            <h2 id="report-success-title" className="mt-3 text-2xl font-semibold text-white">
              An incident handler will call you
            </h2>
            {reportResult?.incidentReference ? (
              <p className="mt-3 text-sm font-semibold text-white">
                Reference {reportResult.incidentReference}
              </p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              {reportResult?.accountCreated
                ? "We created an account for this email. Open the message titled “Your iRES account is ready”, then sign in with the temporary password. You will be asked to choose a new one."
                : reportResult?.accountCreated === false
                  ? "This report was added to the account for this email. Sign in to follow it."
                  : "You only need to send this report once. Wait for our support team to reply. Sending the same incident again will not speed up the response."}
            </p>
            {reportResult?.accountCreated !== undefined ? (
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                You only need to send this report once. Sending it again will not
                speed up the response.
              </p>
            ) : null}
            {reportResult?.accountCreated !== undefined ? (
              <Link
                href="/login"
                className="mt-4 inline-flex cursor-pointer text-sm font-semibold text-[#9ec5ff]"
              >
                Sign in
              </Link>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              If operations are stopped, call the hotline now. Keep affected
              systems isolated and do not delete evidence.
            </p>
            <div className="mt-5 flex flex-col gap-1">
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
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="mt-6 cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium text-white"
              style={{ background: "var(--btn-bg)" }}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
