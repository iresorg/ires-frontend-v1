"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/store/auth";
import { getDisplayName } from "@/services/profile";
import {
  incidentsService,
  type CreateAccountIncidentResponse,
} from "@/services/incidents";
import {
  INCIDENT_TYPES,
  type IncidentOngoing,
  type IncidentSeverity,
} from "@/services/incidentReport";

const SEVERITIES: IncidentSeverity[] = ["Critical", "High", "Medium", "Low"];
const ONGOING: IncidentOngoing[] = ["Yes", "No", "Not sure"];

const fieldClass =
  "mt-1.5 w-full rounded-xl bg-[#1c1b2b] px-4 py-2.5 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--accent-color)]/40";
const fieldErrorClass =
  "mt-1.5 w-full rounded-xl bg-[#1c1b2b] px-4 py-2.5 text-sm text-white outline-none ring-1 ring-red-400/60 focus:ring-2 focus:ring-red-400/40";

type FieldErrors = Partial<
  Record<"severity" | "incidentType" | "ongoing" | "name" | "phone" | "description" | "confirmed", string>
>;

function RequiredMark() {
  return <span className="text-[#ef4444]"> *</span>;
}

function apiMessage(error: unknown) {
  const message = (error as { response?: { data?: { message?: string | string[] } } })
    ?.response?.data?.message;
  if (Array.isArray(message)) return message.filter(Boolean).join(" ");
  return message || "Could not create the incident.";
}

