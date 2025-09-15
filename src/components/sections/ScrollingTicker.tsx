"use client";

import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

const tickerItems = [
  { type: "text", content: "This is iRES" },
  { type: "logo", src: "/logos/ires-logo.svg", alt: "iRES Logo" },
  { type: "star", content: "Healthcare" },
  { type: "text", content: "Real Time" },
  { type: "logo", src: "/logos/ires-logo.svg", alt: "iRES Logo" },
  { type: "star", content: "Finance and Banking" },
  { type: "text", content: "Real People" },
  { type: "logo", src: "/logos/ires-logo.svg", alt: "iRES Logo" },
  { type: "star", content: "Legal and Law Firms" },
  { type: "text", content: "Real Protection" },
  { type: "logo", src: "/logos/ires-logo.svg", alt: "iRES Logo" },
  { type: "star", content: "Government and Public Sector" },
  { type: "logo", src: "/logos/ires-logo.svg", alt: "iRES Logo" },
  { type: "star", content: "Technology and Software" },
  { type: "logo", src: "/logos/ires-logo.svg", alt: "iRES Logo" },
];

// Create multiple sets for seamless scrolling
const TickerContent = ({ items }: { items: typeof tickerItems }) => (
  <>
    {items.map((item, index) => (
      <span
        key={index}
        className="inline-flex items-center gap-2 text-white text-lg font-medium whitespace-nowrap"
      >
        {item.type === "text" ? (
          item.content
        ) : item.type === "logo" ? (
          <>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <Image
                src={item.src!}
                alt={item.alt!}
                width={16}
                height={16}
                className="w-8 h-8"
              />
            </div>
            <span className="ml-2 text-lg lg:text-xl font-medium">{item.content}</span>
          </>
        ) : (
          <>
            <StarIcon className="w-4 h-4 text-white" />
            <span className="ml-2 text-lg lg:text-xl font-medium">{item.content}</span>
          </>
        )}
      </span>
    ))}
  </>
);

export default function ScrollingTicker() {
  return (
    <div
      className="our-scrolling-ticker relative bg-[var(--secondary)] py-6 z-10"
      style={{
        backdropFilter: "blur(100px)",
        WebkitBackdropFilter: "blur(100px)",
      }}
    >
      <div className="scrolling-ticker-box">
        <div className="scrolling-content">
          <TickerContent items={tickerItems} />
        </div>
        <div className="scrolling-content">
          <TickerContent items={tickerItems} />
        </div>
      </div>

      <style jsx>{`
        .our-scrolling-ticker {
          position: relative;
          background-color: var(--secondary);
          backdrop-filter: blur(100px);
          -webkit-backdrop-filter: blur(100px);
          padding: 25px 0;
          z-index: 1;
        }
        .scrolling-ticker-box {
          --gap: 20px;
          position: relative;
          display: flex;
          overflow: hidden;
          user-select: none;
          gap: var(--gap);
          align-items: center;
        }

        .scrolling-content {
          flex-shrink: 0;
          display: flex;
          gap: var(--gap);
          min-width: 100%;
          animation: scroll 40s linear infinite;
        }

        .scrolling-content span {
          margin-right: 2rem;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - var(--gap)));
          }
        }
      `}</style>
    </div>
  );
}
