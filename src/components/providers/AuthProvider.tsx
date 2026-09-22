"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { getAccessToken } from "@/lib/accessToken";
import { clearLegacyAuthCookies } from "@/lib/session";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Drop leftover JS-readable auth cookies from the old storage model
    clearLegacyAuthCookies();

    // Drop old persisted auth UI state (JWT was never supposed to live here,
    // but isAuthenticated/user used to survive refresh incorrectly)
    try {
      window.localStorage.removeItem("auth-storage");
    } catch {
      // ignore
    }
    const initializeAuth = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          await useAuthStore.getState().checkAuth();
        } else {
          // Memory-only tokens: refresh / new tab = signed out
          useAuthStore.getState().clearUser();
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        useAuthStore.getState().clearUser();
      }
    };

    void initializeAuth();
  }, []);

  return <>{children}</>;
}
