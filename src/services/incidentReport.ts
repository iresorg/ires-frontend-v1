import api from "@/lib/api";

export type IncidentSeverity = "Critical" | "High" | "Medium" | "Low";
export type IncidentOngoing = "Yes" | "No" | "Not sure";

export interface IncidentReportRequest {
  severity: IncidentSeverity;
  incidentType: string;
  ongoing: IncidentOngoing;
  name: string;
  organization?: string;
  phone: string;
  email: string;
  detectedAt?: string;
  affectedSystems?: string;
  description: string;
  confirmed: true;
}

export interface IncidentReportResponse {
  message?: string;
  incidentReference?: string;
  accountCreated?: boolean;
}

export const incidentReportService = {
  /** POST /incident-reports — public, no auth (base URL already includes /api/v1) */
  submit: async (data: IncidentReportRequest): Promise<IncidentReportResponse> => {
    const payload: IncidentReportRequest = {
      severity: data.severity,
      incidentType: data.incidentType.trim(),
      ongoing: data.ongoing,
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      description: data.description.trim(),
      confirmed: true,
    };

    const organization = data.organization?.trim();
    if (organization) payload.organization = organization;

    const detectedAt = data.detectedAt?.trim();
    if (detectedAt) payload.detectedAt = detectedAt;

    const affectedSystems = data.affectedSystems?.trim();
    if (affectedSystems) payload.affectedSystems = affectedSystems;

    const response = await api.post<IncidentReportResponse>(
      "/incident-reports",
      payload,
    );
    return response.data;
  },
};
