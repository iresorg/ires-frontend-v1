/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type {
  SubscriptionPlan,
  SubscriptionStatus,
  InitializeSubscriptionRequest,
  InitializeSubscriptionResponse,
  Transaction,
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
  plans: SubscriptionPlan[];
  transactions: Transaction[];
  transactionsPagination: PaginationMeta | null;
  isLoading: boolean;
  error: string | null;
  setSubscription: (subscription: SubscriptionStatus | null) => void;
  setPlans: (plans: SubscriptionPlan[]) => void;
  fetchSubscriptionStatus: () => Promise<void>;
  fetchPlans: (accountType?: "individual" | "organization") => Promise<void>;
  fetchTransactions: (page?: number, limit?: number) => Promise<void>;
  initializeSubscription: (
    data: InitializeSubscriptionRequest
  ) => Promise<InitializeSubscriptionResponse>;
  clearSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: null,
  plans: [],
  transactions: [],
  transactionsPagination: null,
  isLoading: false,
  error: null,

  setSubscription: (subscription) => set({ subscription }),

  setPlans: (plans) => set({ plans }),

  fetchSubscriptionStatus: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await subscriptionService.getSubscriptionStatus();
      set({
        subscription: response.subscription,
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch subscription status:", error);
      set({
        subscription: null,
        isLoading: false,
        error: error?.response?.data?.message || "Failed to fetch subscription",
      });
    }
  },

  fetchPlans: async (accountType?: "individual" | "organization") => {
    try {
      set({ isLoading: true, error: null });
      const plans = await subscriptionService.getPlans(accountType);
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
        error: error?.response?.data?.message || "Failed to fetch transactions",
      });
    }
  },

  initializeSubscription: async (data: InitializeSubscriptionRequest) => {
    try {
      set({ isLoading: true, error: null });
      const response = await subscriptionService.initializeSubscription(data);
      set({ isLoading: false });
      return response;
    } catch (error: any) {
      console.error("Failed to initialize subscription:", error);
      set({
        isLoading: false,
        error:
          error?.response?.data?.message || "Failed to initialize subscription",
      });
      throw error;
    }
  },

  clearSubscription: () => {
    set({
      subscription: null,
      plans: [],
      transactions: [],
      transactionsPagination: null,
      error: null,
    });
  },
}));
