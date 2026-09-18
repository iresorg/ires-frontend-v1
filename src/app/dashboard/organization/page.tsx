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
    <div className="min-h-full pb-6 text-white">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Organization overview
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Enterprise threat landscape, risk scores, and attack vectors
        </p>
      </div>

      <OrganizationMetricsGrid />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-14 lg:gap-6">
        <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
          <ThreatMap />
          <AttackerTTPs />
          <EstimatedDirectLoss />
        </div>

        <div className="flex flex-col gap-5 lg:col-span-6 lg:gap-6">
          <IncidentChart />
          <AttackVectorDistribution />
        </div>

        <div className="flex flex-col gap-5 lg:col-span-3 lg:gap-6">
          <RisksReport />
          <EmergingThreats />
        </div>
      </div>
    </div>
  );
}
