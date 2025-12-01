"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export function useAuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const getDashboardRoute = () => {
    if (!user) return "/dashboard";
    return user.role === "organization"
      ? "/dashboard/organization"
      : "/dashboard";
  };

  const goToDashboard = () => {
    router.push(getDashboardRoute());
  };

  const handleSignUpNavigation = () => {
    if (isAuthenticated && user) {
      goToDashboard();
      return;
    }
    router.push("/signup");
  };

  const handleSubscribeNavigation = () => {
    if (isAuthenticated && user) {
      goToDashboard();
      return;
    }
    router.push("/login");
  };

  const goToPricing = () => {
    router.push("/pricing");
  };

  return {
    isAuthenticated,
    user,
    getDashboardRoute,
    goToDashboard,
    handleSignUpNavigation,
    handleSubscribeNavigation,
    goToPricing,
  };
}
