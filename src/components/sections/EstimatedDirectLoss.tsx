"use client";

export default function EstimatedDirectLoss() {
  return (
    <div className="rounded-xl p-5 border-white/10 bg-[#0E0E1A] border-1">
      {/* Title */}
      <h2 className="text-white font-md mb-1 text-sm">
        Estimated Direct Loss (2025)
      </h2>

      {/* Main Value */}
      <p className="text-lg font-bold text-white mb-4">
        #160 Billion - #300 Billion
      </p>

      {/* Divider */}
      <div className="w-full border-t border-white/10 my-4"></div>

      {/* Bar */}
      <div className="w-full h-4 rounded-full flex overflow-hidden">
        {/* Direct Loss */}
        <div className="bg-[#FF7143]" style={{ width: "60%" }}></div>
        {/* Business Interruption */}
        <div className="bg-[#4CB050]" style={{ width: "25%" }}></div>
        {/* Remediation */}
        <div className="bg-[#D00F24]" style={{ width: "15%" }}></div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-xs text-white font-mono">
        <div className="flex items-center gap-2">
          <span className="w-4 h-2 bg-[#FF7143]"></span>
          Direct Loss
        </div>

        <div className="flex items-center gap-2 ">
          <span className="w-4 h-2 bg-[#4CB050] "></span>
          Business Interruption
        </div>

        <div className="flex items-center gap-2 ">
          <span className="w-3 h-2 bg-[#D00F24] "></span>
          Remediation
        </div>
      </div>
    </div>
  );
}
