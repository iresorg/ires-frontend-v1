"use client";

import { useState } from "react";
import Image from "next/image";

const countries = [
  { name: "Nigeria", code: "+234", flag: "/images/nigeria-flag.png" },
  { name: "Ghana", code: "+233", flag: "/images/ghana-flag.png" },
  { name: "United States", code: "+1", flag: "/images/usa-flag.png" },
  { name: "United Kingdom", code: "+44", flag: "/images/uk-flag.png" },
];

export default function PhoneInput() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);

  return (
    <div className="relative">
      {/* phone field */}
      <div className="flex items-center bg-white/10 rounded-lg px-4 py-3">
        {/* flag and dropdown */}
        <div
          className="flex items-center gap-[4px] cursor-pointer select-none" 
        >
          <Image
            src={selected.flag}
            alt={selected.name}
            width={20}
            height={14}
            className="rounded-sm"
          />
          <span className="text-white/90 text-sm"></span>
          <Image
            src="/images/dropdown.png"
            alt="Dropdown"
            width={16}
            height={16}
            className={`transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* phone input */}
        <input
          type="tel"
          placeholder=" +234 910 000 0000"
          className="bg-transparent w-full text-white placeholder-white/60 outline-none ml-1"
        />
      </div>

      {/* dropdown */}
      {open && (
        <div className="absolute left-4 top-[105%] w-44 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg z-10">
          {countries.map((country) => (
            <div
              key={country.code}
              onClick={() => {
                setSelected(country);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 cursor-pointer"
            >
              <Image
                src={country.flag}
                alt={country.name}
                width={18}
                height={12}
                className="rounded-sm"
              />
              <span className="text-white text-sm">{country.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
