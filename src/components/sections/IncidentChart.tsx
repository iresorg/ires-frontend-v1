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
    <div className="border border-white/10 bg-[#0E0E1A] rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4 text-lg">
        Nigeria Incident Breakdown (30 Days)
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <XAxis dataKey="sector" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Legend />
          <Bar dataKey="phishing" stackId="a" fill="#3969DB" />
          <Bar dataKey="ransomware" stackId="a" fill="#D82225" />
          <Bar dataKey="intrusion" stackId="a" fill="#15CA40" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
