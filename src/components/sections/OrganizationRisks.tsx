"use client";

export default function OrganizationRisks() {
  const risks = [
    {
      risk: "Network Intrusion",
      impact: "High",
      impactColor: "bg-[#D00F24]",
      mitigation: "Network segmentation, IDS/IPS, Regular audits",
    },
    {
      risk: "Ransomware Attack",
      impact: "Critical",
      impactColor: "bg-[#D00F24]",
      mitigation: "Backup strategy, Endpoint protection, User training",
    },
    {
      risk: "Data Breach",
      impact: "High",
      impactColor: "bg-[#D00F24]",
      mitigation: "Encryption, Access controls, DLP solutions",
    },
    {
      risk: "DDoS Attack",
      impact: "Medium",
      impactColor: "bg-[#FF7143]",
      mitigation: "CDN, Rate limiting, DDoS protection service",
    },
    {
      risk: "Insider Threat",
      impact: "Medium",
      impactColor: "bg-[#FF7143]",
      mitigation: "Access monitoring, Least privilege, Employee screening",
    },
  ];

  return (
    <div className="border border-white/10 bg-[#0E0E1A] rounded-xl p-6">
      {/* Header */}
      <h2 className="text-white font-semibold text-center text-lg mb-6">
        Organization-Level Risks
      </h2>

      {/* Sub Headers */}
      <div className="grid grid-cols-3 gap-4 mb-3">
        <p className="text-white text-xs font-semibold text-center">
          Organizational Risk
        </p>
        <p className="text-white text-xs font-semibold text-center">Impact</p>
        <p className="text-white text-xs font-semibold text-center">
          Mitigation Strategy
        </p>
      </div>

      {/* Risk Rows */}
      <div className="grid gap-3">
        {risks.map((r, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 items-stretch">
            {/* Organizational Risk */}
            <div className="bg-[#D9D9D9]/50 rounded-lg text-white text-center flex items-center justify-center p-4 h-full font-semibold text-xs">
              {r.risk}
            </div>

            {/* Impact */}
            <div
              className={`rounded-lg text-white font-semibold text-center flex items-center justify-center text-xs ${r.impactColor} p-4 h-full`}
            >
              {r.impact}
            </div>

            {/* Mitigation Strategy */}
            <div className="bg-[#D9D9D9]/50 rounded-lg text-white text-center flex items-center justify-center p-4 h-full font-semibold text-xs">
              {r.mitigation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
