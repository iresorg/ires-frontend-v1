"use client";

import OrganizationMetricsGrid from "@/components/sections/OrganizationMetricsGrid";
import ThreatMap from "@/components/sections/ThreatMap";
import AttackerTTPs from "@/components/sections/AttackerTTPs";
import EmergingThreats from "@/components/sections/EmergingThreats";
import IncidentChart from "@/components/sections/IncidentChart";
import AttackVectorDistribution from "@/components/sections/AttackVectorDistribution";
import RisksReport from "@/components/sections/RiskReport";
import EstimatedDirectLoss from "@/components/sections/EstimatedDirectLoss";

export default function OrganizationDashboardPage() {
  return (
    <div className="min-h-screen text-white pb-10">
  
      <OrganizationMetricsGrid />

   
      <div className="grid grid-cols-1 lg:grid-cols-14 gap-6">
        {/* left column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ThreatMap />
          <AttackerTTPs />
          <EstimatedDirectLoss />
        </div>

        {/* middle column */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <IncidentChart />
          <AttackVectorDistribution />
        </div>

        {/* right column */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <RisksReport />
          <EmergingThreats />
        </div>
      </div>
    </div>
  );
}
