/**
 * In-memory access token only (VULN-03).
 * Never write JWTs to cookies, IndexedDB, localStorage, or sessionStorage.
 * A full page refresh clears the token by design.
 */
let accessToken: string | null = null;

export function getAccessToken(): string | null {
  return accessToken;
}

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function clearAccessToken(): void {
  accessToken = null;
}

export function authHeader(): Record<string, string> {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}
