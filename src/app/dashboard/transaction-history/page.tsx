"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useSubscriptionStore } from "@/store/subscription";
import { formatKoboToNaira } from "@/services/subscription";

// Format date and time
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${year}-${month}-${day} ${displayHours}:${minutes}${ampm}`;
};

// Map status to display format
const mapStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    success: "Success",
    pending: "Pending",
    failed: "Failed",
  };
  return statusMap[status.toLowerCase()] || status;
};

export default function TransactionHistory() {
  const { user } = useAuthStore();
  const { transactions, transactionsPagination, isLoading, fetchTransactions } =
    useSubscriptionStore();
  const [page, setPage] = useState(1);
  const limit = 10;
  const hasFetchedRef = useRef(false);

  const plansHref =
    user?.role === "organization"
      ? "/dashboard/organization/subscription-plans"
      : "/dashboard/subscription-plans";

  useEffect(() => {
    // Fetch transactions when page changes
    fetchTransactions(page, limit);
    hasFetchedRef.current = true;
  }, [page, fetchTransactions]);

  const statusClasses: { [key: string]: string } = {
    Success: "bg-[#22C55E]/20 text-[#86EFAC] ring-1 ring-[#22C55E]/30",
    Pending: "bg-[#EAB308]/20 text-[#FDE047] ring-1 ring-[#EAB308]/30",
    Failed: "bg-[#EF4444]/20 text-[#FCA5A5] ring-1 ring-[#EF4444]/30",
  };

  if (isLoading && (!transactions || transactions.length === 0)) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--accent-color)]" />
          <p className="text-white/60">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if ((!transactions || transactions.length === 0) && !isLoading) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Transaction history
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Subscription and pay-as-you-go charges
          </p>
        </div>

        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl bg-[#141327]/90 px-6 py-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Image
              src="/images/transaction.png"
              alt=""
              width={28}
              height={28}
              className="opacity-80"
            />
          </div>
          <h2 className="text-lg font-semibold text-white">No transactions yet</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
            You haven&apos;t made any payments. Subscribe to a plan or buy a
            pay-as-you-go credit to get incident response cover — your charges
            will show up here.
          </p>
          <Link
            href={plansHref}
            className="mt-6 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: "var(--btn-bg)" }}
          >
            View subscription plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Transaction history
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Subscription and pay-as-you-go charges
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-[#141327]/90 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 md:block">
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 text-white/50">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                Transaction Reference
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                Plan Name
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                Amount Paid
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="">
            {(transactions || []).map((transaction) => {
              const displayStatus = mapStatus(transaction.status);
              return (
              <tr
                  key={transaction.id}
                className="border-b border-white/10 text-white/75 transition hover:bg-white/[0.03]"
              >
                  <td className="px-4 py-3 font-medium text-white">{transaction.transactionReference}</td>
                <td className="px-4 py-3 text-center">
                    {transaction.plan?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-center">
                    {formatDateTime(transaction.date)}
                </td>
                <td className="px-4 py-3 text-center">
                    {formatKoboToNaira(transaction.amount)}
                </td>
                <td className="px-4 py-3 text-center text-white">
                    <span
                        className={`inline-block rounded-lg px-2.5 py-1 text-xs font-medium ${statusClasses[displayStatus] || "bg-neutral-800"
                      }`}
                    >
                        {displayStatus}
                    </span>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 space-y-3 md:hidden">
        {(transactions || []).map((transaction) => {
          const displayStatus = mapStatus(transaction.status);
          return (
            <div
              key={transaction.id}
              className="space-y-3 rounded-xl bg-[#141327]/90 p-4 ring-1 ring-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-1 text-xs text-white/50">Transaction Reference</p>
                  <p className="text-sm font-medium text-white">{transaction.transactionReference}</p>
                </div>
                  <span
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium ${statusClasses[displayStatus] || "bg-neutral-800"
                      }`}
                  >
                    {displayStatus}
                  </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="mb-1 text-xs text-white/50">Plan Name</p>
                  <p className="text-sm text-white">{transaction.plan?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-white/50">Amount Paid</p>
                  <p className="text-sm text-white">{formatKoboToNaira(transaction.amount)}</p>
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs text-white/50">Date & Time</p>
                <p className="text-sm text-white">{formatDateTime(transaction.date)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination - Works for both table and card layouts */}
      {transactionsPagination && transactionsPagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-3 sm:gap-4 text-white text-xs sm:text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex flex-row items-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/white-left.svg"
                alt="Previous"
                width={20}
                height={20}
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
              />
            <p className="hidden sm:inline">Previous</p>
            <p className="sm:hidden">Prev</p>
            </button>
          <div className="flex gap-1.5 sm:gap-2 items-center flex-wrap justify-center">
            {Array.from({ length: transactionsPagination.totalPages }, (_, i) => i + 1)
              .filter((num) => {
                // Show first page, last page, current page, and pages around current
                if (num === 1) return true;
                if (num === transactionsPagination.totalPages) return true;
                if (Math.abs(num - page) <= 1) return true;
                return false;
              })
              .map((num, idx, arr) => {
                // Add ellipsis if there's a gap
                const prevNum = arr[idx - 1];
                const showEllipsisBefore = prevNum && num - prevNum > 1;
                return (
                  <div key={num} className="flex items-center gap-1 sm:gap-2">
                    {showEllipsisBefore && <span className="text-white/50 text-xs">...</span>}
              <button
                onClick={() => setPage(num)}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center transition-all text-xs sm:text-sm ${num === page
                        ? "bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] text-white cursor-pointer"
                        : "hover:opacity-90 cursor-pointer"
                }`}
              >
                {num}
              </button>
                  </div>
                );
              })}
          </div>
          <button
            onClick={() =>
              setPage((p) =>
                Math.min(transactionsPagination.totalPages, p + 1)
              )
            }
            disabled={page === transactionsPagination.totalPages || !transactionsPagination.nextPage}
            className="flex flex-row items-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
          >
              <p>Next</p>
              <Image
                src="/images/arrow-right-vector.svg"
                alt="Next"
                width={15}
                height={15}
              className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"
              />
            </button>
        </div>
      )}
      </div>
  );
}
