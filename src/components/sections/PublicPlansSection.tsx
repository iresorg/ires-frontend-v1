"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { PlansGridSkeleton } from "@/components/ui/PlanCardSkeleton";
import { useAuthStore } from "@/store/auth";
import {
  subscriptionService,
  formatPlanPrice,
  formatIncidentsLabel,
  type AccountType,
  type PaymentType,
  type SubscriptionPlan,
} from "@/services/subscription";

const getPlanIcon = (tier: number, paymentType: PaymentType) => {
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

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active
          ? "text-white"
          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
      }`}
      style={active ? { background: "var(--btn-bg)" } : undefined}
    >
      {children}
    </button>
  );
}

function parseAccountType(value: string | null): AccountType | null {
  return value === "individual" || value === "organization" ? value : null;
}

function parsePaymentType(value: string | null): PaymentType | null {
  return value === "subscription" || value === "one_time" ? value : null;
}

export default function PublicPlansSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuthStore();
  const [accountType, setAccountType] = useState<AccountType>(
    () => parseAccountType(searchParams.get("accountType")) ?? "individual",
  );
  const [paymentType, setPaymentType] = useState<PaymentType>(
    () => parsePaymentType(searchParams.get("paymentType")) ?? "subscription",
  );
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutPlanId, setCheckoutPlanId] = useState<string | null>(null);

  // Prefer URL filters; otherwise default to logged-in role once
  useEffect(() => {
    if (parseAccountType(searchParams.get("accountType"))) return;
    if (user?.role === "organization" || user?.role === "individual") {
      setAccountType(user.role);
    }
  }, [user?.role, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("accountType", accountType);
    params.set("paymentType", paymentType);
    router.replace(`/pricing?${params.toString()}`, { scroll: false });
  }, [accountType, paymentType, router]);

  const loadPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await subscriptionService.getPlans({
        accountType,
        paymentType,
      });
      setPlans([...data].sort((a, b) => a.tier - b.tier));
    } catch (err) {
      console.error("Failed to load plans:", err);
      setPlans([]);
      setError("Unable to load plans. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [accountType, paymentType]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const handleCheckout = async (plan: SubscriptionPlan) => {
    if (!isAuthenticated || !user) {
      const returnTo = `/pricing?accountType=${accountType}&paymentType=${paymentType}`;
      router.push(`/login?redirect=${encodeURIComponent(returnTo)}`);
      return;
    }

    try {
      setCheckoutPlanId(plan.id);
      const callbackUrl =
        process.env.NEXT_PUBLIC_PAYSTACK_CALLBACK_URL ||
        `${window.location.origin}/dashboard/subscription-success`;
      const response = await subscriptionService.initializeCheckout(
        plan,
        callbackUrl,
      );
      window.location.href = response.authorizationUrl;
    } catch (err) {
      console.error("Checkout failed:", err);
      setCheckoutPlanId(null);
      // Fallback: send authenticated users to dashboard plans if initialize fails (e.g. 409)
      const plansRoute =
        user.role === "organization"
          ? "/dashboard/organization/subscription-plans"
          : "/dashboard/subscription-plans";
      router.push(plansRoute);
    }
  };

  const ctaLabel = (plan: SubscriptionPlan) => {
    if (checkoutPlanId === plan.id) return "Processing...";
    return plan.paymentType === "one_time"
      ? "Pay for one incident"
      : "Subscribe";
  };

  return (
    <div className="relative w-full overflow-hidden py-14 lg:py-20">
      <div className="security-grid pointer-events-none absolute inset-0 opacity-30" />

      <Section className="relative z-10">
        <div className="mb-10 space-y-4 text-start">
          <SectionTitle
            logo="/logos/ires-logo.svg"
            logoAlt="iRES Logo"
            title="Our Plans"
          />
          <h2 className="text-lg font-light leading-tight text-white lg:text-2xl xl:text-3xl">
            <span
              className="gradient-shift mr-2 inline-block bg-clip-text font-bold text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--accent-color) 0%, var(--accent-secondary-color) 50%, var(--accent-color) 100%)",
              }}
            >
              Choose
            </span>
            the cover that fits you
          </h2>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={accountType === "individual"}
              onClick={() => setAccountType("individual")}
            >
              Individual
            </FilterPill>
            <FilterPill
              active={accountType === "organization"}
              onClick={() => setAccountType("organization")}
            >
              Organization
            </FilterPill>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterPill
              active={paymentType === "subscription"}
              onClick={() => setPaymentType("subscription")}
            >
              Subscriptions
            </FilterPill>
            <FilterPill
              active={paymentType === "one_time"}
              onClick={() => setPaymentType("one_time")}
            >
              One-off plan
            </FilterPill>
          </div>
        </div>

        {isLoading ? (
          <PlansGridSkeleton count={3} />
        ) : error ? (
          <div className="rounded-2xl p-8 text-center glass-panel brand-border">
            <p className="text-white/80">{error}</p>
            <button
              type="button"
              onClick={loadPlans}
              className="mt-4 rounded-lg px-5 py-2 text-sm font-medium text-white"
              style={{ background: "var(--btn-bg)" }}
            >
              Retry
            </button>
          </div>
        ) : plans.length === 0 ? (
          <div className="rounded-2xl p-8 text-center glass-panel brand-border">
            <p className="text-white/80">
              No plans available for this selection.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-stretch justify-center gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className="relative flex w-full max-w-[340px] flex-col rounded-2xl brand-border"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                whileHover={{ y: -6 }}
              >
                <div className="flex flex-1 flex-col justify-between space-y-3 rounded-2xl bg-[#1C1B2B] p-5">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#141327] px-4 py-2 ring-1 ring-white/10">
                      <Image
                        src={getPlanIcon(plan.tier, plan.paymentType)}
                        alt=""
                        width={20}
                        height={20}
                      />
                      <h3
                        className="text-sm font-semibold bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, var(--accent-color), var(--accent-secondary-color))",
                        }}
                      >
                        {plan.name}
                      </h3>
                    </div>

                    <p
                      className="mt-4 text-xl font-semibold italic bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, var(--accent-color), var(--accent-secondary-color))",
                      }}
                    >
                      {formatPlanPrice(plan)}
                      {plan.paymentType === "one_time" && (
                        <span className="ml-1 text-sm font-normal not-italic text-white/50">
                          / incident
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-xs italic text-white/55">
                      {plan.description}
                    </p>
                    <p className="mt-2 text-xs font-medium text-white/70">
                      {formatIncidentsLabel(plan.maxIncidents)}
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Image
                          src="/images/checkbox.png"
                          alt=""
                          width={14}
                          height={14}
                          className="mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    disabled={checkoutPlanId === plan.id}
                    onClick={() => handleCheckout(plan)}
                    className="mt-6 w-full rounded-md px-4 py-2.5 text-xs font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{ background: "var(--btn-bg)" }}
                  >
                    {ctaLabel(plan)}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
