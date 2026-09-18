"use client";

import Image from "next/image";
import DashboardPanel from "@/components/ui/DashboardPanel";

export default function ThreatMap() {
  return (
    <DashboardPanel title="Threat Landscape Snapshot">
      <Image
        src="/images/threat-map.png"
        alt="Threat Map"
        width={400}
        height={250}
        className="h-auto w-full rounded-xl"
      />
    </DashboardPanel>
  );
}
