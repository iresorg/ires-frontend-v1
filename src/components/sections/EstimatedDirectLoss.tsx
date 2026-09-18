"use client";

import DashboardPanel from "@/components/ui/DashboardPanel";

export default function EstimatedDirectLoss() {
  return (
    <DashboardPanel title="Estimated Direct Loss (2025)">
      <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        ₦160B – ₦300B
      </p>
      <p className="mt-1 text-xs text-white/45">Projected annual impact range</p>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10">
        <div className="flex h-full w-full">
          <div className="bg-[#4185DD]" style={{ width: "60%" }} />
          <div className="bg-[#B425DA]" style={{ width: "25%" }} />
          <div className="bg-[#EF4444]" style={{ width: "15%" }} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded-sm bg-[#4185DD]" />
          Direct Loss
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded-sm bg-[#B425DA]" />
          Business Interruption
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-4 rounded-sm bg-[#EF4444]" />
          Remediation
        </div>
      </div>
    </DashboardPanel>
  );
}
