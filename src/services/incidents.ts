import api from "@/lib/api";
import type { IncidentOngoing, IncidentSeverity } from "@/services/incidentReport";

export interface IncidentAgent {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Incident {
  id: string;
  reference: string;
  accountId: string;
  status: "OPEN" | "CLOSED";
  severity: IncidentSeverity;
  incidentType: string;
  ongoing: IncidentOngoing;
  name: string;
  organization: string;
  phone: string;
  email: string;
  detectedAt: string | null;
  affectedSystems: string | null;
  description: string;
  assignedAgent: IncidentAgent | null;
  ticketId: string | null;
  ticketStatus: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentsPage {
  message: string;
  data: Incident[];
  total: number;
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export interface IncidentUpdate {
  ongoing?: IncidentOngoing;
  phone?: string;
  detectedAt?: string;
  affectedSystems?: string;
  description?: string;
}

export function incidentCanBeEdited(incident: Incident) {
  return incident.status === "OPEN" && incident.ticketStatus !== "CLOSED";
}

export const incidentsService = {
  list: async (params: {
    page?: number;
    limit?: number;
    status?: "OPEN" | "CLOSED" | "";
  }): Promise<IncidentsPage> => {
    const response = await api.get<IncidentsPage>("/accounts/incidents", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
        ...(params.status ? { status: params.status } : {}),
      },
    });
    return response.data;
  },

  get: async (id: string): Promise<Incident> => {
    const response = await api.get<{ message: string; incident: Incident }>(
      `/accounts/incidents/${id}`,
    );
    return response.data.incident;
  },

  update: async (id: string, data: IncidentUpdate): Promise<Incident> => {
    const response = await api.patch<{ message: string; incident: Incident }>(
      `/accounts/incidents/${id}`,
      data,
    );
    return response.data.incident;
  },
};
