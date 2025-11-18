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

const data = [
  { sector: "Banking/Finance", phishing: 10, ransomware: 5, intrusion: 8 },
  { sector: "Oil/Gas", phishing: 20, ransomware: 10, intrusion: 25 },
  { sector: "Healthcare", phishing: 40, ransomware: 25, intrusion: 35 },
];

export default function IncidentChart() {
  return (
    <div className="border border-white/10 bg-[#0E0E1A] rounded-xl p-4 sm:p-5 overflow-hidden">
      <h2 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
        Nigeria Incident Breakdown (30 Days)
      </h2>
      <div className="w-full h-[200px] sm:h-[250px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 5
            }}
          >
            <XAxis
              dataKey="sector"
              stroke="#aaa"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
            />
            <YAxis
              stroke="#aaa"
              tick={{ fontSize: 10 }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1C1C2E",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              iconSize={12}
            />
            <Bar dataKey="phishing" stackId="a" fill="#3969DB" />
            <Bar dataKey="ransomware" stackId="a" fill="#D82225" />
            <Bar dataKey="intrusion" stackId="a" fill="#15CA40" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
