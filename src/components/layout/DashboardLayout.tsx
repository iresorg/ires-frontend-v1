"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { removeCookie } from "@/lib/api";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, clearUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      clearUser();
      removeCookie("auth_token");
      removeCookie("refresh_token");
      router.push("/");
    }
  }, [isAuthenticated, clearUser, router]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-[#0E0E1A] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
