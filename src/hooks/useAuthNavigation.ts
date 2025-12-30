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

  const getSubscriptionPlansRoute = () => {
    if (!user) return "/dashboard/subscription-plans";
    return user.role === "organization"
      ? "/dashboard/organization/subscription-plans"
      : "/dashboard/subscription-plans";
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
      router.push(getSubscriptionPlansRoute());
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
    getSubscriptionPlansRoute,
    goToDashboard,
    handleSignUpNavigation,
    handleSubscribeNavigation,
    goToPricing,
  };
}
