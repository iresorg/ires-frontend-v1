"use client";

import MetricsGrid from "@/components/sections/MetricsGrid";
import ThreatMap from "@/components/sections/ThreatMap";
import AttackerTTPs from "@/components/sections/AttackerTTPs";
import EmergingThreats from "@/components/sections/EmergingThreats";
import IncidentChart from "@/components/sections/IncidentChart";
import IndividualRisks from "@/components/sections/IndividualRisks";

export default function DashboardPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Metrics Grid */}
      <MetricsGrid />

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <ThreatMap />
          <AttackerTTPs />
          <EmergingThreats />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <IncidentChart />
          <IndividualRisks />
        </div>
      </div>
    </div>
  );
}
