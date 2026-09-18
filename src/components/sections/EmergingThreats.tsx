"use client";

import Image from "next/image";
import DashboardPanel from "@/components/ui/DashboardPanel";

export default function EmergingThreats() {
  const threats = [
    {
      icon: "/images/ai-brain.png",
      text: "AI-Augmented Social Engineering",
    },
    {
      icon: "/images/application.png",
      text: "Ransomware Diversification & Extortion",
    },
    {
      icon: "/images/cloud.png",
      text: "Identity & Cloud Compromise",
    },
  ];

  return (
    <DashboardPanel title="Top Emerging Threats">
      <ul className="divide-y divide-white/10">
        {threats.map((item) => (
          <li key={item.text} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10">
              <Image src={item.icon} alt="" width={16} height={16} />
            </div>
            <span className="text-sm text-white/80">{item.text}</span>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  );
}
