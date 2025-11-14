"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
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
  const { transactions, isLoading, fetchTransactions } = useSubscriptionStore();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Only fetch if we haven't fetched yet
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchTransactions();
    }
  }, [fetchTransactions]);

  const statusClasses: { [key: string]: string } = {
    Success: "bg-[#15CA40]/75",
    Pending: "bg-[#FBBF24]/80",
    Failed: "bg-[#EF4444]/90",
  };

  if (isLoading && transactions.length === 0) {
    return (
      <div className="overflow-auto mt-2 ml-4 mr-4 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4185DD] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0 && !isLoading) {
    return (
      <div className="overflow-auto mt-2 ml-4 mr-4 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-300">No transactions found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-auto mt-2 ml-4 mr-4">
      {/* Table */}
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
          {transactions.map((transaction) => {
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

      {/* Pagination - Commented out for now */}
      {/* <div className="flex items-center justify-center mt-6 gap-4 text-white text-sm">
          <Link href="/#">
            <button
              disabled={page === 1}
              className="flex flex-row disabled:opacity-40"
            >
              <Image
                src="/images/white-left.svg"
                alt="Previous"
                width={20}
                height={20}
                className="mr-2"
              />
              <p>Previous</p>
            </button>
          </Link>
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-6 h-6 rounded-md flex items-center justify-center ${
                  num === page
                    ? "bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA] transition-all cursor-pointer text-white"
                    : "hover:opacity-90"
                }`}
              >
                {num}
              </button>
            ))}
            <p>....</p>
          </div>
          <Link href="/#">
            <button className="flex flex-row disabled:opacity-40">
              <p>Next</p>
              <Image
                src="/images/arrow-right-vector.svg"
                alt="Next"
                width={15}
                height={15}
                className="ml-2"
              />
            </button>
          </Link>
        </div> */}
    </div>
  );
}
