import api from "@/lib/api";
import type { TicketStatus } from "@/services/tickets";

export type CoverageSource = "subscription" | "payg" | null;

export interface OverviewIncidents {
  total: number;
  open: number;
  closed: number;
}

export interface OverviewTickets {
  total: number;
  open: number;
  resolved: number;
  closed: number;
  byStatus: Record<TicketStatus, number>;
}

export interface OverviewCoverage {
  eligible: boolean;
  source: CoverageSource;
  planName: string | null;
  maxIncidents: number | null;
  usedIncidents: number;
  remainingIncidents: number | null;
  paygCreditsAvailable: number;
}

export interface AccountOverview {
  message?: string;
  incidents: OverviewIncidents;
  tickets: OverviewTickets;
  coverage: OverviewCoverage;
}

export const overviewService = {
  get: async (): Promise<AccountOverview> => {
    const response = await api.get<AccountOverview>("/accounts/overview");
    return response.data;
  },
};
