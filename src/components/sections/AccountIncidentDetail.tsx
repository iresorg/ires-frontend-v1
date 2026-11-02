"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {
  incidentCanBeEdited,
  incidentsService,
  type Incident,
} from "@/services/incidents";
import type { IncidentOngoing } from "@/services/incidentReport";

const ONGOING: IncidentOngoing[] = ["Yes", "No", "Not sure"];

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
  const [editing, setEditing] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState("");
  const [form, setForm] = useState({
    ongoing: "Not sure" as IncidentOngoing,
    phone: "",
    detectedAt: "",
    affectedSystems: "",
    description: "",
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await incidentsService.get(incidentId);
        if (cancelled) return;
        setIncident(result);
        setEditing(incidentCanBeEdited(result));
        setForm({
          ongoing: result.ongoing,
          phone: result.phone,
          detectedAt: result.detectedAt ?? "",
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

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!incident || saving) return;
    setSaved("");
    setError("");
    setSaving(true);
    try {
      const updated = await incidentsService.update(incident.id, {
        ongoing: form.ongoing,
        phone: form.phone.trim(),
        detectedAt: form.detectedAt.trim(),
        affectedSystems: form.affectedSystems.trim(),
        description: form.description.trim(),
      });
      setIncident(updated);
      setEditing(incidentCanBeEdited(updated));
      setSaved("Incident updated");
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 409) {
        setEditing(false);
        setIncident((current) => (current ? { ...current, status: "CLOSED" } : current));
      }
      setError(apiMessage(err, "Could not update this incident."));
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
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            incident.status === "OPEN" ? "bg-[#4185dd]/20 text-[#9ec5ff]" : "bg-white/10 text-white/70"
          }`}
        >
          {incident.status === "OPEN" ? "Open" : "Closed"}
        </span>
      </div>

      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        {[
          ["Organization", incident.organization],
          ["Reporter", incident.name],
          ["Email", incident.email],
          ["Ongoing", incident.ongoing],
          ["Agent", agent],
          ["Ticket", incident.ticketId || "Not linked"],
          ["Ticket status", incident.ticketStatus || "—"],
          ["Reported", formatWhen(incident.createdAt)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-white/5 px-4 py-3">
            <dt className="text-xs text-white/45">{label}</dt>
            <dd className="mt-1 text-white">{value}</dd>
          </div>
        ))}
      </dl>

      {editing ? (
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <h2 className="text-base font-semibold text-white">Update this incident</h2>
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
              className="mt-1.5 w-full rounded-xl bg-[#141327] px-4 py-2.5 text-sm text-white ring-1 ring-white/10"
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
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              className="mt-1.5 w-full rounded-xl bg-[#141327] px-4 py-2.5 text-sm text-white ring-1 ring-white/10"
            />
          </label>
          <label className="block text-xs text-white/50">
            Detected at
            <input
              value={form.detectedAt}
              maxLength={40}
              onChange={(event) =>
                setForm((current) => ({ ...current, detectedAt: event.target.value }))
              }
              className="mt-1.5 w-full rounded-xl bg-[#141327] px-4 py-2.5 text-sm text-white ring-1 ring-white/10"
            />
          </label>
          <label className="block text-xs text-white/50">
            Affected systems
            <textarea
              value={form.affectedSystems}
              maxLength={2000}
              rows={3}
              onChange={(event) =>
                setForm((current) => ({ ...current, affectedSystems: event.target.value }))
              }
              className="mt-1.5 w-full rounded-xl bg-[#141327] px-4 py-2.5 text-sm text-white ring-1 ring-white/10"
            />
          </label>
          <label className="block text-xs text-white/50">
            Description
            <textarea
              value={form.description}
              maxLength={8000}
              rows={5}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
              className="mt-1.5 w-full rounded-xl bg-[#141327] px-4 py-2.5 text-sm text-white ring-1 ring-white/10"
            />
          </label>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {saved ? <p className="text-sm text-emerald-300">{saved}</p> : null}
          <button
            type="submit"
            disabled={saving}
            className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "var(--btn-bg)" }}
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      ) : (
        <div className="mt-8 space-y-3 text-sm text-white/75">
          <p>This incident is closed, so it can no longer be edited.</p>
          <p className="whitespace-pre-wrap">{incident.description}</p>
          {error ? <p className="text-red-300">{error}</p> : null}
        </div>
      )}
    </div>
  );
}
