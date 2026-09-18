"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import DashboardPanel from "@/components/ui/DashboardPanel";

export default function AttackVectorDistribution() {
  const data = [
    { name: "Social Engineering/Phishing", value: 45, color: "#B425DA" },
    { name: "Compromised Credentials", value: 20, color: "#4185DD" },
    { name: "Ransomware/Malware", value: 15, color: "#EF4444" },
    { name: "Web/App Vulnerabilities", value: 10, color: "#F97316" },
    { name: "Insider/Misconfiguration", value: 6, color: "#22C55E" },
    { name: "IoT/Other", value: 4, color: "#6B7280" },
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

    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) / 2;
    const x = Number(cx) + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = Number(cy) + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        fontSize={11}
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {(percent * 100).toFixed(0)}%
      </text>
    );
  };

  return (
    <DashboardPanel title="Attack-Vector Distribution">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-52 w-full sm:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                label={renderLabel}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="w-full space-y-2 sm:w-1/2">
          {data.map((item) => (
            <li key={item.name} className="flex items-center gap-2 text-xs text-white/75 sm:text-sm">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: item.color }}
              />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </DashboardPanel>
  );
}
