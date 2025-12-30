"use client";

import Image from "next/image";

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
    <div className="rounded-xl p-5 border-white/10 bg-[#0E0E1A] border-1 ">
      <h2 className="text-white font-semibold mb-3 text-lg">
        Top-3 Emerging Threats (2025)
      </h2>

      <ul className="text-sm text-white divide-y divide-white/10 space-y-4 font-mono">
        {threats.map((item, index) => (
          <li key={index} className="flex items-center py-2">
            <Image
              src={item.icon}
              alt="threat icon"
              width={18}
              height={18}
              className="mr-3 flex-shrink-0"
            />
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
