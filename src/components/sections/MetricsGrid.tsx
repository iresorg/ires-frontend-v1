"use client";

export default function MetricsGrid() {
  const metrics = [
    {
      label: "Overall Threat Level",
      value: "HIGH",
      hint: "Elevated risk posture",
      accent: "#EF4444",
      tone: "text-[#FCA5A5]",
    },
    {
      label: "Active Incidents (30d)",
      value: "1,289",
      hint: "↑ vs prior period",
      accent: "#F97316",
      tone: "text-[#FDBA74]",
    },
    {
      label: "Median Time-to-Detect",
      value: "52 hrs",
      hint: "Detection latency",
      accent: "#EAB308",
      tone: "text-[#FDE047]",
    },
    {
      label: "MFA Adoption (Internal)",
      value: "85%",
      hint: "Coverage improving",
      accent: "#22C55E",
      tone: "text-[#86EFAC]",
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:mb-8 lg:grid-cols-4 lg:gap-4">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="relative overflow-hidden rounded-2xl bg-[#141327]/90 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 sm:p-5"
        >
          <span
            className="absolute inset-y-0 left-0 w-1 rounded-l-2xl"
            style={{ background: m.accent }}
          />
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/45 sm:text-xs">
            {m.label}
          </p>
          <p className={`mt-2 text-xl font-semibold tracking-tight sm:text-2xl ${m.tone}`}>
            {m.value}
          </p>
          <p className="mt-1 text-[11px] text-white/40 sm:text-xs">{m.hint}</p>
        </div>
      ))}
    </div>
  );
}
