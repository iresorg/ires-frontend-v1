/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import type {
  SubscriptionPlan,
  SubscriptionStatus,
} from "@/services/subscription";
import { subscriptionService } from "@/services/subscription";

interface SubscriptionState {
  subscription: SubscriptionStatus | null;
  plans: SubscriptionPlan[];
  isLoading: boolean;
  error: string | null;
  setSubscription: (subscription: SubscriptionStatus | null) => void;
  setPlans: (plans: SubscriptionPlan[]) => void;
  fetchSubscriptionStatus: () => Promise<void>;
  fetchPlans: (accountType?: "individual" | "organization") => Promise<void>;
  clearSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: null,
  plans: [],
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

  clearSubscription: () => {
    set({ subscription: null, plans: [], error: null });
  },
}));
