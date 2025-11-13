"use client";

import OrganizationMetricsGrid from "@/components/sections/OrganizationMetricsGrid";
import ThreatMap from "@/components/sections/ThreatMap";
import AttackerTTPs from "@/components/sections/AttackerTTPs";
import EmergingThreats from "@/components/sections/EmergingThreats";
import IncidentChart from "@/components/sections/IncidentChart";
import OrganizationRisks from "@/components/sections/OrganizationRisks";

export default function OrganizationDashboardPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Metrics Grid */}
      <OrganizationMetricsGrid />

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
          <OrganizationRisks />
        </div>
      </div>
    </div>
  );
}
