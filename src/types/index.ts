export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "admin" | "manager" | "responder" | "viewer";

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  type: IncidentType;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  assignedTo?: string;
  reportedBy: string;
  createdAt: string;
  updatedAt: string;
}

export type IncidentStatus = "reported" | "in_progress" | "resolved" | "closed";
export type IncidentSeverity = "low" | "medium" | "high" | "critical";
export type IncidentType =
  | "fire"
  | "medical"
  | "security"
  | "natural_disaster"
  | "other";

export interface Responder {
  id: string;
  userId: string;
  status: ResponderStatus;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  skills: string[];
  availability: boolean;
  lastActive: string;
}

export type ResponderStatus = "available" | "busy" | "offline";

export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
