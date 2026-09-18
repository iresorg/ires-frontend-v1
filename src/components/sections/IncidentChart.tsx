"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import DashboardPanel from "@/components/ui/DashboardPanel";

const data = [
  { sector: "Banking/Finance", phishing: 10, ransomware: 5, intrusion: 8 },
  { sector: "Oil/Gas", phishing: 20, ransomware: 10, intrusion: 25 },
  { sector: "Healthcare", phishing: 40, ransomware: 25, intrusion: 35 },
];

export default function IncidentChart() {
  return (
    <DashboardPanel title="Nigeria Incident Breakdown (30 Days)">
      <div className="h-[200px] w-full sm:h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            <XAxis
              dataKey="sector"
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#141327",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} iconSize={12} />
            <Bar dataKey="phishing" stackId="a" fill="#4185DD" radius={[0, 0, 0, 0]} />
            <Bar dataKey="ransomware" stackId="a" fill="#B425DA" />
            <Bar dataKey="intrusion" stackId="a" fill="#22C55E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardPanel>
  );
}
