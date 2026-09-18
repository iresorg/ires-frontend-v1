/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type {
  AccountType,
  PaymentType,
  SubscriptionPlan,
  SubscriptionStatus,
  PaygStatus,
  EntitlementStatus,
  InitializeSubscriptionRequest,
  InitializeSubscriptionResponse,
  Transaction,
  GetPlansParams,
} from "@/services/subscription";
import { subscriptionService } from "@/services/subscription";

interface PaginationMeta {
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

interface SubscriptionState {
  subscription: SubscriptionStatus | null;
  payg: PaygStatus | null;
  entitlement: EntitlementStatus | null;
  statusMessage: string | null;
  plans: SubscriptionPlan[];
  transactions: Transaction[];
  transactionsPagination: PaginationMeta | null;
  isLoading: boolean;
  isStatusLoading: boolean;
  error: string | null;
  setSubscription: (subscription: SubscriptionStatus | null) => void;
  setPlans: (plans: SubscriptionPlan[]) => void;
  fetchSubscriptionStatus: () => Promise<void>;
  fetchPlans: (params?: GetPlansParams | AccountType) => Promise<void>;
  fetchTransactions: (page?: number, limit?: number) => Promise<void>;
  initializeSubscription: (
    data: InitializeSubscriptionRequest,
  ) => Promise<InitializeSubscriptionResponse>;
  initializePayg: (
    data: InitializeSubscriptionRequest,
  ) => Promise<InitializeSubscriptionResponse>;
  initializeCheckout: (
    plan: Pick<SubscriptionPlan, "id" | "paymentType">,
    callbackUrl: string,
  ) => Promise<InitializeSubscriptionResponse>;
  cancelSubscription: () => Promise<void>;
  resumeSubscription: () => Promise<void>;
  clearSubscription: () => void;
}

const defaultPayg: PaygStatus = {
  paymentType: "one_time",
  creditsAvailable: 0,
};

const defaultEntitlement: EntitlementStatus = {
  hasAccess: false,
  sources: [],
};

function normalizeFetchParams(
  params?: GetPlansParams | AccountType,
): GetPlansParams {
  if (!params) return {};
  if (typeof params === "string") return { accountType: params };
  return params;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscription: null,
  payg: null,
  entitlement: null,
  statusMessage: null,
  plans: [],
  transactions: [],
  transactionsPagination: null,
  isLoading: false,
  isStatusLoading: false,
  error: null,

  setSubscription: (subscription) => set({ subscription }),

  setPlans: (plans) => set({ plans }),

  fetchSubscriptionStatus: async () => {
    try {
      set({ isStatusLoading: true, error: null });
      const response = await subscriptionService.getSubscriptionStatus();
      set({
        subscription: response.subscription,
        payg: response.payg ?? defaultPayg,
        entitlement: response.entitlement ?? defaultEntitlement,
        statusMessage: response.message ?? null,
        isStatusLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch subscription status:", error);
      set({
        subscription: null,
        payg: defaultPayg,
        entitlement: defaultEntitlement,
        statusMessage: null,
        isStatusLoading: false,
        error: error?.response?.data?.message || "Failed to fetch subscription",
      });
    }
  },

  fetchPlans: async (params?: GetPlansParams | AccountType) => {
    try {
      set({ isLoading: true, error: null });
      const plans = await subscriptionService.getPlans(
        normalizeFetchParams(params),
      );
      set({ plans, isLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch plans:", error);
      set({
        plans: [],
        isLoading: false,
        error: error?.response?.data?.message || "Failed to fetch plans",
      });
    }
  },

  fetchTransactions: async (page: number = 1, limit: number = 10) => {
    try {
      set({ isLoading: true, error: null });
      const response = await subscriptionService.getTransactions(page, limit);
      set({
        transactions: response.data,
        transactionsPagination: {
          total: response.total,
          limit: response.limit,
          page: response.page,
          totalPages: response.totalPages,
          nextPage: response.nextPage,
        },
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch transactions:", error);
      set({
        transactions: [],
        transactionsPagination: null,
        isLoading: false,
        error:
          error?.response?.data?.message || "Failed to fetch transactions",
      });
    }
  },

  initializeSubscription: async (data: InitializeSubscriptionRequest) => {
    try {
      set({ error: null });
      return await subscriptionService.initializeSubscription(data);
    } catch (error: any) {
      console.error("Failed to initialize subscription:", error);
      set({
        error:
          error?.response?.data?.message ||
          "Failed to initialize subscription",
      });
      throw error;
    }
  },

  initializePayg: async (data: InitializeSubscriptionRequest) => {
    try {
      set({ error: null });
      return await subscriptionService.initializePayg(data);
    } catch (error: any) {
      console.error("Failed to initialize pay-as-you-go:", error);
      set({
        error:
          error?.response?.data?.message ||
          "Failed to initialize pay-as-you-go",
      });
      throw error;
    }
  },

  initializeCheckout: async (plan, callbackUrl) => {
    try {
      set({ error: null });
      return await subscriptionService.initializeCheckout(plan, callbackUrl);
    } catch (error: any) {
      console.error("Failed to initialize checkout:", error);
      set({
        error:
          error?.response?.data?.message || "Failed to initialize checkout",
      });
      throw error;
    }
  },

  cancelSubscription: async () => {
    try {
      set({ error: null });
      await subscriptionService.cancelSubscription();
      await get().fetchSubscriptionStatus();
    } catch (error: any) {
      console.error("Failed to cancel subscription:", error);
      set({
        error:
          error?.response?.data?.message || "Failed to cancel subscription",
      });
      throw error;
    }
  },

  resumeSubscription: async () => {
    try {
      set({ error: null });
      await subscriptionService.resumeSubscription();
      await get().fetchSubscriptionStatus();
    } catch (error: any) {
      console.error("Failed to resume subscription:", error);
      set({
        error:
          error?.response?.data?.message || "Failed to resume subscription",
      });
      throw error;
    }
  },

  clearSubscription: () => {
    set({
      subscription: null,
      payg: null,
      entitlement: null,
      statusMessage: null,
      plans: [],
      transactions: [],
      transactionsPagination: null,
      error: null,
    });
  },
}));

export type { PaymentType, AccountType };
