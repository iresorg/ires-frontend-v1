"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { clearClientSession } from "@/lib/session";
import Sidebar from "./SideBar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checkAuth, clearUser } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsChecking(true);
      const authenticated = await checkAuth();

      if (!authenticated) {
        clearUser();
        clearClientSession();
        router.push("/login");
        setIsChecking(false);
        return;
      }

      const currentUser = useAuthStore.getState().user;

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

    void verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg-color)] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--accent-color)]" />
          <p className="text-sm text-white/70">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-[var(--bg-color)] text-white">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
