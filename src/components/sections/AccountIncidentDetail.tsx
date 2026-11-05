"use client";

import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  incidentCanBeEdited,
  incidentsService,
  type Incident,
} from "@/services/incidents";
import type { IncidentOngoing } from "@/services/incidentReport";

const ONGOING: IncidentOngoing[] = ["Yes", "No", "Not sure"];

const fieldClass =
  "mt-1.5 w-full rounded-xl bg-[#1c1b2b] px-4 py-2.5 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-[var(--accent-color)]/40";

function formatWhen(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

/** Normalize API / ISO values for `<input type="date">` + `<input type="time">`. */
function toDateTimeParts(value: string | null | undefined): { date: string; time: string } {
  if (!value?.trim()) return { date: "", time: "" };
  const trimmed = value.trim();
  const parsed = new Date(trimmed);
  if (!Number.isNaN(parsed.getTime())) {
    return {
      date: `${parsed.getFullYear()}-${pad2(parsed.getMonth() + 1)}-${pad2(parsed.getDate())}`,
      time: `${pad2(parsed.getHours())}:${pad2(parsed.getMinutes())}`,
    };
  }
  const match = trimmed.match(/^(\d{4}-\d{2}-\d{2})[T\s](\d{2}:\d{2})/);
  if (match) return { date: match[1], time: match[2] };
  return { date: "", time: "" };
}

function joinDateTimeParts(date: string, time: string) {
  if (!date) return "";
  return `${date}T${time || "00:00"}`;
}

function apiMessage(error: unknown, fallback: string) {
  const message = (error as { response?: { data?: { message?: string | string[] } } })
    ?.response?.data?.message;
  if (Array.isArray(message)) return message.filter(Boolean).join(" ");
  return message || fallback;
}

export default function AccountIncidentDetail({
  incidentId,
  listPath,
}: {
  incidentId: string;
  listPath: string;
}) {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    ongoing: "Not sure" as IncidentOngoing,
    phone: "",
    detectedDate: "",
    detectedTime: "",
    affectedSystems: "",
    description: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await incidentsService.get(incidentId);
        if (cancelled) return;
        setIncident(result);
        setCanEdit(incidentCanBeEdited(result));
        const detected = toDateTimeParts(result.detectedAt);
        setForm({
          ongoing: result.ongoing,
          phone: result.phone,
          detectedDate: detected.date,
          detectedTime: detected.time,
          affectedSystems: result.affectedSystems ?? "",
          description: result.description,
        });
      } catch (err) {
        if (!cancelled) setError(apiMessage(err, "Could not load this incident."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [incidentId]);

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !saving) setModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, saving]);

  const openUpdateModal = () => {
    if (!incident) return;
    const detected = toDateTimeParts(incident.detectedAt);
    setForm({
      ongoing: incident.ongoing,
      phone: incident.phone,
      detectedDate: detected.date,
      detectedTime: detected.time,
      affectedSystems: incident.affectedSystems ?? "",
      description: incident.description,
    });
    setFormError("");
    setSaved("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!incident || saving) return;
    setSaved("");
    setFormError("");
    setSaving(true);
    try {
      const updated = await incidentsService.update(incident.id, {
        ongoing: form.ongoing,
        phone: form.phone.trim(),
        detectedAt: joinDateTimeParts(form.detectedDate, form.detectedTime),
        affectedSystems: form.affectedSystems.trim(),
        description: form.description.trim(),
      });
      setIncident(updated);
      setCanEdit(incidentCanBeEdited(updated));
      setSaved("Incident updated");
      setModalOpen(false);
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 409) {
        setCanEdit(false);
        setModalOpen(false);
        setIncident((current) => (current ? { ...current, status: "CLOSED" } : current));
      }
      setFormError(apiMessage(err, "Could not update this incident."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="h-40 animate-pulse rounded-2xl bg-white/5" />;
  }

  if (!incident) {
    return (
      <div>
        <Link href={listPath} className="text-sm text-[#9ec5ff]">
          Back to incidents
        </Link>
        <p className="mt-4 text-sm text-red-300">{error || "Incident not found."}</p>
      </div>
    );
  }

  const agent = incident.assignedAgent
    ? `${incident.assignedAgent.firstName} ${incident.assignedAgent.lastName}`
    : "Not assigned";

  return (
    <div>
      <Link href={listPath} className="text-sm text-[#9ec5ff]">
        Back to incidents
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white sm:text-2xl">{incident.reference}</h1>
          <p className="mt-1 text-sm text-white/60">
            {incident.severity} · {incident.incidentType}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              incident.status === "OPEN"
                ? "bg-[#4185dd]/20 text-[#9ec5ff]"
                : "bg-white/10 text-white/70"
            }`}
          >
            {incident.status === "OPEN" ? "Open" : "Closed"}
          </span>
          {canEdit ? (
            <button
              type="button"
              onClick={openUpdateModal}
              className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white"
              style={{ background: "var(--btn-bg)" }}
            >
              Update
            </button>
          ) : null}
        </div>
      </div>

      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        {[
          ["Organization", incident.organization || "—"],
          ["Reporter", incident.name],
          ["Email", incident.email],
          ["Phone", incident.phone],
          ["Ongoing", incident.ongoing],
          ["Detected at", formatWhen(incident.detectedAt)],
          ["Affected systems", incident.affectedSystems || "—"],
          ["Agent", agent],
          ["Ticket", incident.ticketId || "Not linked"],
          ["Ticket status", incident.ticketStatus || "—"],
          ["Reported", formatWhen(incident.createdAt)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-white/5 px-4 py-3">
            <dt className="text-xs text-white/45">{label}</dt>
            <dd className="mt-1 whitespace-pre-wrap text-white">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 rounded-xl bg-white/5 px-4 py-3 text-sm">
        <p className="text-xs text-white/45">Description</p>
        <p className="mt-1 whitespace-pre-wrap text-white">{incident.description}</p>
      </div>

      {!canEdit ? (
        <p className="mt-6 text-sm text-white/60">
          This incident is closed, so it can no longer be edited.
        </p>
      ) : null}

      {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      {saved && !modalOpen ? (
        <p className="mt-4 text-sm text-emerald-300">{saved}</p>
      ) : null}

      {mounted && modalOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-[220] flex items-end justify-center bg-[#0b0b16]/80 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-8"
              onClick={closeModal}
              role="presentation"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="update-incident-title"
                className="flex max-h-[min(92vh,820px)] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-[#141327] shadow-2xl ring-1 ring-white/10"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
                  <div>
                    <h2 id="update-incident-title" className="text-lg font-semibold text-white">
                      Update this incident
                    </h2>
                    <p className="mt-1 text-sm text-white/55">{incident.reference}</p>
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

                <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
                  <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                    <label className="block text-xs text-white/50">
                      Ongoing
                      <select
                        value={form.ongoing}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            ongoing: event.target.value as IncidentOngoing,
                          }))
                        }
                        className={fieldClass}
                      >
                        {ONGOING.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-xs text-white/50">
                      Phone
                      <input
                        value={form.phone}
                        maxLength={40}
                        onChange={(event) =>
                          setForm((current) => ({ ...current, phone: event.target.value }))
                        }
                        className={fieldClass}
                      />
                    </label>
                    <div>
                      <p className="text-xs text-white/50">Detected at</p>
                      <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <label className="block text-xs text-white/40">
                          Date
                          <input
                            type="date"
                            value={form.detectedDate}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                detectedDate: event.target.value,
                              }))
                            }
                            className={`${fieldClass} [color-scheme:dark]`}
                          />
                        </label>
                        <label className="block text-xs text-white/40">
                          Time
                          <input
                            type="time"
                            value={form.detectedTime}
                            onChange={(event) =>
                              setForm((current) => ({
                                ...current,
                                detectedTime: event.target.value,
                              }))
                            }
                            className={`${fieldClass} [color-scheme:dark]`}
                          />
                        </label>
                      </div>
                    </div>
                    <label className="block text-xs text-white/50">
                      Affected systems
                      <textarea
                        value={form.affectedSystems}
                        maxLength={2000}
                        rows={3}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            affectedSystems: event.target.value,
                          }))
                        }
                        className={fieldClass}
                      />
                    </label>
                    <label className="block text-xs text-white/50">
                      Description
                      <textarea
                        value={form.description}
                        maxLength={8000}
                        rows={5}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            description: event.target.value,
                          }))
                        }
                        className={fieldClass}
                      />
                    </label>
                    {formError ? <p className="text-sm text-red-300">{formError}</p> : null}
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 border-t border-white/10 px-5 py-4 sm:px-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={saving}
                      className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white/80 ring-1 ring-white/15 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ background: "var(--btn-bg)" }}
                    >
                      {saving ? "Saving..." : "Save changes"}
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
