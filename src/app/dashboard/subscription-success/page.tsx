"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth";
import { useSubscriptionStore } from "@/store/subscription";

// Map tier to icon
const getPlanIcon = (tier: number) => {
  switch (tier) {
    case 1:
      return "/images/Shield.png";
    case 2:
      return "/images/guard.png";
    case 3:
      return "/images/fortress.png";
    default:
      return "/images/Shield.png";
  }
};

// Format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function SubscriptionSuccess() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { subscription, isLoading, fetchSubscriptionStatus } = useSubscriptionStore();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Only fetch if we haven't fetched yet
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      // Refresh subscription status after successful payment
      fetchSubscriptionStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackToPlans = () => {
    // Redirect based on user role
    const plansRoute = user?.role === "organization"
      ? "/dashboard/organization/subscription-plans"
      : "/dashboard/subscription-plans";
    router.push(plansRoute);
  };

  // Show loading state
  if (isLoading || !subscription) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4185DD] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 relative">
      {/* Background gradient blob */}
      <div className="absolute inset-0" />

      {/* Success Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg rounded-2xl p-px bg-linear-to-r from-[#4185DD] to-[#B425DA] flex flex-col z-10"
      >
        <div className="bg-[#1C1B2B] rounded-2xl p-8 flex flex-col space-y-6">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative flex justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-linear-to-r from-[#4185DD] to-[#B425DA] flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            {/* Animated ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#4185DD]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Success Message */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent">
              Payment Successful!
            </h2>
            <p className="text-gray-300 text-sm">
              Your subscription has been activated successfully.
            </p>
          </div>

          {/* Plan Details Card - Simplified */}
          <div className="w-full bg-[#141327] rounded-lg p-5 space-y-3 border border-gray-700/50">
            {/* Plan Name with Icon */}
            <div className="flex items-center gap-3 pb-3 border-b border-gray-700/50">
              <Image
                src={getPlanIcon(subscription.plan.tier)}
                alt={subscription.plan.name}
                width={32}
                height={32}
              />
              <div>
                <h3 className="font-semibold text-sm bg-linear-to-r from-[#70A4FF] to-[#601474] bg-clip-text text-transparent">
                  {subscription.plan.name}
                </h3>
                <p className="text-xs text-green-400 capitalize">{subscription.status}</p>
              </div>
            </div>

            {/* Key Info Only */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">Expiry Date</span>
                <span className="text-white text-xs font-medium">
                  {formatDate(subscription.currentPeriodEnd)}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleBackToPlans}
            className="w-full bg-gradient-to-r from-[#4185DD] to-[#B425DA] px-6 py-3 rounded-md text-sm font-medium cursor-pointer hover:opacity-90 transition-opacity"
          >
            Back to Subscription Plans
          </button>

          {/* Additional Info */}
          <p className="text-gray-400 text-xs text-center">
            You can manage your subscription from the subscription plans page.
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-10 text-white text-sm text-center">
        Copyright © {new Date().getFullYear()} iRES. All Rights Reserved.
      </footer>
    </div>
  );
}
