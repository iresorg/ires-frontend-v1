"use client";

import { useEffect, useState } from "react";
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
  const { isAuthenticated, isLoading, checkAuth, clearUser } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsChecking(true);
      const authenticated = await checkAuth();

      if (!authenticated) {
      clearUser();
      removeCookie("auth_token");
      removeCookie("refresh_token");
        router.push("/login");
        setIsChecking(false);
        return;
      }

      // Get user from store after checkAuth
      const currentUser = useAuthStore.getState().user;

      // Redirect based on role
      if (currentUser) {
        const currentPath = window.location.pathname;
        if (currentUser.role === "organization") {
          if (!currentPath.startsWith("/dashboard/organization")) {
            router.push("/dashboard/organization");
            setIsChecking(false);
            return;
          }
        } else if (currentUser.role === "individual") {
          if (currentPath.startsWith("/dashboard/organization")) {
            router.push("/dashboard");
            setIsChecking(false);
            return;
          }
        }
      }

      setIsChecking(false);
    };

    verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Show loading state while checking authentication
  if (isChecking || isLoading) {
    return (
      <div className="flex h-screen bg-[#0E0E1A] text-white items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-[#0E0E1A] text-white">
      {/* Sidebar - Hidden on md and below, visible on lg and above */}
      <div className="hidden lg:block">
      <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
