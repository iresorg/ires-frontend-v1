import { clearAccessToken } from "@/lib/accessToken";

const LEGACY_AUTH_COOKIE_NAMES = ["auth_token", "refresh_token", "token"] as const;

/** Delete leftover JS-readable auth cookies from the old storage model. */
export function clearLegacyAuthCookies(): void {
  if (typeof document === "undefined") return;

  for (const name of LEGACY_AUTH_COOKIE_NAMES) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }
}

/** Drop in-memory JWT and any leftover cookie copies. Does not touch React state. */
export function clearClientSession(): void {
  clearAccessToken();
  clearLegacyAuthCookies();
}
