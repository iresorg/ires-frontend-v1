"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSubscriptionStore } from "@/store/subscription";

// Format amount to naira (backend stores amount in units that need to be divided by 100)
const formatPrice = (amount: string): string => {
  const amountInSmallestUnit = parseInt(amount, 10);
  const amountInNaira = amountInSmallestUnit / 100;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountInNaira);
};

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
  const { transactions, transactionsPagination, isLoading, fetchTransactions } =
    useSubscriptionStore();
  const [page, setPage] = useState(1);
  const limit = 10;
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Fetch transactions when page changes
    fetchTransactions(page, limit);
    hasFetchedRef.current = true;
  }, [page, fetchTransactions]);

  const statusClasses: { [key: string]: string } = {
    Success: "bg-[#15CA40]/75",
    Pending: "bg-[#FBBF24]/80",
    Failed: "bg-[#EF4444]/90",
  };

  if (isLoading && (!transactions || transactions.length === 0)) {
    return (
      <div className="mt-2 ml-2 sm:ml-4 mr-2 sm:mr-4 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4185DD] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if ((!transactions || transactions.length === 0) && !isLoading) {
    return (
      <div className="mt-2 ml-2 sm:ml-4 mr-2 sm:mr-4 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-300">No transactions found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 ml-2 sm:ml-4 mr-2 sm:mr-4">
      {/* Desktop Table - Hidden on md and below */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-100/20 text-gray-300">
              <th className="px-4 py-3 font-medium">Transaction Reference</th>
              <th className="pl-10 px-4 py-3 font-medium text-center">
                Plan Name
              </th>
              <th className="pl-10 px-4 py-3 font-medium text-center">
                Date & Time
              </th>
              <th className="pl-10 px-4 py-3 font-medium text-center">
                Amount Paid
              </th>
              <th className="pl-5 px-4 py-3 font-medium text-center">
                Status Badge
              </th>
            </tr>
          </thead>
          <tbody className="">
            {(transactions || []).map((transaction) => {
              const displayStatus = mapStatus(transaction.status);
              return (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-100/20 text-gray-300 hover:bg-neutral-900/50 transition"
                >
                  <td className="px-4 py-3">{transaction.transactionReference}</td>
                  <td className="pl-10 px-4 py-3 text-center">
                    {transaction.plan?.name || "N/A"}
                  </td>
                  <td className="pl-10 px-4 py-3 text-center">
                    {formatDateTime(transaction.date)}
                  </td>
                  <td className="pl-10 px-4 py-3 text-center">
                    {formatPrice(transaction.amount)}
                  </td>
                  <td className="px-4 py-3 text-center text-white">
                    <Link href={`/dashboard/transaction-history/`}>
                      <button
                        className={`text-sm transition px-2 py-2 rounded-lg cursor-pointer ${statusClasses[displayStatus] || "bg-neutral-800"
                          }`}
                      >
                        {displayStatus}
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout - Visible on md and below */}
      <div className="md:hidden space-y-3">
        {(transactions || []).map((transaction) => {
          const displayStatus = mapStatus(transaction.status);
          return (
            <div
              key={transaction.id}
              className="border border-white/10 bg-[#0E0E1A] rounded-lg p-4 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-xs text-white/70 mb-1">Transaction Reference</p>
                  <p className="text-sm text-white font-medium">{transaction.transactionReference}</p>
                </div>
                <Link href={`/dashboard/transaction-history/`}>
                  <button
                    className={`text-xs transition px-3 py-1.5 rounded-lg cursor-pointer ${statusClasses[displayStatus] || "bg-neutral-800"
                      }`}
                  >
                    {displayStatus}
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-white/70 mb-1">Plan Name</p>
                  <p className="text-sm text-white">{transaction.plan?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-white/70 mb-1">Amount Paid</p>
                  <p className="text-sm text-white">{formatPrice(transaction.amount)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-white/70 mb-1">Date & Time</p>
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
