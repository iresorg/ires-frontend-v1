import api from "@/lib/api";

export type TicketStatus =
  | "CREATED"
  | "ANALYSING"
  | "ASSIGNED"
  | "REASSIGNED"
  | "IN_PROGRESS"
  | "ESCALATED"
  | "RESOLVED"
  | "CLOSED"
  | "PENDING";

export type TicketSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | string;
export type TicketTier = "TIER_1" | "TIER_2" | "TIER_3" | string;
export type EntitlementSource = "subscription" | "payg" | null;

export type TicketLifecycleAction =
  | "CREATED"
  | "ANALYSING"
  | "ASSIGNED"
  | "REASSIGNED"
  | "IN_PROGRESS"
  | "ESCALATED"
  | "RESOLVED"
  | "CLOSED"
  | "PENDING";

export interface TicketCategory {
  id: string;
  name: string;
  createdAt?: string;
}

export interface TicketAccountSummary {
  id: string;
  email: string;
  role: string;
  status: string;
}

export interface TicketStaffSummary {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AccountTicketListItem {
  ticketId: string;
  title: string;
  tier: TicketTier;
  status: TicketStatus;
  severity: TicketSeverity;
  createdAt: string;
  updatedAt: string;
  category: TicketCategory | null;
  subCategory: TicketCategory | null;
  createdFor: TicketAccountSummary;
  entitlementSource: EntitlementSource;
}

export interface AccountTicketDetail extends AccountTicketListItem {
  description: string;
  location?: string | null;
  reporterName?: string | null;
  attachments?: string[];
  createdBy?: TicketStaffSummary | null;
  assignedResponder?: TicketStaffSummary | null;
  contactInfo?: Record<string, unknown> | null;
  victimInfo?: Record<string, unknown> | null;
}

export interface TicketLifecycleEvent {
  id: string;
  ticketId: string;
  action: TicketLifecycleAction;
  notes: string | null;
  createdAt: string;
  performedBy: TicketStaffSummary | null;
}

export interface TicketsPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

export interface PaginatedTicketsResponse {
  message: string;
  data: AccountTicketListItem[];
  pagination: TicketsPagination;
}

export interface TicketDetailResponse {
  message: string;
  data: AccountTicketDetail;
}

export interface PaginatedLifecycleResponse {
  message: string;
  data: TicketLifecycleEvent[];
  pagination: TicketsPagination;
}

export interface GetTicketsParams {
  page?: number;
  limit?: number;
  status?: TicketStatus | "";
}

/** Customer-facing status labels from PUBLIC_ACCOUNT_TICKETS.md */
export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  CREATED: "Submitted",
  ANALYSING: "Under review",
  ASSIGNED: "Responder assigned",
  REASSIGNED: "Responder changed",
  IN_PROGRESS: "In progress",
  ESCALATED: "Escalated",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
  PENDING: "Pending",
};

export const TICKET_STATUS_FILTERS: { value: TicketStatus | ""; label: string }[] =
  [
    { value: "", label: "All statuses" },
    { value: "CREATED", label: "Submitted" },
    { value: "ANALYSING", label: "Under review" },
    { value: "ASSIGNED", label: "Responder assigned" },
    { value: "REASSIGNED", label: "Responder changed" },
    { value: "IN_PROGRESS", label: "In progress" },
    { value: "ESCALATED", label: "Escalated" },
    { value: "RESOLVED", label: "Resolved" },
    { value: "CLOSED", label: "Closed" },
  ];

export function getTicketStatusLabel(status: string): string {
  return (
    TICKET_STATUS_LABELS[status as TicketStatus] ||
    status.replace(/_/g, " ").toLowerCase()
  );
}

export function getTicketStatusBadgeClass(status: string): string {
  switch (status) {
    case "RESOLVED":
    case "CLOSED":
      return "bg-[#15CA40]/75";
    case "ESCALATED":
    case "CRITICAL":
      return "bg-[#EF4444]/90";
    case "IN_PROGRESS":
    case "ASSIGNED":
    case "REASSIGNED":
      return "bg-[#4185DD]/80";
    case "ANALYSING":
    case "CREATED":
    case "PENDING":
      return "bg-[#FBBF24]/80";
    default:
      return "bg-neutral-800";
  }
}

export function getSeverityBadgeClass(severity: string): string {
  switch (severity?.toUpperCase()) {
    case "CRITICAL":
      return "bg-[#EF4444]/90";
    case "HIGH":
      return "bg-[#F97316]/85";
    case "MEDIUM":
      return "bg-[#FBBF24]/80";
    case "LOW":
      return "bg-[#15CA40]/70";
    default:
      return "bg-neutral-800";
  }
}

export function getEntitlementLabel(source: EntitlementSource): string {
  if (source === "subscription") return "Subscription";
  if (source === "payg") return "Pay as you go";
  return "—";
}

export function formatTicketDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTicketDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatStaffName(
  person?: TicketStaffSummary | null,
): string {
  if (!person) return "—";
  const name = `${person.firstName || ""} ${person.lastName || ""}`.trim();
  return name || "—";
}

export const ticketService = {
  getTickets: async (
    params: GetTicketsParams = {},
  ): Promise<PaginatedTicketsResponse> => {
    const query: Record<string, string | number> = {};
    if (params.page) query.page = params.page;
    if (params.limit) query.limit = params.limit;
    if (params.status) query.status = params.status;

    const response = await api.get<PaginatedTicketsResponse>(
      "/accounts/tickets",
      { params: query },
    );
    return response.data;
  },

  getTicket: async (ticketId: string): Promise<AccountTicketDetail> => {
    const response = await api.get<TicketDetailResponse>(
      `/accounts/tickets/${encodeURIComponent(ticketId)}`,
    );
    return response.data.data;
  },

  getTicketLifecycle: async (
    ticketId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedLifecycleResponse> => {
    const response = await api.get<PaginatedLifecycleResponse>(
      `/accounts/tickets/${encodeURIComponent(ticketId)}/lifecycle`,
      { params: { page, limit } },
    );
    return response.data;
  },
};
