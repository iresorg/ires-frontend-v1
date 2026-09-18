"use client";

import MetricsGrid from "@/components/sections/MetricsGrid";
import ThreatMap from "@/components/sections/ThreatMap";
import AttackerTTPs from "@/components/sections/AttackerTTPs";
import EmergingThreats from "@/components/sections/EmergingThreats";
import IncidentChart from "@/components/sections/IncidentChart";
import IndividualRisks from "@/components/sections/IndividualRisks";

export default function DashboardPage() {
  return (
    <div className="min-h-full text-white">
      <div className="mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Security overview
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Live threat posture and incident signals for your account
        </p>
      </div>

      <MetricsGrid />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <div className="flex flex-col gap-5 lg:gap-6">
          <ThreatMap />
          <AttackerTTPs />
          <EmergingThreats />
        </div>

        <div className="flex flex-col gap-5 lg:gap-6">
          <IncidentChart />
          <IndividualRisks />
        </div>
      </div>
    </div>
  );
}
