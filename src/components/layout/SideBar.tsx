"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const individualMenu = [
    { name: "Overview", icon: "/images/overview.png", href: "/dashboard" },
    {
      name: "Subscription Plans",
      icon: "/images/renewal.png",
      href: "/dashboard/subscription-plans",
    },
    {
      name: "Subscription Success",
      icon: "/images/renew-subscription.png",
      href: "/dashboard/subscription-success",
    },
    {
      name: "Transaction History",
      icon: "/images/transaction.png",
      href: "/dashboard/transaction-history",
    },
    {
      name: "Ticket Incident History",
      icon: "/images/ticket.png",
      href: "/dashboard/ticket-incident-history",
    },
  ];

  const organizationMenu = [
    { name: "Overview", icon: "/images/overview.png", href: "/organization" },
    {
      name: "Subscription Plans",
      icon: "/images/renewal.png",
      href: "/organization/subscription-plans",
    },
    {
      name: "Subscription Success",
      icon: "/images/renew-subscription.png",
      href: "/organization/subscription-success",
    },

    {
      name: "Transaction History",
      icon: "/images/transaction.png",
      href: "/organization/transaction-history",
    },
    {
      name: "Ticket Incident History",
      icon: "/images/ticket.png",
      href: "/organization/ticket-incident-history",
    },
  ];

  const supportItems = [
    { name: "Call Now", icon: "/images/phone-call.png" },
    { name: "Email", icon: "/images/email.png" },
  ];

  const menuItems =
    user?.role === "organization" ? organizationMenu : individualMenu;

  return (
    <aside className="w-64 h-full bg-[#383754] flex flex-col py-6 px-4 border-r border-white/5">
      {/* Top Section (Logo + Menu) */}
      <div className="flex flex-col flex-grow">
        {/* Logo */}
        <div className="flex items-center mb-8 pl-2">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={55}
            height={55}
          />
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all ${isActive
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
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section (Support) */}
      <div className="space-y-2 mt-auto">
        {supportItems.map((item) => (
          <button
            key={item.name}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <Image src={item.icon} alt={item.name} width={18} height={18} />
            {item.name}
          </button>
        ))}
      </div>
    </aside>
  );
}
