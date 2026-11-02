"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { incidentsService, type Incident } from "@/services/incidents";
import CreateAccountIncident from "@/components/sections/CreateAccountIncident";

function formatWhen(value: string) {
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

function apiMessage(error: unknown) {
  const message = (error as { response?: { data?: { message?: string | string[] } } })
    ?.response?.data?.message;
  if (Array.isArray(message)) return message.filter(Boolean).join(" ");
  return message || "Could not load incidents.";
}

export default function AccountIncidents({ basePath }: { basePath: string }) {
  const [status, setStatus] = useState<"" | "OPEN" | "CLOSED">("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Incident[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await incidentsService.list({ page, limit: 10, status });
        if (cancelled) return;
        setRows(result.data);
        setTotalPages(result.totalPages);
      } catch (err) {
        if (!cancelled) setError(apiMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [page, status, reloadKey]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Incidents
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Reports attached to this account. Open incidents can still be updated.
          </p>
        </div>
        <label className="text-xs text-white/50">
          Status
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as "" | "OPEN" | "CLOSED");
              setPage(1);
            }}
            className="mt-1.5 block w-full rounded-xl bg-[#141327] px-4 py-2.5 text-sm text-white ring-1 ring-white/10 sm:w-44"
          >
            <option value="">All</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
        </label>
      </div>

      <CreateAccountIncident
        onCreated={() => {
          setPage(1);
          setReloadKey((key) => key + 1);
        }}
      />

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-20 animate-pulse rounded-xl bg-white/5" />
          ))}
        </div>
      ) : null}

      {!loading && error ? <p className="text-sm text-red-300">{error}</p> : null}

      {!loading && !error && rows.length === 0 ? (
        <p className="rounded-2xl bg-white/5 px-5 py-8 text-sm text-white/60">
          No incidents yet.
        </p>
      ) : null}

      {!loading && !error && rows.length > 0 ? (
        <ul className="space-y-3">
          {rows.map((incident) => (
            <li key={incident.id}>
              <Link
                href={`${basePath}/${incident.id}`}
                className="block rounded-2xl bg-[#141327] px-4 py-4 ring-1 ring-white/10 transition hover:ring-white/25"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">{incident.reference}</p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      incident.status === "OPEN"
                        ? "bg-[#4185dd]/20 text-[#9ec5ff]"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {incident.status === "OPEN" ? "Open" : "Closed"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/75">
                  {incident.severity} · {incident.incidentType}
                </p>
                <p className="mt-1 text-xs text-white/45">{formatWhen(incident.createdAt)}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {totalPages > 1 ? (
        <div className="mt-5 flex items-center justify-between text-sm text-white/70">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="cursor-pointer rounded-full px-4 py-2 ring-1 ring-white/15 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => current + 1)}
            className="cursor-pointer rounded-full px-4 py-2 ring-1 ring-white/15 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}
