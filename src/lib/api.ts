import axios, { type InternalAxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types";

const PUBLIC_AUTH_PATHS = [
  "/accounts/auth/login",
  "/accounts/auth/register",
  "/accounts/auth/forgot-password",
  "/accounts/auth/reset-password",
  "/accounts/auth/verify-email",
  "/accounts/auth/resend-otp",
];

function resolveApiBaseUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_API_URL || "").trim().replace(/\/$/, "");
  if (!raw) {
    console.error(
      "NEXT_PUBLIC_API_URL is not set. Auth API calls will fail — set it to your backend, e.g. https://api.example.com/api/v1",
    );
    return "";
  }
  return raw;
}

const API_BASE_URL = resolveApiBaseUrl();

// Simple cookie helpers
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days = 7): void => {
  if (typeof document === "undefined") return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const removeCookie = (name: string): void => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

function isPublicAuthRequest(config: InternalAxiosRequestConfig): boolean {
  const url = config.url || "";
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path));
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (!API_BASE_URL) {
      return Promise.reject(
        new Error(
          "API base URL is not configured (NEXT_PUBLIC_API_URL). Requests must go to the backend, not the Netlify site.",
        ),
      );
    }

    // Public auth endpoints must not send a stale portal JWT
    if (!isPublicAuthRequest(config)) {
      const token = getCookie("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Never run refresh/redirect logic on public auth routes
    if (isPublicAuthRequest(originalRequest)) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getCookie("refresh_token");
        if (refreshToken) {
          const response = await api.post<ApiResponse<{ token: string }>>(
            "/auth/refresh",
            { refreshToken },
          );

          const { token } = response.data.data;
          setCookie("auth_token", token);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }
      } catch {
        removeCookie("auth_token");
        removeCookie("refresh_token");
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
export { getCookie, setCookie, removeCookie, API_BASE_URL };
