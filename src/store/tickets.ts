/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import {
  ticketService,
  type AccountTicketDetail,
  type AccountTicketListItem,
  type GetTicketsParams,
  type TicketLifecycleEvent,
  type TicketsPagination,
  type TicketStatus,
} from "@/services/tickets";

interface TicketsState {
  tickets: AccountTicketListItem[];
  pagination: TicketsPagination | null;
  selectedTicket: AccountTicketDetail | null;
  lifecycle: TicketLifecycleEvent[];
  lifecyclePagination: TicketsPagination | null;
  isLoading: boolean;
  isDetailLoading: boolean;
  isLifecycleLoading: boolean;
  error: string | null;
  detailError: string | null;
  fetchTickets: (params?: GetTicketsParams) => Promise<void>;
  fetchTicket: (ticketId: string) => Promise<void>;
  fetchLifecycle: (
    ticketId: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;
  clearSelectedTicket: () => void;
  clearError: () => void;
}

export const useTicketsStore = create<TicketsState>((set) => ({
  tickets: [],
  pagination: null,
  selectedTicket: null,
  lifecycle: [],
  lifecyclePagination: null,
  isLoading: false,
  isDetailLoading: false,
  isLifecycleLoading: false,
  error: null,
  detailError: null,

  fetchTickets: async (params: GetTicketsParams = {}) => {
    try {
      set({ isLoading: true, error: null });
      const response = await ticketService.getTickets(params);
      set({
        tickets: response.data ?? [],
        pagination: response.pagination ?? null,
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch tickets:", error);
      set({
        tickets: [],
        pagination: null,
        isLoading: false,
        error:
          error?.response?.data?.message || "Failed to load your incidents",
      });
    }
  },

  fetchTicket: async (ticketId: string) => {
    try {
      set({ isDetailLoading: true, detailError: null, selectedTicket: null });
      const ticket = await ticketService.getTicket(ticketId);
      set({ selectedTicket: ticket, isDetailLoading: false });
    } catch (error: any) {
      console.error("Failed to fetch ticket:", error);
      const status = error?.response?.status;
      const message =
        status === 403
          ? "You do not have access to this ticket"
          : error?.response?.data?.message || "Failed to load ticket details";
      set({
        selectedTicket: null,
        isDetailLoading: false,
        detailError: message,
      });
    }
  },

  fetchLifecycle: async (ticketId: string, page = 1, limit = 10) => {
    try {
      set({ isLifecycleLoading: true });
      const response = await ticketService.getTicketLifecycle(
        ticketId,
        page,
        limit,
      );
      set({
        lifecycle: response.data ?? [],
        lifecyclePagination: response.pagination ?? null,
        isLifecycleLoading: false,
      });
    } catch (error: any) {
      console.error("Failed to fetch ticket lifecycle:", error);
      set({
        lifecycle: [],
        lifecyclePagination: null,
        isLifecycleLoading: false,
      });
    }
  },

  clearSelectedTicket: () =>
    set({
      selectedTicket: null,
      lifecycle: [],
      lifecyclePagination: null,
      detailError: null,
    }),

  clearError: () => set({ error: null, detailError: null }),
}));

export type { TicketStatus };
