"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTicketsStore } from "@/store/tickets";
import {
  TICKET_STATUS_FILTERS,
  formatTicketDate,
  getEntitlementLabel,
  getSeverityBadgeClass,
  getTicketStatusBadgeClass,
  getTicketStatusLabel,
  type TicketStatus,
} from "@/services/tickets";

type TicketIncidentHistoryProps = {
  /** Base path for detail links, e.g. /dashboard/ticket-incident-history */
  basePath: string;
};

function TicketsSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-20 animate-pulse rounded-xl border border-white/10 bg-white/5"
        />
      ))}
    </div>
  );
}

function StatusFilter({
  value,
  onChange,
}: {
  value: TicketStatus | "";
  onChange: (value: TicketStatus | "") => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected =
    TICKET_STATUS_FILTERS.find((option) => option.value === value) ??
    TICKET_STATUS_FILTERS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative w-full sm:w-56" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 rounded-xl bg-[#141327] px-4 py-2.5 text-left text-sm text-white ring-1 ring-white/10 transition hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]/40"
      >
        <span className="truncate">{selected.label}</span>
        <Image
          src="/images/white-dropdown.png"
          alt=""
          width={12}
          height={12}
          className={`shrink-0 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full right-0 z-30 mt-2 max-h-72 w-full min-w-[220px] overflow-y-auto rounded-xl bg-[#141327] py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/10"
        >
          {TICKET_STATUS_FILTERS.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value || "all"}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition ${
                    isSelected
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--accent-color)" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function TicketIncidentHistory({
  basePath,
}: TicketIncidentHistoryProps) {
  const { tickets, pagination, isLoading, error, fetchTickets } =
    useTicketsStore();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<TicketStatus | "">("");
  const limit = 10;

  useEffect(() => {
    fetchTickets({
      page,
      limit,
      status: status || undefined,
    });
  }, [page, status, fetchTickets]);

  const handleStatusChange = (value: TicketStatus | "") => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            My incidents
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Track tickets opened for your account. Read-only — updates arrive by
            email as responders progress.
          </p>
        </div>

        <StatusFilter value={status} onChange={handleStatusChange} />
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {isLoading && tickets.length === 0 ? (
        <TicketsSkeleton />
      ) : !isLoading && tickets.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl bg-[#141327]/90 px-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
          <div className="text-center">
            <Image
              src="/images/ticket.png"
              alt=""
              width={40}
              height={40}
              className="mx-auto mb-3 opacity-70"
            />
            <p className="text-gray-300">No incidents found.</p>
            <p className="mt-1 text-sm text-white/50">
              When our team opens a ticket for you, it will appear here.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl bg-[#141327]/90 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 md:block">
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-white/50">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Ticket</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">Severity</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">Opened</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">Cover</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.ticketId}
                    className="border-b border-white/10 text-white/75 transition hover:bg-white/[0.03]"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{ticket.title}</p>
                      <p className="mt-0.5 text-xs text-white/50">
                        {ticket.ticketId}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-lg px-2.5 py-1 text-xs text-white ${getTicketStatusBadgeClass(ticket.status)}`}
                      >
                        {getTicketStatusLabel(ticket.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block rounded-lg px-2.5 py-1 text-xs text-white ${getSeverityBadgeClass(ticket.severity)}`}
                      >
                        {ticket.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {formatTicketDate(ticket.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {ticket.category?.name || "—"}
                      {ticket.subCategory?.name
                        ? ` · ${ticket.subCategory.name}`
                        : ""}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {getEntitlementLabel(ticket.entitlementSource)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`${basePath}/${encodeURIComponent(ticket.ticketId)}`}
                        className="text-sm font-medium transition hover:opacity-80"
                        style={{ color: "var(--accent-color)" }}
                      >
                        More details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {tickets.map((ticket) => (
              <Link
                key={ticket.ticketId}
                href={`${basePath}/${encodeURIComponent(ticket.ticketId)}`}
                className="block rounded-xl bg-[#141327]/90 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)] ring-1 ring-white/10 transition hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">
                      {ticket.title}
                    </p>
                    <p className="mt-0.5 text-xs text-white/50">
                      {ticket.ticketId}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-lg px-2.5 py-1 text-xs text-white ${getTicketStatusBadgeClass(ticket.status)}`}
                  >
                    {getTicketStatusLabel(ticket.status)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
                  <span
                    className={`rounded-lg px-2 py-1 text-white ${getSeverityBadgeClass(ticket.severity)}`}
                  >
                    {ticket.severity}
                  </span>
                  <span>Opened {formatTicketDate(ticket.createdAt)}</span>
                  {ticket.category?.name && (
                    <span>· {ticket.category.name}</span>
                  )}
                  <span>
                    · {getEntitlementLabel(ticket.entitlementSource)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-6 flex flex-col items-center justify-center gap-3 text-xs text-white sm:flex-row sm:gap-4 sm:text-sm">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || !pagination.prevPage}
                className="flex flex-row items-center transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Image
                  src="/images/white-left.svg"
                  alt="Previous"
                  width={20}
                  height={20}
                  className="mr-1 h-4 w-4 sm:mr-2 sm:h-5 sm:w-5"
                />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((num) => {
                    if (num === 1) return true;
                    if (num === pagination.totalPages) return true;
                    if (Math.abs(num - page) <= 1) return true;
                    return false;
                  })
                  .map((num, idx, arr) => {
                    const prevNum = arr[idx - 1];
                    const showEllipsisBefore = prevNum && num - prevNum > 1;
                    return (
                      <div key={num} className="flex items-center gap-1 sm:gap-2">
                        {showEllipsisBefore && (
                          <span className="text-xs text-white/50">...</span>
                        )}
                        <button
                          type="button"
                          onClick={() => setPage(num)}
                          className={`flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all sm:h-8 sm:w-8 sm:text-sm ${
                            num === page
                              ? "cursor-pointer text-white"
                              : "cursor-pointer hover:opacity-90"
                          }`}
                          style={
                            num === page
                              ? { background: "var(--btn-bg)" }
                              : undefined
                          }
                        >
                          {num}
                        </button>
                      </div>
                    );
                  })}
              </div>

              <button
                type="button"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={
                  page === pagination.totalPages || !pagination.nextPage
                }
                className="flex flex-row items-center transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>Next</span>
                <Image
                  src="/images/arrow-right-vector.svg"
                  alt="Next"
                  width={15}
                  height={15}
                  className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4"
                />
              </button>
            </div>
          )}

          {isLoading && tickets.length > 0 && (
            <p className="mt-3 text-center text-xs text-white/40">Updating…</p>
          )}
        </>
      )}
    </div>
  );
}
