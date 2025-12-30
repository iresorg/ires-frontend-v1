"use client";

import { useEffect, useState, useRef } from "react";
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

// Format amount to naira (backend stores amount in units that need to be divided by 100)
const formatPrice = (amount: string): string => {
  const amountInSmallestUnit = parseInt(amount, 10);
  const amountInNaira = amountInSmallestUnit / 100;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountInNaira);
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

// Check if subscription is expired
const isExpired = (endDate: string): boolean => {
  return new Date(endDate) < new Date();
};

// Skeleton Loader Component
const PlanCardSkeleton = () => {
  return (
    <div className="relative w-[320px] rounded-2xl p-[1px] bg-gradient-to-r from-[#4185DD] to-[#B425DA] flex flex-col">
      <div className="bg-[#1C1B2B] rounded-2xl p-5 flex flex-col flex-1 justify-between space-y-1.5">
        {/* Title Skeleton */}
        <div className="flex items-center space-x-2 relative">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141327] animate-pulse">
            <div className="w-5 h-5 bg-gray-700 rounded"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Price Skeleton */}
        <div className="mt-3 space-y-2">
          <div className="h-6 w-32 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 w-48 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Features Skeleton */}
        <ul className="mt-4 space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <li key={i} className="flex items-start space-x-2">
              <div className="w-3.5 h-3.5 bg-gray-700 rounded animate-pulse mt-0.5"></div>
              <div className="h-4 flex-1 bg-gray-700 rounded animate-pulse"></div>
            </li>
          ))}
        </ul>

        {/* Button Skeleton */}
        <div className="mt-6">
          <div className="h-8 w-full bg-gray-700 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default function SubscriptionPlansPage() {
  const { user } = useAuthStore();
  const { subscription, plans, isLoading, fetchSubscriptionStatus, fetchPlans, initializeSubscription } =
    useSubscriptionStore();
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);
  const lastUserRoleRef = useRef<string | null>(null);

  useEffect(() => {
    // Reset fetch flag if user logged out
    if (!user?.role) {
      hasFetchedRef.current = false;
      lastUserRoleRef.current = null;
      return;
    }

    // Only fetch if we haven't fetched yet, or if user role changed
    const shouldFetch = !hasFetchedRef.current || lastUserRoleRef.current !== user.role;

    if (shouldFetch) {
      hasFetchedRef.current = true;
      lastUserRoleRef.current = user.role;

      // Fetch subscription status
      fetchSubscriptionStatus();

      // Fetch plans based on user role
      fetchPlans(user.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.role]);

  // Determine current plan ID from subscription
  useEffect(() => {
    if (subscription) {
      // Find the plan that matches the subscription tier
      const matchingPlan = plans.find(
        (plan) => plan.tier === subscription.plan.tier
      );
      if (matchingPlan) {
        setCurrentPlanId(matchingPlan.id);
      }
    } else {
      setCurrentPlanId(null);
    }
  }, [subscription, plans]);

  // Filter plans by account type
  const filteredPlans = plans.filter(
    (plan) => plan.accountType === user?.role
  );

  // Sort plans by tier
  const sortedPlans = [...filteredPlans].sort((a, b) => a.tier - b.tier);

  const hasActiveSubscription = subscription?.status === "active";
  const subscriptionExpired =
    subscription && isExpired(subscription.currentPeriodEnd);

  // Show skeleton loaders while loading
  if (isLoading && plans.length === 0) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0" />
        <div className="flex flex-wrap gap-6 justify-center items-stretch mt-20">
          <PlanCardSkeleton />
          <PlanCardSkeleton />
          <PlanCardSkeleton />
        </div>
        <footer className="mt-10 text-white text-sm text-center">
          Copyright © {new Date().getFullYear()} iRES. All Rights Reserved.
        </footer>
      </div>
    );
  }

  if (!user?.role) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <p>Please log in to view subscription plans.</p>
        </div>
      </div>
    );
  }

  if (sortedPlans.length === 0) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <p>No plans available for your account type.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 relative">
      {/* Background gradient blob */}
      <div className="absolute inset-0" />

      {/* CURRENT PLAN tag - only show if there's an active subscription */}
      {hasActiveSubscription && currentPlanId && (
        <div className="absolute top-10 left-20 flex items-center z-10">
          <div
            className="relative px-4 py-1.5 rounded-md text-sm font-semibold text-white 
                    bg-[#0B0B13]/90 border border-transparent 
                    bg-clip-padding 
                    before:absolute before:inset-0 before:rounded-md 
                    before:p-px before:bg-linear-to-r before:from-[#4185DD] before:to-[#B425DA] 
                    before:-z-10 shadow-[0_0_10px_rgba(180,37,218,0.4)]"
          >
            Current Plan
            {/* Little triangle pointer */}
            <div
              className="absolute bottom-[-6px] left-5 w-0 h-0 
                      border-l-[6px] border-r-[6px] border-t-[6px] border-transparent 
                      border-t-[#0B0B13]"
            />
          </div>
        </div>
      )}

      {/* Cards wrapper */}
      <div className="flex flex-wrap gap-6 justify-center items-stretch mt-20">
        {sortedPlans.map((plan) => {
          const isCurrentPlan = plan.id === currentPlanId;
          const isDisabled = hasActiveSubscription && !isCurrentPlan;
          const showExpiryAndRenew = isCurrentPlan && hasActiveSubscription;
          const canRenew = subscriptionExpired;

          return (
            <div
              key={plan.id}
              className={`relative w-[320px] rounded-2xl p-[1px] bg-gradient-to-r from-[#4185DD] to-[#B425DA] flex flex-col ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              <div className="bg-[#1C1B2B] rounded-2xl p-5 flex flex-col flex-1 justify-between space-y-1.5">
                {/* Title */}
                <div className="flex items-center space-x-2 relative">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full relative
                   bg-[#141327]
                   before:absolute before:inset-0 before:rounded-full
                   before:p-px before:bg-linear-to-r before:from-[#B425DA] before:to-[#4185DD]
                   before:-z-10"
                  >
                    <Image
                      src={getPlanIcon(plan.tier)}
                      alt={plan.name}
                      width={20}
                      height={20}
                      className="text-[#4185DD]"
                    />

                    <h3
                      className="font-semibold text-sm bg-linear-to-r from-[#70A4FF] to-[#601474]
                     bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(226,120,255,0.6)]"
                    >
                      {plan.name}
                    </h3>
                  </div>
                </div>

                {/* Price */}
                <p className="bg-linear-to-r from-[#4185DD] to-[#B425DA] bg-clip-text text-transparent text-xl font-semibold mt-3 italic">
                  <motion.span
                    className="font-semibold bg-clip-text text-transparent inline-block"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
                      backgroundSize: "200% auto",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      backgroundPosition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {formatPrice(plan.amount)}/{plan.interval === "monthly" ? "Month" : plan.interval}
                  </motion.span>
                </p>
                <p className="text-xs text-gray-400 italic mt-1">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Image
                        src="/images/checkbox.png"
                        alt="check"
                        width={14}
                        height={14}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer Buttons */}
                {showExpiryAndRenew ? (
                  <div className="flex justify-between mt-6 text-xs font-medium">
                    <button
                      className="bg-linear-to-r from-[#4185DD] to-[#B425DA] text-white rounded-md px-4 py-1 cursor-default"
                      disabled
                    >
                      Expiry Date
                      <br />
                      <span className="text-[10px]">
                        {formatDate(subscription!.currentPeriodEnd)}
                      </span>
                    </button>
                    <button
                      className={`bg-linear-to-r from-[#4185DD] to-[#B425DA] px-4 py-2 rounded-md text-xs font-medium ${canRenew
                        ? "cursor-pointer hover:opacity-90"
                        : "cursor-not-allowed opacity-50"
                        }`}
                      disabled={!canRenew || isInitializing === plan.id}
                      onClick={async () => {
                        if (canRenew && !isInitializing) {
                          try {
                            setIsInitializing(plan.id);
                            // Use unified success page for both individual and organization
                            const callbackUrl = process.env.NEXT_PUBLIC_PAYSTACK_CALLBACK_URL || `${window.location.origin}/dashboard/subscription-success`;
                            const response = await initializeSubscription({
                              planId: plan.id,
                              callbackUrl,
                            });
                            // Redirect to Paystack payment page
                            window.location.href = response.authorizationUrl;
                          } catch (error) {
                            console.error("Failed to initialize subscription:", error);
                            setIsInitializing(null);
                          }
                        }
                      }}
                    >
                      {isInitializing === plan.id ? "Processing..." : "Renew Plan"}
                    </button>
                  </div>
                ) : (
                  <button
                    className={`bg-linear-to-r from-[#4185DD] to-[#B425DA] mt-6 px-4 py-2 rounded-md text-xs font-medium ${isDisabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:opacity-90"
                      }`}
                    disabled={isDisabled || isInitializing === plan.id}
                    onClick={async () => {
                      if (!isDisabled && !isInitializing) {
                        try {
                          setIsInitializing(plan.id);
                          // Use unified success page for both individual and organization
                          const callbackUrl = process.env.NEXT_PUBLIC_PAYSTACK_CALLBACK_URL || `${window.location.origin}/dashboard/subscription-success`;
                          const response = await initializeSubscription({
                            planId: plan.id,
                            callbackUrl,
                          });
                          // Redirect to Paystack payment page
                          window.location.href = response.authorizationUrl;
                        } catch (error) {
                          console.error("Failed to initialize subscription:", error);
                          setIsInitializing(null);
                        }
                      }
                    }}
                  >
                    {isInitializing === plan.id ? "Processing..." : "Subscribe"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-white text-sm text-center">
        Copyright © {new Date().getFullYear()} iRES. All Rights Reserved.
      </footer>
    </div>
  );
}
