"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { getDisplayName } from "@/services/profile";
import {
  overviewService,
  type AccountOverview,
  type CoverageSource,
} from "@/services/overview";
import { getTicketStatusLabel, type TicketStatus } from "@/services/tickets";

function apiMessage(error: unknown) {
  const message = (error as { response?: { data?: { message?: string | string[] } } })
    ?.response?.data?.message;
  if (Array.isArray(message)) return message.filter(Boolean).join(" ");
  return message || "Could not load overview.";
}

function coverageLabel(source: CoverageSource) {
  if (source === "subscription") return "Subscription";
  if (source === "payg") return "One-off credits";
  return "No cover";
}

function remainingCopy(coverage: AccountOverview["coverage"]) {
  if (!coverage.eligible && coverage.source === null) {
    return "No active cover";
  }
  if (coverage.maxIncidents === null && coverage.source === "subscription") {
    return "Unlimited left";
  }
  if (coverage.remainingIncidents === null) {
    return coverage.paygCreditsAvailable > 0
      ? `${coverage.paygCreditsAvailable} one-off credit${coverage.paygCreditsAvailable === 1 ? "" : "s"}`
      : "No remaining allowance";
  }
  return `${coverage.remainingIncidents} left`;
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl bg-[#141327]/90 p-4 ring-1 ring-white/10 sm:p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-white/50">{hint}</p> : null}
    </div>
  );
}

export default function AccountOverview() {
  const user = useAuthStore((state) => state.user);
  const isOrg = user?.role === "organization";
  const incidentsPath = isOrg
    ? "/dashboard/organization/incidents"
    : "/dashboard/incidents";
  const ticketsPath = isOrg
    ? "/dashboard/organization/ticket-incident-history"
    : "/dashboard/ticket-incident-history";
  const plansPath = isOrg
    ? "/dashboard/organization/subscription-plans"
    : "/dashboard/subscription-plans";
  const settingsPath = isOrg
    ? "/dashboard/organization/settings"
    : "/dashboard/settings";

  const [data, setData] = useState<AccountOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const overview = await overviewService.get();
        if (!cancelled) setData(overview);
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
  }, []);

  const statusEntries = data
    ? (Object.entries(data.tickets.byStatus) as [TicketStatus, number][]).filter(
        ([, count]) => count > 0,
      )
    : [];

  const quickActions = [
    {
      href: incidentsPath,
      title: "Create incident",
      body: "File a new report on this account.",
    },
    {
      href: ticketsPath,
      title: "View tickets",
      body: "Track responder progress on open cases.",
    },
    {
      href: plansPath,
      title: data?.coverage.eligible ? "Manage cover" : "Get cover",
      body: data?.coverage.eligible
        ? "Review your plan, credits, and billing."
        : "Subscribe or add one-off credits to respond.",
    },
    {
      href: settingsPath,
      title: "Profile & settings",
      body: "Update contact details and password.",
    },
  ];

  return (
    <div className="min-h-full text-white">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Overview
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Welcome back{user ? `, ${getDisplayName(user)}` : ""}. Incidents, tickets, and
            cover for this account.
          </p>
        </div>
        <Link
          href={incidentsPath}
          className="inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white"
          style={{ background: "var(--btn-bg)" }}
        >
          Create incident
        </Link>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-28 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
      ) : null}

      {!loading && error ? (
        <p className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-300 ring-1 ring-red-400/20">
          {error}
        </p>
      ) : null}

      {!loading && data ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            <StatCard
              label="Open incidents"
              value={data.incidents.open}
              hint={`${data.incidents.total} total · ${data.incidents.closed} closed`}
            />
            <StatCard
              label="Open tickets"
              value={data.tickets.open}
              hint={`${data.tickets.total} total · not resolved or closed`}
            />
            <StatCard
              label="Resolved tickets"
              value={data.tickets.resolved}
              hint={`${data.tickets.closed} closed`}
            />
            <StatCard
              label="Coverage"
              value={data.coverage.eligible ? "Active" : "Inactive"}
              hint={remainingCopy(data.coverage)}
            />
          </div>

          <div className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-5">
            <section className="rounded-2xl bg-[#141327]/90 p-5 ring-1 ring-white/10 lg:col-span-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-white">Coverage</h2>
                  <p className="mt-1 text-sm text-white/50">
                    What you can use for incident response right now.
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    data.coverage.eligible
                      ? "bg-[#4185dd]/20 text-[#9ec5ff]"
                      : "bg-white/10 text-white/65"
                  }`}
                >
                  {coverageLabel(data.coverage.source)}
                </span>
              </div>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <dt className="text-xs text-white/45">Plan</dt>
                  <dd className="mt-1 text-sm font-medium text-white">
                    {data.coverage.planName || "None"}
                  </dd>
                </div>
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <dt className="text-xs text-white/45">Eligible</dt>
                  <dd className="mt-1 text-sm font-medium text-white">
                    {data.coverage.eligible ? "Yes" : "No"}
                  </dd>
                </div>
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <dt className="text-xs text-white/45">Incidents used</dt>
                  <dd className="mt-1 text-sm font-medium text-white">
                    {data.coverage.usedIncidents}
                    {data.coverage.maxIncidents === null
                      ? data.coverage.source === "subscription"
                        ? " · Unlimited plan"
                        : ""
                      : ` of ${data.coverage.maxIncidents}`}
                  </dd>
                </div>
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <dt className="text-xs text-white/45">Remaining / credits</dt>
                  <dd className="mt-1 text-sm font-medium text-white">
                    {remainingCopy(data.coverage)}
                    {data.coverage.paygCreditsAvailable > 0 &&
                    data.coverage.source === "subscription"
                      ? ` · ${data.coverage.paygCreditsAvailable} one-off`
                      : ""}
                  </dd>
                </div>
              </dl>

              {!data.coverage.eligible ? (
                <Link
                  href={plansPath}
                  className="mt-5 inline-flex cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-white"
                  style={{ background: "var(--btn-bg)" }}
                >
                  Choose a plan
                </Link>
              ) : (
                <Link
                  href={incidentsPath}
                  className="mt-5 inline-flex cursor-pointer text-sm font-semibold text-[#9ec5ff]"
                >
                  Create an incident →
                </Link>
              )}
            </section>

            <section className="rounded-2xl bg-[#141327]/90 p-5 ring-1 ring-white/10 lg:col-span-2">
              <h2 className="text-base font-semibold text-white">Ticket status</h2>
              <p className="mt-1 text-sm text-white/50">
                Open tickets are everything except resolved or closed.
              </p>
              {statusEntries.length === 0 ? (
                <p className="mt-5 text-sm text-white/55">No tickets yet.</p>
              ) : (
                <ul className="mt-5 space-y-2">
                  {statusEntries.map(([status, count]) => (
                    <li
                      key={status}
                      className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5 text-sm"
                    >
                      <span className="text-white/75">{getTicketStatusLabel(status)}</span>
                      <span className="font-semibold text-white">{count}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={ticketsPath}
                className="mt-5 inline-flex cursor-pointer text-sm font-semibold text-[#9ec5ff]"
              >
                Open ticket history →
              </Link>
            </section>
          </div>

          <section className="mt-5 lg:mt-6">
            <h2 className="text-base font-semibold text-white">Quick actions</h2>
            <p className="mt-1 text-sm text-white/50">
              Common next steps from this account.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.href + action.title}
                  href={action.href}
                  className="rounded-2xl bg-[#141327]/90 p-4 ring-1 ring-white/10 transition hover:ring-white/25"
                >
                  <p className="text-sm font-semibold text-white">{action.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/55">{action.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
