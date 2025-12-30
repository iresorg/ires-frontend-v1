"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

export default function AttackVectorDistribution() {
  const data = [
    { name: "Social Engineering/Phishing", value: 45, color: "#D00F24" },
    { name: "Compromised Credentials/Identity", value: 20, color: "#4CB050" },
    { name: "Ransomware/Malware Payloads", value: 15, color: "#1A5BFF" },
    { name: "Web/Application Vulnerabilities", value: 10, color: "#FF7143" },
    { name: "Insider/Misconfiguration", value: 6, color: "#B39DDB" },
    { name: "IoT/Other", value: 4, color: "#4A4A4A" },
  ];

  const renderLabel = (props: PieLabelRenderProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    if (
      cx === undefined ||
      cy === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      midAngle === undefined ||
      percent === undefined
    ) {
      return null;
    }

    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        fontSize={12}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="monospace"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <div className="rounded-xl p-5 border border-white/10 bg-[#0E0E1A]">
      <h2 className="text-white font-semibold mb-4 text-lg text-center font-mono">
        Attack-Vector Distribution
      </h2>

      <div className="flex items-center justify-between">
        {/* PIE CHART */}
        <div className="w-1/2 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={88} 
                paddingAngle={0} 
                label={renderLabel}
                stroke="none"
                cornerRadius={6} 
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LEGEND */}
        <ul className="text-sm text-white space-y-2 font-mono w-1/2">
          {data.map((item, index) => (
            <li key={index} className="flex items-center">
              <span
                className="w-0 h-0 mr-2"
                style={{
                  borderLeft: "6px solid transparent",
                  borderRight: "6px solid transparent",
                  borderBottom: `10px solid ${item.color}`,
                }}
              ></span>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
