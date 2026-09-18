"use client";

import Image from "next/image";
import DashboardPanel from "@/components/ui/DashboardPanel";

export default function TTPs() {
  const items = [
    {
      iconBefore: "/images/instagram.png",
      text: "Social Engineering & Phishing",
      iconAfter: "/images/arrow-up.png",
    },
    {
      iconBefore: "/images/threat-browser.png",
      text: "Ransomware (Fragmentation)",
      iconAfter: "/images/arrow-down.png",
    },
    {
      iconBefore: "/images/supply-chain.png",
      text: "Supply Chain Intrusions",
      iconAfter: "/images/arrow-right-vector.svg",
    },
    {
      iconBefore: "/images/application.png",
      text: "Web/Application Exploitation",
      iconAfter: "/images/arrow-right-vector.svg",
    },
  ];

  return (
    <DashboardPanel title="Dominant Attacker TTPs">
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.text}
            className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/5 transition hover:bg-white/[0.06]"
          >
            <Image
              src={item.iconBefore}
              alt=""
              width={16}
              height={16}
              className="shrink-0"
            />
            <span className="flex-1 text-sm text-white/80">{item.text}</span>
            <Image
              src={item.iconAfter}
              alt=""
              width={14}
              height={14}
              className="shrink-0 opacity-70"
            />
          </li>
        ))}
      </ul>
    </DashboardPanel>
  );
}
