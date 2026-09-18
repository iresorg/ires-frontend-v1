"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";

function isRouteActive(pathname: string, href: string) {
  if (href === "/dashboard" || href === "/dashboard/organization") {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

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
      name: "Transaction History",
      icon: "/images/transaction.png",
      href: "/dashboard/transaction-history",
    },
    {
      name: "Ticket Incident History",
      icon: "/images/ticket.png",
      href: "/dashboard/ticket-incident-history",
    },
    {
      name: "Profile & Settings",
      icon: "/images/overview.png",
      href: "/dashboard/settings",
    },
  ];

  const organizationMenu = [
    {
      name: "Overview",
      icon: "/images/overview.png",
      href: "/dashboard/organization",
    },
    {
      name: "Subscription Plans",
      icon: "/images/renewal.png",
      href: "/dashboard/organization/subscription-plans",
    },
    {
      name: "Transaction History",
      icon: "/images/transaction.png",
      href: "/dashboard/organization/transaction-history",
    },
    {
      name: "Ticket Incident History",
      icon: "/images/ticket.png",
      href: "/dashboard/organization/ticket-incident-history",
    },
    {
      name: "Profile & Settings",
      icon: "/images/overview.png",
      href: "/dashboard/organization/settings",
    },
  ];

  const supportItems = [
    { name: "Call Now", icon: "/images/phone-call.png", href: "tel:+2348100000000" },
    { name: "Email", icon: "/images/email.png", href: "mailto:support@iresorg.com" },
  ];

  const menuItems =
    user?.role === "organization" ? organizationMenu : individualMenu;

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-[#141327] px-3 py-6">
      <div className="flex grow flex-col">
        <Link href="/" className="mb-8 flex items-center gap-2 px-3 transition hover:opacity-90">
          <Image
            src="/logos/ires-logo.svg"
            alt="iRES Logo"
            width={48}
            height={48}
            className="h-11 w-11"
          />
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = isRouteActive(pathname, item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(65,133,221,0.35)]"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && (
                  <span
                    className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full"
                    style={{ background: "var(--btn-bg)" }}
                  />
                )}
                <Image
                  src={item.icon}
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-90"
                />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
          Support
        </p>
        {supportItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
          >
            <Image src={item.icon} alt="" width={18} height={18} />
            {item.name}
          </a>
        ))}
      </div>
    </aside>
  );
}
