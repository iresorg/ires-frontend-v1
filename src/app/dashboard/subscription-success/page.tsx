"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth";
import { useSubscriptionStore } from "@/store/subscription";

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

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function SubscriptionSuccess() {
  const router = useRouter();
  const { user } = useAuthStore();
  const {
    subscription,
    payg,
    entitlement,
    isStatusLoading,
    fetchSubscriptionStatus,
  } = useSubscriptionStore();
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchSubscriptionStatus();
    }
  }, [fetchSubscriptionStatus]);

  const handleBackToPlans = () => {
    const plansRoute =
      user?.role === "organization"
        ? "/dashboard/organization/subscription-plans"
        : "/dashboard/subscription-plans";
    router.push(plansRoute);
  };

  const hasAccess = entitlement?.hasAccess ?? false;
  const paygCredits = payg?.creditsAvailable ?? 0;
  const isPaygSuccess = !subscription && paygCredits > 0;

  if (isStatusLoading && !subscription && !payg) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-8 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-[#4185DD] sm:h-12 sm:w-12" />
          <p className="text-sm text-gray-300 sm:text-base">
            Loading payment details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-6 text-white sm:py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex w-full max-w-lg flex-col rounded-2xl brand-border"
      >
        <div className="flex flex-col space-y-4 rounded-2xl bg-[#1C1B2B] p-5 sm:space-y-5 sm:p-6 md:space-y-6 md:p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative flex justify-center"
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
              style={{ background: "var(--btn-bg)" }}
            >
              <svg
                className="h-8 w-8 text-white sm:h-10 sm:w-10 md:h-12 md:w-12"
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
            <span className="pulse-ring absolute inset-0 rounded-full border border-[var(--accent-color)]" />
          </motion.div>

          <div className="space-y-1 text-center sm:space-y-2">
            <h2
              className="text-xl font-bold bg-clip-text text-transparent sm:text-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--accent-color), var(--accent-secondary-color))",
              }}
            >
              Payment Successful!
            </h2>
            <p className="px-2 text-xs text-gray-300 sm:text-sm">
              {isPaygSuccess
                ? "Your pay-as-you-go credit has been added."
                : "Your subscription has been activated successfully."}
            </p>
          </div>

          <div className="w-full space-y-2.5 rounded-lg border border-gray-700/50 bg-[#141327] p-4 sm:space-y-3 sm:p-5">
            {subscription ? (
              <>
                <div className="flex items-center gap-2 border-b border-gray-700/50 pb-2 sm:gap-3 sm:pb-3">
                  <Image
                    src={getPlanIcon(subscription.plan.tier)}
                    alt={subscription.plan.name}
                    width={32}
                    height={32}
                    className="h-7 w-7 shrink-0 sm:h-8 sm:w-8"
                  />
                  <div className="min-w-0 flex-1">
                    <h3
                      className="truncate text-xs font-semibold bg-clip-text text-transparent sm:text-sm"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #70A4FF, #601474)",
                      }}
                    >
                      {subscription.plan.name}
                    </h3>
                    <p className="text-[10px] capitalize text-green-400 sm:text-xs">
                      {subscription.status}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-gray-400 sm:text-xs">
                    Expiry Date
                  </span>
                  <span className="text-right text-[10px] font-medium text-white sm:text-xs">
                    {formatDate(subscription.currentPeriodEnd)}
                  </span>
                </div>
                {subscription.usage && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-gray-400 sm:text-xs">
                      Incidents
                    </span>
                    <span className="text-right text-[10px] font-medium text-white sm:text-xs">
                      {subscription.usage.usedIncidents} used
                      {subscription.usage.remainingIncidents === null
                        ? " · Unlimited left"
                        : ` · ${subscription.usage.remainingIncidents} left`}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2 text-center">
                <p className="text-sm font-medium text-white">
                  Pay as you go credits
                </p>
                <p
                  className="text-3xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--accent-color), var(--accent-secondary-color))",
                  }}
                >
                  {paygCredits}
                </p>
                <p className="text-xs text-white/60">
                  {hasAccess
                    ? "You can use these credits for incident response."
                    : "Credits will appear once payment is confirmed."}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleBackToPlans}
            className="w-full cursor-pointer rounded-md px-4 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-3 sm:text-sm"
            style={{ background: "var(--btn-bg)" }}
          >
            Back to Subscription Plans
          </button>

          <p className="px-2 text-center text-[10px] text-gray-400 sm:text-xs">
            You can manage billing from the subscription plans page.
          </p>
        </div>
      </motion.div>

      <footer className="mt-6 px-4 text-center text-xs text-white sm:mt-8 sm:text-sm md:mt-10">
        Copyright © {new Date().getFullYear()} iRES. All Rights Reserved.
      </footer>
    </div>
  );
}
