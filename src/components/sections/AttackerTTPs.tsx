 "use client";

import Image from "next/image";

export default function TTPs() {
  const items = [
    {
      iconBefore: "/images/instagram.png",
      text: "Social Engineering & Phishing",
      iconAfter: "/images/arrow-up.png",
    },
    {
      iconBefore: "/images/threat-browser.png",
      text: "Ransomware (Fragmentation)",
      iconAfter: "/images/arrow-down.png",
    },
    {
      iconBefore: "/images/supply-chain.png",
      text: "Supply Chain Intrusions",
      iconAfter: "/images/arrow-right-vector.svg",
    },
    {
      iconBefore: "/images/application.png",
      text: "Web/Application Exploitation",
      iconAfter: "/images/arrow-right-vector.svg",
    },
  ];

  return (
    <div className=" border-white/10 bg-[#0E0E1A] border-1 p-4 rounded-xl">
      <h3 className="text-white font-semibold mb-3 text-lg">
        Dominant Attacker TTPs (Global/Regional)
      </h3>
      <ul className="text-sm text-gray-300 space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {item.iconBefore && (
              <Image
                src={item.iconBefore}
                alt="icon before"
                width={16}
                height={16}
                className="flex-shrink-0 mr-4"
              />
            )}
            <span>{item.text}</span>
            {item.iconAfter && (
              <Image
                src={item.iconAfter}
                alt="icon after"
                width={16}
                height={16}
                className="flex-shrink-0"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
