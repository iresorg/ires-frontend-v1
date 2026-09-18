import api from "@/lib/api";

export type AccountType = "individual" | "organization";
export type PaymentType = "subscription" | "one_time";
export type SubscriptionLifecycleStatus =
  | "active"
  | "expired"
  | "cancelled"
  | "past_due";

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: number;
  accountType: AccountType;
  paymentType: PaymentType;
  amount: number;
  currency: string;
  interval: string | null;
  description: string;
  features: string[];
  maxIncidents: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionUsage {
  usedIncidents: number;
  remainingIncidents: number | null;
  maxIncidents: number | null;
}

export interface SubscriptionStatus {
  id: string;
  status: SubscriptionLifecycleStatus;
  cancelAtPeriodEnd: boolean;
  plan: {
    id: string;
    name: string;
    tier: number;
    accountType: AccountType;
    paymentType: PaymentType;
    interval: string | null;
    amount: number;
    currency: string;
    features: string[];
    maxIncidents: number | null;
  };
  usage: SubscriptionUsage;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
}

export interface PaygStatus {
  paymentType: "one_time";
  creditsAvailable: number;
}

export interface EntitlementStatus {
  hasAccess: boolean;
  sources: PaymentType[];
}

export interface SubscriptionStatusResponse {
  subscription: SubscriptionStatus | null;
  payg: PaygStatus;
  entitlement: EntitlementStatus;
  message?: string;
}

export interface GetPlansParams {
  accountType?: AccountType;
  paymentType?: PaymentType;
}

export interface InitializeSubscriptionRequest {
  planId: string;
  callbackUrl: string;
}

export interface InitializeSubscriptionResponse {
  authorizationUrl: string;
  reference: string;
  accessCode: string;
}

export interface CancelSubscriptionResponse {
  message: string;
  subscription: {
    status: SubscriptionLifecycleStatus;
    cancelledAt: string | null;
    cancelAtPeriodEnd: boolean;
  };
}

export interface ResumeSubscriptionResponse {
  message: string;
  subscription: {
    cancelAtPeriodEnd: boolean;
  };
}

export interface Transaction {
  id: string;
  transactionReference: string;
  date: string;
  amount: number | string;
  currency: string;
  status: "success" | "pending" | "failed";
  plan: {
    id?: string;
    name: string;
    tier?: number;
  } | null;
  paymentMethod: string;
}

export interface TransactionsResponse {
  data: Transaction[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

/** Format amount in kobo to NGN display string */
export function formatKoboToNaira(amount: number | string): string {
  const kobo =
    typeof amount === "string" ? Number.parseInt(amount, 10) || 0 : amount;
  const naira = kobo / 100;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(naira);
}

/** Price label for plan cards */
export function formatPlanPrice(plan: Pick<SubscriptionPlan, "amount" | "interval" | "paymentType">): string {
  const price = formatKoboToNaira(plan.amount);
  if (plan.paymentType === "one_time" || !plan.interval) {
    return price;
  }
  if (plan.interval === "monthly") {
    return `${price} / month`;
  }
  return `${price} / ${plan.interval}`;
}

export function formatIncidentsLabel(maxIncidents: number | null): string {
  if (maxIncidents === null) return "Unlimited incidents";
  return maxIncidents === 1
    ? "1 incident"
    : `${maxIncidents} incidents`;
}

export const subscriptionService = {
  getSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await api.get<SubscriptionStatusResponse>(
      "/subscriptions/status",
    );
    return response.data;
  },

  getPlans: async (params: GetPlansParams = {}): Promise<SubscriptionPlan[]> => {
    const query: Record<string, string> = {};
    if (params.accountType) query.accountType = params.accountType;
    if (params.paymentType) query.paymentType = params.paymentType;

    const response = await api.get<SubscriptionPlan[]>("/subscriptions/plans", {
      params: query,
    });

    return (response.data ?? []).map((plan) => ({
      ...plan,
      amount:
        typeof plan.amount === "string"
          ? Number.parseInt(plan.amount as unknown as string, 10) || 0
          : plan.amount,
      paymentType: plan.paymentType ?? "subscription",
      interval: plan.interval ?? null,
    }));
  },

  initializeSubscription: async (
    data: InitializeSubscriptionRequest,
  ): Promise<InitializeSubscriptionResponse> => {
    const response = await api.post<InitializeSubscriptionResponse>(
      "/subscriptions/initialize",
      data,
    );
    return response.data;
  },

  initializePayg: async (
    data: InitializeSubscriptionRequest,
  ): Promise<InitializeSubscriptionResponse> => {
    const response = await api.post<InitializeSubscriptionResponse>(
      "/subscriptions/initialize-payg",
      data,
    );
    return response.data;
  },

  /** Start checkout for either subscription or one-time plan */
  initializeCheckout: async (
    plan: Pick<SubscriptionPlan, "id" | "paymentType">,
    callbackUrl: string,
  ): Promise<InitializeSubscriptionResponse> => {
    const payload = { planId: plan.id, callbackUrl };
    if (plan.paymentType === "one_time") {
      return subscriptionService.initializePayg(payload);
    }
    return subscriptionService.initializeSubscription(payload);
  },

  cancelSubscription: async (): Promise<CancelSubscriptionResponse> => {
    const response = await api.post<CancelSubscriptionResponse>(
      "/subscriptions/cancel",
    );
    return response.data;
  },

  resumeSubscription: async (): Promise<ResumeSubscriptionResponse> => {
    const response = await api.post<ResumeSubscriptionResponse>(
      "/subscriptions/resume",
    );
    return response.data;
  },

  getTransactions: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<TransactionsResponse> => {
    const response = await api.get<TransactionsResponse>(
      "/subscriptions/transactions",
      {
        params: { page, limit },
      },
    );
    return response.data;
  },
};
