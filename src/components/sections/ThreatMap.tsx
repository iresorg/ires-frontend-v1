"use client";

import Image from "next/image";

export default function ThreatMap() {
  return (
    <div className=" rounded-xl p-5 flex flex-col gap-6 border-white/10 bg-[#0E0E1A] border-1">
      {/* Map */}
      <div>
        <h2 className="text-white font-semibold mb-3 text-lg">
          Threat Landscape Snapshot
        </h2>
        <Image
          src="/images/threat-map.png"
          alt="Threat Map"
          width={400}
          height={250}
          className="rounded-lg w-full h-auto"
        />
      </div>

  
    </div>
  );
}
