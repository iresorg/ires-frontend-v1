"use client";

export default function IndividualRisks() {
  const risks = [
    {
      risk: "Phishing",
      impact: "Medium",
      impactColor: "bg-[#FF7143]",
      mitigation: "MFA, Phishing training, Verify sender",
    },
    {
      risk: "Social media doxxing/scams",
      impact: "Low",
      impactColor: "bg-[#4CB050]",
      mitigation: "Privacy settings, Limit PII shares",
    },
    {
      risk: "Sim swap/SMS-OTP compromise",
      impact: "High",
      impactColor: "bg-[#D00F24]",
      mitigation: "Unique app 2FA, Contact telco lock",
    },
  ];

  return (
    <div className="border border-white/10 bg-[#0E0E1A] rounded-xl p-6">
      {/* Header */}
      <h2 className="text-white font-semibold text-center text-lg mb-6">
        Individual-Level Risks
      </h2>

      {/* Sub Headers */}
      <div className="grid grid-cols-3 gap-4 mb-3">
        <p className="text-white text-xs font-semibold text-center">
          Personal Risk
        </p>
        <p className="text-white text-xs font-semibold text-center">Impact</p>
        <p className="text-white text-xs font-semibold text-center">
          Quick Mitigation
        </p>
      </div>

      {/* Risk Rows */}
      <div className="grid gap-3">
        {risks.map((r, i) => (
          <div key={i} className="grid grid-cols-3 gap-4 items-stretch">
            {/* Personal Risk */}
            <div className="bg-[#D9D9D9]/50 rounded-lg text-white text-center flex items-center justify-center p-4 h-full font-semibold text-xs">
              {r.risk}
            </div>

            {/* Impact */}
            <div
              className={`rounded-lg text-white font-semibold text-center flex items-center justify-center text-xs ${r.impactColor} p-4 h-full`}
            >
              {r.impact}
            </div>

            {/* Quick Mitigation */}
            <div className="bg-[#D9D9D9]/50 rounded-lg text-white text-center flex items-center justify-center p-4 h-full font-semibold text-xs">
              {r.mitigation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
