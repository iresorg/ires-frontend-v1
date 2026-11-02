"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/store/auth";
import { getDisplayName } from "@/services/profile";
import {
  incidentReportService,
  type IncidentReportResponse,
  type IncidentOngoing,
  type IncidentSeverity,
} from "@/services/incidentReport";

const SEVERITIES: IncidentSeverity[] = ["Critical", "High", "Medium", "Low"];
const ONGOING: IncidentOngoing[] = ["Yes", "No", "Not sure"];

const fieldClass =
  "mt-1.5 w-full rounded-xl bg-[#1c1b2b] px-4 py-2.5 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--accent-color)]/40";

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
  const [result, setResult] = useState<IncidentReportResponse | null>(null);

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

  const openModal = () => {
    setError("");
    setResult(null);
    setOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setOpen(false);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!severity || !ongoing || !defaults.email || saving) return;
    setSaving(true);
    setError("");
    try {
      const response = await incidentReportService.submit({
        severity,
        incidentType,
        ongoing,
        name,
        organization,
        phone,
        email: defaults.email,
        detectedAt,
        affectedSystems,
        description,
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
      onCreated();
    } catch (err) {
      setError(apiMessage(err));
    } finally {
      setSaving(false);
    }
  };

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
                      Filed on {defaults.email || "your account"}. A handler will call the
                      number you enter.
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

                <form
                  onSubmit={onSubmit}
                  className="flex min-h-0 flex-1 flex-col"
                >
                  <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="text-xs text-white/50">
                        Severity
                        <select
                          required
                          value={severity}
                          onChange={(event) =>
                            setSeverity(event.target.value as IncidentSeverity)
                          }
                          className={fieldClass}
                        >
                          <option value="">Choose</option>
                          {SEVERITIES.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="text-xs text-white/50">
                        Ongoing
                        <select
                          required
                          value={ongoing}
                          onChange={(event) =>
                            setOngoing(event.target.value as IncidentOngoing)
                          }
                          className={fieldClass}
                        >
                          <option value="">Choose</option>
                          {ONGOING.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="text-xs text-white/50 sm:col-span-2">
                        Incident type
                        <input
                          required
                          maxLength={200}
                          value={incidentType}
                          onChange={(event) => setIncidentType(event.target.value)}
                          placeholder="Ransomware, phishing, data breach..."
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50">
                        Name
                        <input
                          required
                          maxLength={120}
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50">
                        Organization
                        <input
                          required
                          maxLength={200}
                          value={organization}
                          onChange={(event) => setOrganization(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50">
                        Phone
                        <input
                          required
                          maxLength={40}
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50">
                        Detected at
                        <input
                          type="datetime-local"
                          value={detectedAt}
                          onChange={(event) => setDetectedAt(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50 sm:col-span-2">
                        Affected systems
                        <input
                          maxLength={2000}
                          value={affectedSystems}
                          onChange={(event) => setAffectedSystems(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                      <label className="text-xs text-white/50 sm:col-span-2">
                        What happened
                        <textarea
                          required
                          maxLength={8000}
                          rows={4}
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                          className={fieldClass}
                        />
                      </label>
                    </div>
                    <label className="flex items-start gap-3 text-sm text-white/75">
                      <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(event) => setConfirmed(event.target.checked)}
                        className="mt-1"
                        required
                      />
                      The information above is accurate.
                    </label>
                    {error ? <p className="text-sm text-red-300">{error}</p> : null}
                    {result ? (
                      <p className="text-sm text-emerald-300">
                        Incident received
                        {result.incidentReference ? ` · ${result.incidentReference}` : ""}.
                        A handler will call you. You only need to send it once.
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
                      disabled={saving || !confirmed}
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
