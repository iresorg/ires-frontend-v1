"use client";

import DashboardPanel from "@/components/ui/DashboardPanel";

export default function IndividualRisks() {
  const risks = [
    {
      risk: "Phishing",
      impact: "Medium",
      impactClass: "bg-[#F97316]/20 text-[#FDBA74] ring-[#F97316]/30",
      mitigation: "MFA, phishing training, verify sender",
    },
    {
      risk: "Social media doxxing/scams",
      impact: "Low",
      impactClass: "bg-[#22C55E]/20 text-[#86EFAC] ring-[#22C55E]/30",
      mitigation: "Privacy settings, limit PII shares",
    },
    {
      risk: "Sim swap/SMS-OTP compromise",
      impact: "High",
      impactClass: "bg-[#EF4444]/20 text-[#FCA5A5] ring-[#EF4444]/30",
      mitigation: "App-based 2FA, contact telco lock",
    },
  ];

  return (
    <DashboardPanel title="Individual-Level Risks">
      <div className="mb-3 hidden grid-cols-3 gap-3 text-[11px] font-semibold uppercase tracking-wider text-white/40 sm:grid">
        <p>Personal risk</p>
        <p className="text-center">Impact</p>
        <p className="text-right">Quick mitigation</p>
      </div>

      <div className="space-y-2.5">
        {risks.map((r) => (
          <div
            key={r.risk}
            className="grid grid-cols-1 gap-2 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5 sm:grid-cols-3 sm:items-center sm:gap-3"
          >
            <p className="text-sm font-medium text-white">{r.risk}</p>
            <div className="flex sm:justify-center">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${r.impactClass}`}
              >
                {r.impact}
              </span>
            </div>
            <p className="text-xs text-white/60 sm:text-right sm:text-sm">
              {r.mitigation}
            </p>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}
