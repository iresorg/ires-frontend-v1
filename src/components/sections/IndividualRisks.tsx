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
    <div className="border border-white/10 bg-[#0E0E1A] rounded-xl p-4 sm:p-6">
      {/* Header */}
      <h2 className="text-white font-semibold text-center text-base sm:text-lg mb-4 sm:mb-6">
        Individual-Level Risks
      </h2>

      {/* Sub Headers - Hidden on mobile, visible on desktop */}
      <div className="hidden sm:grid grid-cols-3 gap-3 sm:gap-4 mb-3">
        <p className="text-white text-xs font-semibold text-center">
          Personal Risk
        </p>
        <p className="text-white text-xs font-semibold text-center">Impact</p>
        <p className="text-white text-xs font-semibold text-center">
          Quick Mitigation
        </p>
      </div>

      {/* Risk Rows */}
      <div className="grid gap-3 sm:gap-4">
        {risks.map((r, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            {/* Personal Risk */}
            <div className="bg-[#D9D9D9]/50 rounded-lg text-white text-center flex items-center justify-center p-3 sm:p-4 font-semibold text-[10px] sm:text-xs min-h-[60px] sm:min-h-0">
              <div>
                <span className="sm:hidden text-[9px] text-white/70 mb-1 block">Personal Risk:</span>
              {r.risk}
              </div>
            </div>

            {/* Impact */}
            <div
              className={`rounded-lg text-white font-semibold text-center flex items-center justify-center text-[10px] sm:text-xs ${r.impactColor} p-3 sm:p-4 min-h-[60px] sm:min-h-0`}
            >
              <div>
                <span className="sm:hidden text-[9px] text-white/90 mb-1 block">Impact:</span>
              {r.impact}
              </div>
            </div>

            {/* Quick Mitigation */}
            <div className="bg-[#D9D9D9]/50 rounded-lg text-white text-center flex items-center justify-center p-3 sm:p-4 font-semibold text-[10px] sm:text-xs min-h-[60px] sm:min-h-0">
              <div>
                <span className="sm:hidden text-[9px] text-white/70 mb-1 block">Quick Mitigation:</span>
              {r.mitigation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
