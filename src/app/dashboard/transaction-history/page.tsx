"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TransactionHistory() {
const [page, setPage] = useState(1);

  const transactions = [
    {
      txRef: "Tx_1234567890",
      planName: "Basic Shield",
      dateTime: "2025-11-03 12:16AM",
      amount: "₦15,000.00",
      status: "Success",
    },
    {
      txRef: "Tx_1234567893",
      planName: "Total Lock-down",
      dateTime: "2025-10-25 10:35PM",
      amount: "₦35,000.00",
      status: "Pending",
    },
    {
      txRef: "Tx_1234567895",
      planName: "Basic Shield",
      dateTime: "2025-10-22 09:57AM",
      amount: "₦15,000.00",
      status: "Failed",
    },
    {
      txRef: "Tx_1234567894",
      planName: "Safe Guard",
      dateTime: "2025-10-15 02:03AM",
      amount: "₦30,000.00",
      status: "Success",
    },
    {
      txRef: "Tx_1234567897",
      planName: "Basic Shield",
      dateTime: "2025-09-30 07:47PM",
      amount: "₦15,000.00",
      status: "Success",
    },
  ];

  const statusClasses: { [key: string]: string } = {
    Success: "bg-[#15CA40]/75",
    Pending: "bg-[#FBBF24]/80",
    Failed: "bg-[#EF4444]/90",
  };

  return (
      <div className="overflow-auto mt-2 ml-4 mr-4">
        {/* Table */}
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="border-b-1 border-gray-100/20 text-gray-300">
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
            {transactions.map((transaction, idx) => (
              <tr
                key={idx}
                className="border-b-1 border-gray-100/20 text-gray-300 hover:bg-neutral-900/50 transition"
              >
                <td className="px-4 py-3">{transaction.txRef}</td>
                <td className="pl-10 px-4 py-3 text-center">
                  {transaction.planName}
                </td>
                <td className="pl-10 px-4 py-3 text-center">
                  {transaction.dateTime}
                </td>
                <td className="pl-10 px-4 py-3 text-center">
                  {transaction.amount}
                </td>
                <td className="px-4 py-3 text-center text-white">
                  <Link href={`/dashboard/transaction-history/`}>
                    <button
                      className={`text-sm transition px-2 py-2 rounded-lg cursor-pointer ${
                        statusClasses[transaction.status] || "bg-neutral-800"
                      }`}
                    >
                      {transaction.status}
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-6 gap-4 text-white text-sm">
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
        </div>
      </div>
  );
}
