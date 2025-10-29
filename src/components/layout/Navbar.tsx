"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0E0E1A]">
      {/* Search Bar */}
      <div className="flex items-center w-[300px] bg-[#1C1C2E] rounded-full px-4 py-2 text-sm">
        <Image
          src="/images/search.png"
          alt="Search Icon"
          width={16}
          height={16}
          className="opacity-70 mr-2"
        />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-white/70 w-full placeholder-white/50"
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-5">
        {/* Notification Icon */}
        <div className="bg-[#1C1C2E] p-2 rounded-full">
          <Image
            src="/images/bell icon.png"
            alt="Notifications"
            width={20}
            height={20}
            className=" cursor-pointer"
          />
        </div>
        {/* Profile Section */}
     
        <div className="flex items-center gap-2 cursor-pointer bg-[#1C1C2E] px-3 py-1 rounded-full">
          <Image
            src="/images/avatar.png"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-white">Floyd Miles</span>
          <Image
            src="/images/white-dropdown.png"
            alt="Dropdown"
            width={14}
            height={14}
          />
        </div>
      </div>
    </header>
  );
}
