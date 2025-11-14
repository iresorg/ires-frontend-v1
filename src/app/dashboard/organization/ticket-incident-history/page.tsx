"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function OrganizationTicketIncidentHistory() {
  const [page, setPage] = useState(1);
  const showComingSoon = true; // Set to false when ready to show the table

  const tickets = [
    {
      id: "TKT-007",
      status: "Pending",
      date: "2025-11-23",
      timestamp: "30 Minutes Ago",
    },
    {
      id: "TKT-032",
      status: "Escalated",
      date: "2025-11-17",
      timestamp: "10:32PM",
    },
    {
      id: "TKT-015",
      status: "Resolved",
      date: "2025-11-06",
      timestamp: "9:15AM",
    },
    {
      id: "TKT-002",
      status: "In Progress",
      date: "2025-10-25",
      timestamp: "4:34PM",
    },
    {
      id: "TKT-064",
      status: "Assigned",
      date: "2025-10-13",
      timestamp: "12:09AM",
    },
  ];

  if (showComingSoon) {
    return (
      <div className="overflow-auto mt-2 flex items-center justify-center min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 flex justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-linear-to-r from-[#4185DD] to-[#B425DA] flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </motion.div>

          {/* Text */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent mb-4">
            Coming Soon
          </h2>
          <p className="text-gray-300 text-lg mb-2">
            Ticket & Incident History
          </p>
          <p className="text-gray-400 text-sm">
            We&apos;re working on bringing you a comprehensive ticket and incident tracking system.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="overflow-auto mt-2">
      {/* Table */}
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="border-b border-gray-100/20 text-gray-300">
            <th className="px-4 py-3 font-medium">Ticket ID</th>
            <th className="pl-10 px-4 py-3 font-medium">Status</th>
            <th className="pl-10 px-4 py-3 font-medium">Date</th>
            <th className="pl-10 px-4 py-3 font-medium">Timestamp</th>
            <th className="pl-10 px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {tickets.map((ticket, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-100/20 text-gray-300 hover:bg-neutral-900/50 transition"
            >
              <td className="px-4 py-3 ">{ticket.id}</td>
              <td className="pl-10 px-4 py-3">{ticket.status}</td>
              <td className="pl-10 px-4 py-3">{ticket.date}</td>
              <td className="pl-10 px-4 py-3">{ticket.timestamp}</td>
              <td className="px-4 py-3">
                <Link href={`/dashboard/organization/ticket-incident-history/${ticket.id}`}>
                  <button className="text-sm bg-neutral-800 hover:bg-neutral-700 transition px-3 py-3 rounded-md cursor-pointer">
                    More Details
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
              className={`w-6 h-6 rounded-md flex items-center justify-center ${num === page
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
