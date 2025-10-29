"use client";

import { useState } from "react";
import Image from "next/image";

const menuItems = [
  { name: "Overview", icon: "/images/overview.png" },
  { name: "Subscription Plans", icon: "/images/renewal.png" },
  { name: "Transaction History", icon: "/images/transaction.png" },
  { name: "Ticket Incident History", icon: "/images/ticket.png" },
];

const supportItems = [
  { name: "Call Now", icon: "/images/phone-call.png" },
  { name: "Email", icon: "/images/email.png" },
];

export default function Sidebar() {
  const [active, setActive] = useState("Overview");

  return (
    <aside className="w-64 h-full bg-[#383754] flex flex-col justify-between py-6 px-4 border-r border-white/5">
      <div>
        {/* Logo */}
        <div className="flex items-center mb-10 pl-2">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = active === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#4185DD] via-[#5D207F] to-[#B425DA]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={18}
                  height={18}
                  className="opacity-90"
                />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Support Section */}
      <div className="space-y-2 pt-4">
        {supportItems.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={18}
              height={18}
              className={item.name === "Call Now" ? "text-red-500" : ""}
            />
            {item.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
