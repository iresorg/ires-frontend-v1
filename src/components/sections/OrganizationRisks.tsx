"use client";

import DashboardPanel from "@/components/ui/DashboardPanel";

export default function OrganizationRisks() {
  const risks = [
    {
      risk: "Network Intrusion",
      impact: "High",
      impactClass: "bg-[#EF4444]/20 text-[#FCA5A5] ring-[#EF4444]/30",
      mitigation: "Network segmentation, IDS/IPS, regular audits",
    },
    {
      risk: "Ransomware Attack",
      impact: "Critical",
      impactClass: "bg-[#EF4444]/20 text-[#FCA5A5] ring-[#EF4444]/30",
      mitigation: "Backup strategy, endpoint protection, user training",
    },
    {
      risk: "Data Breach",
      impact: "High",
      impactClass: "bg-[#EF4444]/20 text-[#FCA5A5] ring-[#EF4444]/30",
      mitigation: "Encryption, access controls, DLP solutions",
    },
    {
      risk: "DDoS Attack",
      impact: "Medium",
      impactClass: "bg-[#F97316]/20 text-[#FDBA74] ring-[#F97316]/30",
      mitigation: "CDN, rate limiting, DDoS protection service",
    },
    {
      risk: "Insider Threat",
      impact: "Medium",
      impactClass: "bg-[#F97316]/20 text-[#FDBA74] ring-[#F97316]/30",
      mitigation: "Access monitoring, least privilege, screening",
    },
  ];

  return (
    <DashboardPanel title="Organization-Level Risks">
      <div className="mb-3 hidden grid-cols-3 gap-3 text-[11px] font-semibold uppercase tracking-wider text-white/40 sm:grid">
        <p>Organizational risk</p>
        <p className="text-center">Impact</p>
        <p className="text-right">Mitigation strategy</p>
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
