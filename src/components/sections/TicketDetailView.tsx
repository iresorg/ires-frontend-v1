"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTicketsStore } from "@/store/tickets";
import {
  formatStaffName,
  formatTicketDateTime,
  getEntitlementLabel,
  getSeverityBadgeClass,
  getTicketStatusBadgeClass,
  getTicketStatusLabel,
} from "@/services/tickets";

type TicketDetailViewProps = {
  /** List path for back link */
  listPath: string;
};

export default function TicketDetailView({ listPath }: TicketDetailViewProps) {
  const params = useParams();
  const ticketId = decodeURIComponent(String(params.ticketId || ""));

  const {
    selectedTicket,
    lifecycle,
    lifecyclePagination,
    isDetailLoading,
    isLifecycleLoading,
    detailError,
    fetchTicket,
    fetchLifecycle,
    clearSelectedTicket,
  } = useTicketsStore();

  const [lifecyclePage, setLifecyclePage] = useState(1);

  useEffect(() => {
    if (!ticketId) return;
    fetchTicket(ticketId);
    return () => clearSelectedTicket();
  }, [ticketId, fetchTicket, clearSelectedTicket]);

  useEffect(() => {
    if (!ticketId || detailError) return;
    fetchLifecycle(ticketId, lifecyclePage, 10);
  }, [ticketId, lifecyclePage, detailError, fetchLifecycle]);

  if (isDetailLoading) {
    return (
      <div className="mt-2 ml-2 mr-2 flex min-h-[400px] items-center justify-center sm:ml-4 sm:mr-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#4185DD]" />
          <p className="text-gray-300">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  if (detailError || !selectedTicket) {
    return (
      <div className="mt-2 ml-2 mr-2 sm:ml-4 sm:mr-4">
        <Link
          href={listPath}
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <Image
            src="/images/white-left.svg"
            alt=""
            width={16}
            height={16}
          />
          Back to incidents
        </Link>
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-10 text-center">
          <p className="text-red-300">
            {detailError || "Ticket not found."}
          </p>
        </div>
      </div>
    );
  }

  const ticket = selectedTicket;

  return (
    <div className="mt-2 ml-2 mr-2 space-y-6 sm:ml-4 sm:mr-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href={listPath}
            className="mb-3 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            <Image
              src="/images/white-left.svg"
              alt=""
              width={16}
              height={16}
            />
            Back to incidents
          </Link>
          <h1 className="text-xl font-semibold text-white sm:text-2xl">
            {ticket.title}
          </h1>
          <p className="mt-1 text-sm text-white/50">{ticket.ticketId}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-lg px-3 py-1.5 text-xs text-white ${getTicketStatusBadgeClass(ticket.status)}`}
          >
            {getTicketStatusLabel(ticket.status)}
          </span>
          <span
            className={`rounded-lg px-3 py-1.5 text-xs text-white ${getSeverityBadgeClass(ticket.severity)}`}
          >
            {ticket.severity}
          </span>
          <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80">
            {ticket.tier?.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-2xl border border-white/10 bg-[#0E0E1A] p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
              Description
            </h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/85">
              {ticket.description || "No description provided."}
            </p>
          </section>

          {ticket.attachments && ticket.attachments.length > 0 && (
            <section className="rounded-2xl border border-white/10 bg-[#0E0E1A] p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
                Attachments
              </h2>
              <ul className="space-y-2">
                {ticket.attachments.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-sm transition hover:opacity-80"
                      style={{ color: "var(--accent-color)" }}
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-2xl border border-white/10 bg-[#0E0E1A] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                Activity timeline
              </h2>
              {isLifecycleLoading && (
                <span className="text-xs text-white/40">Loading…</span>
              )}
            </div>

            {lifecycle.length === 0 && !isLifecycleLoading ? (
              <p className="text-sm text-white/50">No activity yet.</p>
            ) : (
              <ol className="relative space-y-0 border-l border-white/10 pl-5">
                {lifecycle.map((event) => (
                  <li key={event.id} className="relative pb-6 last:pb-0">
                    <span
                      className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full ring-4 ring-[#0E0E1A]"
                      style={{ background: "var(--accent-color)" }}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-md px-2 py-0.5 text-xs text-white ${getTicketStatusBadgeClass(event.action)}`}
                      >
                        {getTicketStatusLabel(event.action)}
                      </span>
                      <span className="text-xs text-white/45">
                        {formatTicketDateTime(event.createdAt)}
                      </span>
                    </div>
                    {event.notes && (
                      <p className="mt-1.5 text-sm text-white/80">
                        {event.notes}
                      </p>
                    )}
                    {event.performedBy && (
                      <p className="mt-1 text-xs text-white/45">
                        By {formatStaffName(event.performedBy)}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            )}

            {lifecyclePagination && lifecyclePagination.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between gap-3 text-xs text-white/70">
                <button
                  type="button"
                  disabled={lifecyclePage <= 1}
                  onClick={() => setLifecyclePage((p) => Math.max(1, p - 1))}
                  className="disabled:opacity-40"
                >
                  Previous
                </button>
                <span>
                  Page {lifecyclePagination.currentPage} of{" "}
                  {lifecyclePagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={
                    lifecyclePage >= lifecyclePagination.totalPages ||
                    !lifecyclePagination.nextPage
                  }
                  onClick={() =>
                    setLifecyclePage((p) =>
                      Math.min(lifecyclePagination.totalPages, p + 1),
                    )
                  }
                  className="disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-white/10 bg-[#0E0E1A] p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
              Details
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-white/45">Opened</dt>
                <dd className="mt-0.5 text-white">
                  {formatTicketDateTime(ticket.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Last updated</dt>
                <dd className="mt-0.5 text-white">
                  {formatTicketDateTime(ticket.updatedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Category</dt>
                <dd className="mt-0.5 text-white">
                  {ticket.category?.name || "—"}
                  {ticket.subCategory?.name
                    ? ` · ${ticket.subCategory.name}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Location</dt>
                <dd className="mt-0.5 text-white">{ticket.location || "—"}</dd>
              </div>
              <div>
                <dt className="text-white/45">Reporter</dt>
                <dd className="mt-0.5 text-white">
                  {ticket.reporterName || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">Cover</dt>
                <dd className="mt-0.5 text-white">
                  {getEntitlementLabel(ticket.entitlementSource)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#0E0E1A] p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
              Assigned responder
            </h2>
            {ticket.assignedResponder ? (
              <div>
                <p className="font-medium text-white">
                  {formatStaffName(ticket.assignedResponder)}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  {ticket.assignedResponder.role?.replace(/_/g, " ")}
                </p>
              </div>
            ) : (
              <p className="text-sm text-white/50">Not assigned yet</p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
