import api from "@/lib/api";

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: number;
  accountType: "individual" | "organization";
  amount: string;
  currency: string;
  interval: string;
  description: string;
  features: string[];
  maxIncidents: number | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionStatus {
  id: string;
  status: "active" | "expired" | "cancelled";
  plan: {
    name: string;
    tier: number;
    features: string[];
    maxIncidents: number | null;
  };
  currentPeriodStart: string;
  currentPeriodEnd: string;
  nextBillingDate: string;
}

export interface SubscriptionStatusResponse {
  subscription: SubscriptionStatus | null;
  message?: string;
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

export interface CancelSubscriptionRequest {
  planId: string;
  callbackUrl: string;
}

export interface CancelSubscriptionResponse {
  message: string;
  subscription: {
    status: "active" | "expired" | "cancelled";
    cancelledAt: string | null;
    cancelAtPeriodEnd: boolean;
  };
}

export interface Transaction {
  id: string;
  transactionReference: string;
  date: string;
  amount: string;
  currency: string;
  status: "success" | "pending" | "failed";
  plan: {
    id: string;
    name: string;
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

export const subscriptionService = {
  // Get subscription status for current user
  getSubscriptionStatus: async (): Promise<SubscriptionStatusResponse> => {
    const response = await api.get<SubscriptionStatusResponse>(
      "/subscriptions/status"
    );
    return response.data;
  },

  // Get available plans
  getPlans: async (
    accountType?: "individual" | "organization"
  ): Promise<SubscriptionPlan[]> => {
    const params = accountType ? { accountType } : {};
    const response = await api.get<SubscriptionPlan[]>("/subscriptions/plans", {
      params,
    });
    return response.data;
  },

  // Initialize subscription (start payment process)
  initializeSubscription: async (
    data: InitializeSubscriptionRequest
  ): Promise<InitializeSubscriptionResponse> => {
    const response = await api.post<InitializeSubscriptionResponse>(
      "/subscriptions/initialize",
      data
    );
    return response.data;
  },

  // Cancel subscription
  cancelSubscription: async (
    data: CancelSubscriptionRequest
  ): Promise<CancelSubscriptionResponse> => {
    const response = await api.post<CancelSubscriptionResponse>(
      "/subscriptions/cancel",
      data
    );
    return response.data;
  },

  // Get transaction history
  getTransactions: async (
    page: number = 1,
    limit: number = 10
  ): Promise<TransactionsResponse> => {
    const response = await api.get<TransactionsResponse>(
      "/subscriptions/transactions",
      {
        params: { page, limit },
      }
    );
    return response.data;
  },
};
