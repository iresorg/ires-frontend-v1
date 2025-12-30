"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { getCookie } from "@/lib/api";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Wait for client-side to be ready
        if (typeof window === "undefined") return;

        // Initialize auth check on app load
        const initializeAuth = async () => {
            try {
                // Get token from cookie
                const token = getCookie("auth_token");
                const checkAuth = useAuthStore.getState().checkAuth;

                // Always verify token if it exists, even if we have persisted state
                // This ensures we have fresh user data and token is still valid
                if (token) {
                    await checkAuth();
                } else {
                    // If no token, clear any persisted auth state
                    useAuthStore.getState().clearUser();
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
                useAuthStore.getState().clearUser();
            }
        };

        // Run immediately - cookies should be available
        initializeAuth();
    }, []); // Only run once on mount

    return <>{children}</>;
}

