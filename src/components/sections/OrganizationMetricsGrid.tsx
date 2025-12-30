"use client";

export default function OrganizationMetricsGrid() {
  const metrics = [
    {
      label: "Overall Threat Level",
      value: "HIGH",
      color: "from-[#D52A3D] to-[#B71C1C]",
    },
    {
      label: "Active Incidents (30d)",
      value: "1,289 ↑",
      color: "from-[#FF7043] to-[#EA580C]",
    },
    {
      label: "Median Time-to-Detect",
      value: "52 Hours",
      color: "from-[#FF7043] to-[#CA8A04]",
    },
    {
      label: "MFA Adoption % (Internal)",
      value: "85%",
      color: "from-[#4CAF50] to-[#16A34A]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((m, i) => (
        <div
          key={i}
          className={`rounded-xl bg-gradient-to-r ${m.color} text-white px-4 py-3 flex flex-col items-center justify-center`}
        >
          <p className="text-sm tracking-wider text-center">
            {m.label}
          </p>
          <p className="text-lg font-bold">{m.value}</p>
        </div>
      ))}
    </div>
  );
}