export default function CreateAccountIncident({ onCreated }: { onCreated: () => void }) {
  const user = useAuthStore((state) => state.user);
  const defaults = useMemo(() => {
    const organization =
      user?.role === "organization"
        ? user.organizationProfile?.organizationName || ""
        : "";
    const phone =
      user?.role === "organization"
        ? user.organizationProfile?.phoneNumber ||
          user.organizationProfile?.primaryContactPhoneNumber ||
          ""
        : user?.individualProfile?.phoneNumber || "";
    const name =
      user?.role === "organization"
        ? `${user.organizationProfile?.primaryContactFirstName || ""} ${user.organizationProfile?.primaryContactLastName || ""}`.trim() ||
          getDisplayName(user)
        : getDisplayName(user);
    return {
      name,
      organization,
      phone,
      email: user?.email || "",
    };
  }, [user]);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<IncidentSeverity | "">("");
  const [incidentType, setIncidentType] = useState("");
  const [ongoing, setOngoing] = useState<IncidentOngoing | "">("");
  const [name, setName] = useState(defaults.name);
  const [organization, setOrganization] = useState(defaults.organization);
  const [phone, setPhone] = useState(defaults.phone);
  const [detectedAt, setDetectedAt] = useState("");
  const [affectedSystems, setAffectedSystems] = useState("");
  const [description, setDescription] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<CreateAccountIncidentResponse | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, saving]);

  useEffect(() => {
    setName(defaults.name);
    setOrganization(defaults.organization);
    setPhone(defaults.phone);
  }, [defaults]);

  const clearFieldError = (field: keyof FieldErrors) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const openModal = () => {
    setError("");
    setFieldErrors({});
    setResult(null);
    setOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setOpen(false);
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!severity) next.severity = "Select a severity.";
    if (!incidentType.trim()) next.incidentType = "Select an incident type.";
    if (!ongoing) next.ongoing = "Select whether the incident is ongoing.";
    if (!name.trim()) next.name = "Name is required.";
    else if (name.trim().length > 120) next.name = "Name must be 120 characters or fewer.";
    if (!phone.trim()) next.phone = "Phone is required.";
    else if (phone.trim().length > 40) next.phone = "Phone must be 40 characters or fewer.";
    if (!description.trim()) next.description = "Describe what happened.";
    else if (description.trim().length > 8000) {
      next.description = "Description must be 8000 characters or fewer.";
    }
    if (!confirmed) next.confirmed = "Confirm the information is accurate before submitting.";
    return next;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    const nextErrors = validate();
    setFieldErrors(nextErrors);
    setError("");
    if (Object.keys(nextErrors).length > 0) {
      setError("Fix the highlighted fields before submitting.");
      return;
    }
    if (!severity || !ongoing) return;

    setSaving(true);
    try {
      const response = await incidentsService.create({
        severity,
        incidentType: incidentType.trim(),
        ongoing,
        name: name.trim(),
        organization,
        phone: phone.trim(),
        detectedAt,
        affectedSystems,
        description: description.trim(),
        confirmed: true,
      });
      setResult(response);
      setSeverity("");
      setIncidentType("");
      setOngoing("");
      setDetectedAt("");
      setAffectedSystems("");
      setDescription("");
      setConfirmed(false);
      setFieldErrors({});
      onCreated();
    } catch (err) {
      setError(apiMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const reference =
    result?.incidentReference || result?.incident?.reference || null;

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={openModal}
        className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white"
        style={{ background: "var(--btn-bg)" }}
      >
        Create incident
      </button>

      {mounted && open
        ? createPortal(
            <div
              className="fixed inset-0 z-[220] flex items-end justify-center bg-[#0b0b16]/80 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-8"
              onClick={closeModal}
              role="presentation"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-incident-title"
                className="flex max-h-[min(92vh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-[#141327] shadow-2xl ring-1 ring-white/10"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                  <div>
                    <h2 id="create-incident-title" className="text-lg font-semibold text-white">
                      Create an incident
                    </h2>
                    <p className="mt-1 text-sm text-white/55">
                      This is saved on your signed-in account
                      {defaults.email ? ` (${defaults.email})` : ""}. No new account is
                      created. A handler will call the number you enter.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    aria-label="Close"
                    className="cursor-pointer rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col" noValidate>
                  <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-xs text-white/50">
                        Severity
                        <RequiredMark />
                        <select
                          value={severity}
                          onChange={(event) => {
                            setSeverity(event.target.value as IncidentSeverity);
                            clearFieldError("severity");
                          }}
                          aria-invalid={Boolean(fieldErrors.severity)}
                          className={fieldErrors.severity ? fieldErrorClass : fieldClass}
                        >
                          <option value="">Choose</option>
                          {SEVERITIES.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.severity ? (
                          <p role="alert" className="mt-1 text-xs text-red-300">{fieldErrors.severity}</p>
                        ) : null}
                      </label>
                      <label className="text-xs text-white/50">
                        Ongoing
                        <RequiredMark />
                        <select
                          value={ongoing}
                          onChange={(event) => {
                            setOngoing(event.target.value as IncidentOngoing);
                            clearFieldError("ongoing");
                          }}
                          aria-invalid={Boolean(fieldErrors.ongoing)}
                          className={fieldErrors.ongoing ? fieldErrorClass : fieldClass}
                        >
                          <option value="">Choose</option>
                          {ONGOING.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.ongoing ? (
                          <p role="alert" className="mt-1 text-xs text-red-300">{fieldErrors.ongoing}</p>
                        ) : null}
                      </label>
                      <label className="text-xs text-white/50 sm:col-span-2">
                        Incident type
                        <RequiredMark />
                        <select
                          value={incidentType}
                          onChange={(event) => {
                            setIncidentType(event.target.value);
                            clearFieldError("incidentType");
                          }}
                          aria-invalid={Boolean(fieldErrors.incidentType)}
                          className={fieldErrors.incidentType ? fieldErrorClass : fieldClass}
                        >
                          <option value="">Select an option</option>
                          {INCIDENT_TYPES.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.incidentType ? (
                          <p role="alert" className="mt-1 text-xs text-red-300">{fieldErrors.incidentType}</p>
                        ) : null}
                      </label>
                      <label className="text-xs text-white/50">
                        Name
                        <RequiredMark />
                        <input
                          maxLength={120}
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                            clearFieldError("name");
                          }}
                          aria-invalid={Boolean(fieldErrors.name)}
                          className={fieldErrors.name ? fieldErrorClass : fieldClass}
                        />
                        {fieldErrors.name ? (
                          <p role="alert" className="mt-1 text-xs text-red-300">{fieldErrors.name}</p>
                        ) : null}
                      </label>
                      <label className="text-xs text-white/50">
                        Organization{" "}
                        <span className="font-normal text-white/40">(optional)</span>
                        <input
                          maxLength={200}
                          value={organization}
                          onChange={(event) => setOrganization(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50 sm:col-span-2">
                        Phone
                        <RequiredMark />
                        <input
                          maxLength={40}
                          value={phone}
                          onChange={(event) => {
                            setPhone(event.target.value);
                            clearFieldError("phone");
                          }}
                          aria-invalid={Boolean(fieldErrors.phone)}
                          className={fieldErrors.phone ? fieldErrorClass : fieldClass}
                        />
                        {fieldErrors.phone ? (
                          <p role="alert" className="mt-1 text-xs text-red-300">{fieldErrors.phone}</p>
                        ) : null}
                      </label>
                      <label className="text-xs text-white/50">
                        Detected at{" "}
                        <span className="font-normal text-white/40">(optional)</span>
                        <input
                          type="datetime-local"
                          value={detectedAt}
                          onChange={(event) => setDetectedAt(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50">
                        Affected systems{" "}
                        <span className="font-normal text-white/40">(optional)</span>
                        <input
                          maxLength={2000}
                          value={affectedSystems}
                          onChange={(event) => setAffectedSystems(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50 sm:col-span-2">
                        What happened
                        <RequiredMark />
                        <textarea
                          maxLength={8000}
                          rows={4}
                          value={description}
                          onChange={(event) => {
                            setDescription(event.target.value);
                            clearFieldError("description");
                          }}
                          aria-invalid={Boolean(fieldErrors.description)}
                          className={fieldErrors.description ? fieldErrorClass : fieldClass}
                        />
                        {fieldErrors.description ? (
                          <p role="alert" className="mt-1 text-xs text-red-300">{fieldErrors.description}</p>
                        ) : null}
                      </label>
                    </div>
                    <div>
                      <label className="flex items-start gap-3 text-sm text-white/75">
                        <input
                          type="checkbox"
                          checked={confirmed}
                          onChange={(event) => {
                            setConfirmed(event.target.checked);
                            clearFieldError("confirmed");
                          }}
                          className="mt-1"
                          aria-invalid={Boolean(fieldErrors.confirmed)}
                        />
                        <span>
                          The information above is accurate.
                          <RequiredMark />
                        </span>
                      </label>
                      {fieldErrors.confirmed ? (
                        <p role="alert" className="mt-1 text-xs text-red-300">{fieldErrors.confirmed}</p>
                      ) : null}
                    </div>
                    {error ? <p className="text-sm text-red-300">{error}</p> : null}
                    {result ? (
                      <p className="text-sm text-emerald-300">
                        Incident received{reference ? ` · ${reference}` : ""}. A handler
                        will call you. You only need to send it once.
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-white/10 px-5 py-4 sm:px-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={saving}
                      className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white/80 ring-1 ring-white/15 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {result ? "Done" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ background: "var(--btn-bg)" }}
                    >
                      {saving ? "Sending..." : "Submit incident"}
                    </button>
                  </div>
                </form>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
