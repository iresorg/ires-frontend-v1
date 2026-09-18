"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth";
import { useSubscriptionStore } from "@/store/subscription";
import { PlansGridSkeleton } from "@/components/ui/PlanCardSkeleton";
import {
  formatPlanPrice,
  formatIncidentsLabel,
  formatKoboToNaira,
  type PaymentType,
  type SubscriptionPlan,
} from "@/services/subscription";

const getPlanIcon = (tier: number, paymentType?: PaymentType) => {
  if (paymentType === "one_time") return "/images/cube.png";
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

export default function SubscriptionPlansPage() {
  const { user } = useAuthStore();
  const {
    subscription,
    payg,
    entitlement,
    plans,
    isLoading,
    isStatusLoading,
    fetchSubscriptionStatus,
    fetchPlans,
    initializeCheckout,
    cancelSubscription,
    resumeSubscription,
  } = useSubscriptionStore();

  const [paymentType, setPaymentType] = useState<PaymentType>("subscription");
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<string | null>(null);
  const [isManaging, setIsManaging] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);
  const lastUserRoleRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user?.role) {
      hasFetchedRef.current = false;
      lastUserRoleRef.current = null;
      return;
    }

    const shouldFetch =
      !hasFetchedRef.current || lastUserRoleRef.current !== user.role;

    if (shouldFetch) {
      hasFetchedRef.current = true;
      lastUserRoleRef.current = user.role;
      fetchSubscriptionStatus();
    }
  }, [user?.role, fetchSubscriptionStatus]);

  useEffect(() => {
    if (!user?.role) return;
    fetchPlans({ accountType: user.role, paymentType });
  }, [user?.role, paymentType, fetchPlans]);

  useEffect(() => {
    if (subscription?.plan?.id) {
      setCurrentPlanId(subscription.plan.id);
      return;
    }
    if (subscription) {
      const matchingPlan = plans.find(
        (plan) =>
          plan.paymentType === "subscription" &&
          plan.tier === subscription.plan.tier,
      );
      setCurrentPlanId(matchingPlan?.id ?? null);
      return;
    }
    setCurrentPlanId(null);
  }, [subscription, plans]);

  const sortedPlans = [...plans].sort((a, b) => a.tier - b.tier);
  const hasActiveSubscription = subscription?.status === "active";
  const subscriptionExpired =
    !!subscription && new Date(subscription.currentPeriodEnd) < new Date();
  const hasAccess = entitlement?.hasAccess ?? false;

  const getCallbackUrl = () =>
    process.env.NEXT_PUBLIC_PAYSTACK_CALLBACK_URL ||
    `${window.location.origin}/dashboard/subscription-success`;

  const handleCheckout = async (plan: SubscriptionPlan) => {
    if (isInitializing) return;
    try {
      setActionError(null);
      setIsInitializing(plan.id);
      const response = await initializeCheckout(plan, getCallbackUrl());
      window.location.href = response.authorizationUrl;
    } catch (error: unknown) {
      console.error("Failed to initialize checkout:", error);
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Checkout failed. Please try again.";
      setActionError(message);
      setIsInitializing(null);
    }
  };

  const handleCancel = async () => {
    if (isManaging) return;
    try {
      setIsManaging(true);
      setActionError(null);
      await cancelSubscription();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to cancel subscription.";
      setActionError(message);
    } finally {
      setIsManaging(false);
    }
  };

  const handleResume = async () => {
    if (isManaging) return;
    try {
      setIsManaging(true);
      setActionError(null);
      await resumeSubscription();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to resume subscription.";
      setActionError(message);
    } finally {
      setIsManaging(false);
    }
  };

  if (!user?.role) {
    return (
      <div className="flex min-h-[320px] items-center justify-center text-white">
        <p className="text-white/60">Please log in to view subscription plans.</p>
      </div>
    );
  }

  const showSkeletons = isLoading && plans.length === 0;

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Subscription plans
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Manage cover, pay-as-you-go credits, and billing
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            [
              ["subscription", "Subscriptions"],
              ["one_time", "Pay as you go"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setPaymentType(value)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                paymentType === value
                  ? "text-white"
                  : "bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10"
              }`}
              style={
                paymentType === value
                  ? { background: "var(--btn-bg)" }
                  : undefined
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 rounded-2xl bg-[#141327]/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
        {isStatusLoading && !subscription && !payg ? (
          <div className="h-16 animate-pulse rounded-xl bg-white/5" />
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40">
                Billing status
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {hasAccess ? "Access active" : "No active cover"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {subscription && (
                  <span className="rounded-lg bg-white/5 px-3 py-1 capitalize text-white/80 ring-1 ring-white/10">
                    Subscription · {subscription.status}
                    {subscription.cancelAtPeriodEnd ? " · ends soon" : ""}
                  </span>
                )}
                {subscription?.plan?.paymentType && (
                  <span className="rounded-lg bg-white/5 px-3 py-1 text-white/80 ring-1 ring-white/10">
                    {subscription.plan.name}
                  </span>
                )}
                <span className="rounded-lg bg-white/5 px-3 py-1 text-white/80 ring-1 ring-white/10">
                  PAYG credits: {payg?.creditsAvailable ?? 0}
                </span>
                {subscription?.usage && (
                  <span className="rounded-lg bg-white/5 px-3 py-1 text-white/80 ring-1 ring-white/10">
                    Incidents used: {subscription.usage.usedIncidents}
                    {subscription.usage.remainingIncidents === null
                      ? " · Unlimited left"
                      : ` · ${subscription.usage.remainingIncidents} left`}
                  </span>
                )}
              </div>
            </div>

            {subscription?.status === "active" && (
              <div className="flex flex-wrap gap-2">
                {subscription.cancelAtPeriodEnd ? (
                  <button
                    type="button"
                    disabled={isManaging}
                    onClick={handleResume}
                    className="rounded-xl px-4 py-2 text-xs font-medium text-white disabled:opacity-50"
                    style={{ background: "var(--btn-bg)" }}
                  >
                    {isManaging ? "Updating..." : "Resume plan"}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isManaging}
                    onClick={handleCancel}
                    className="rounded-xl px-4 py-2 text-xs font-medium text-white/90 ring-1 ring-white/15 hover:bg-white/5 disabled:opacity-50"
                  >
                    {isManaging ? "Updating..." : "Cancel at period end"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {actionError && (
        <p className="mb-4 text-sm text-red-400">{actionError}</p>
      )}

      {showSkeletons ? (
        <PlansGridSkeleton count={3} />
      ) : sortedPlans.length === 0 ? (
        <div className="rounded-2xl bg-[#141327]/90 p-8 text-center text-white/60 ring-1 ring-white/10">
          <p>No plans available for this selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {sortedPlans.map((plan) => {
            const isCurrentPlan =
              plan.paymentType === "subscription" && plan.id === currentPlanId;
            const isDisabled =
              plan.paymentType === "subscription" &&
              hasActiveSubscription &&
              !isCurrentPlan;
            const showExpiryAndRenew =
              isCurrentPlan && hasActiveSubscription;
            const canRenew = subscriptionExpired;
            const buttonLabel =
              plan.paymentType === "one_time"
                ? "Pay for one incident"
                : "Subscribe";

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl bg-[#141327]/90 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10 ${
                  isCurrentPlan
                    ? "ring-[var(--accent-color)]/40"
                    : ""
                } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
              >
                {isCurrentPlan && (
                  <div
                    className="absolute -top-3 left-4 z-10 rounded-lg px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: "var(--btn-bg)" }}
                  >
                    Current plan
                  </div>
                )}

                <div className="flex flex-1 flex-col">
                  <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-white/5 px-3 py-2 ring-1 ring-white/10">
                    <Image
                      src={getPlanIcon(plan.tier, plan.paymentType)}
                      alt={plan.name}
                      width={20}
                      height={20}
                    />
                    <h3 className="text-sm font-semibold text-white">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="mt-4 text-2xl font-semibold tracking-tight">
                    <motion.span
                      className="inline-block bg-clip-text text-transparent"
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
                      {formatPlanPrice(plan)}
                    </motion.span>
                  </p>
                  <p className="mt-2 text-sm text-white/55">{plan.description}</p>
                  <p className="mt-1 text-xs text-white/45">
                    {formatIncidentsLabel(plan.maxIncidents)}
                    {isCurrentPlan && subscription?.plan?.amount != null && (
                      <> · {formatKoboToNaira(subscription.plan.amount)}</>
                    )}
                  </p>

                  <ul className="mt-5 flex-1 space-y-2.5 text-sm text-white/70">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Image
                          src="/images/checkbox.png"
                          alt=""
                          width={14}
                          height={14}
                          className="mt-0.5 shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {showExpiryAndRenew ? (
                    <div className="mt-6 flex gap-2 text-xs font-medium">
                      <div
                        className="flex-1 rounded-xl px-3 py-2 text-center text-white"
                        style={{ background: "var(--btn-bg)" }}
                      >
                        <p className="text-[10px] opacity-80">Expires</p>
                        <p>{formatDate(subscription!.currentPeriodEnd)}</p>
                      </div>
                      <button
                        type="button"
                        className={`flex-1 rounded-xl px-3 py-2 text-white ${
                          canRenew
                            ? "cursor-pointer hover:opacity-90"
                            : "cursor-not-allowed opacity-50"
                        }`}
                        style={{ background: "var(--btn-bg)" }}
                        disabled={!canRenew || isInitializing === plan.id}
                        onClick={() => handleCheckout(plan)}
                      >
                        {isInitializing === plan.id
                          ? "Processing..."
                          : "Renew plan"}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white ${
                        isDisabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer hover:opacity-90"
                      }`}
                      style={{ background: "var(--btn-bg)" }}
                      disabled={isDisabled || isInitializing === plan.id}
                      onClick={() => handleCheckout(plan)}
                    >
                      {isInitializing === plan.id
                        ? "Processing..."
                        : buttonLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
