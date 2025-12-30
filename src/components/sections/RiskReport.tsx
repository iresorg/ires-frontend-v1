"use client";

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

  return (
    <div className="bg-[#0E0E1A] border border-white/10 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-4 text-sm">Risk Reports</h3>

      {/* Table Header */}
      <div className="flex justify-between items-center mb-2 text-white text-xs font-semibold">
        <span>Industry (Nigeria/West Africa)</span>
        <span>Risk Score</span>
      </div>

      {/* Divider */}
      <hr className="border-white/10 mb-3" />

      {/* Table Body */}
      <div className="space-y-2 text-xs">
        {risks.map((r, i) => (
          <div key={i} className="flex justify-between items-center">
            <p className="text-white">{r.industry}</p>
            <p className="text-white font-semibold">{r.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
