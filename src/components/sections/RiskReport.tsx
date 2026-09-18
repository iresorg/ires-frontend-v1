"use client";

import DashboardPanel from "@/components/ui/DashboardPanel";

export default function RisksReport() {
  const risks = [
    { industry: "Banking & Financial Services", score: 9.0 },
    { industry: "Telecoms & ISPs", score: 8.5 },
    { industry: "Government & Public Sector", score: 8.0 },
    { industry: "Oil & Gas / Energy", score: 7.8 },
    { industry: "Healthcare", score: 7.6 },
    { industry: "Education", score: 7.2 },
    { industry: "Retail & E-Commerce", score: 6.2 },
    { industry: "Agriculture / Agritech", score: 5.0 },
    { industry: "Small & Micro Businesses", score: 6.8 },
  ];

  const scoreColor = (score: number) => {
    if (score >= 8.5) return "text-[#FCA5A5]";
    if (score >= 7) return "text-[#FDBA74]";
    return "text-[#86EFAC]";
  };

  return (
    <DashboardPanel title="Risk Reports">
      <div className="mb-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-white/40">
        <span>Industry</span>
        <span>Score</span>
      </div>
      <div className="space-y-1.5">
        {risks.map((r) => (
          <div
            key={r.industry}
            className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 transition hover:bg-white/[0.04]"
          >
            <p className="text-xs text-white/80">{r.industry}</p>
            <p className={`text-xs font-semibold tabular-nums ${scoreColor(r.score)}`}>
              {r.score.toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}
