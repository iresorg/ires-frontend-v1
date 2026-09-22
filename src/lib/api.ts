import axios, { type InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@/lib/accessToken";
import { clearClientSession } from "@/lib/session";

const PUBLIC_AUTH_PATHS = [
  "/accounts/auth/login",
  "/accounts/auth/register",
  "/accounts/auth/forgot-password",
  "/accounts/auth/reset-password",
  "/accounts/auth/verify-email",
  "/accounts/auth/resend-otp",
  "/contact",
  "/newsletter/subscribe",
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

function isPublicAuthRequest(config: InternalAxiosRequestConfig): boolean {
  const url = config.url || "";
  return PUBLIC_AUTH_PATHS.some((path) => url.includes(path));
}

function redirectToLogin(): void {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  if (path.startsWith("/login")) return;
  window.location.href = "/login";
}

async function handleUnauthorizedSession(): Promise<void> {
  clearClientSession();
  try {
    const { useAuthStore } = await import("@/store/auth");
    useAuthStore.getState().clearUser();
  } catch {
    // Store may be unavailable during early bootstrap
  }
  redirectToLogin();
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Never run session-ended redirect on public auth routes
    if (isPublicAuthRequest(originalRequest)) {
      return Promise.reject(error);
    }

    // Server invalidates JWTs on logout / password change / reset.
    // Do not retry with the same token.
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Wrong current password returns 401 — leave that to the settings UI
      const url = originalRequest.url || "";
      if (url.includes("/accounts/auth/change-password")) {
        return Promise.reject(error);
      }

      await handleUnauthorizedSession();
    }

    return Promise.reject(error);
  },
);

export default api;
export { API_BASE_URL };
