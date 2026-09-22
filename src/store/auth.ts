import { create } from "zustand";
import type { UserProfile } from "@/services/profile";
import { profileService } from "@/services/profile";
import { getAccessToken } from "@/lib/accessToken";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  clearUser: () => void;
  checkAuth: () => Promise<boolean>;
  fetchUser: (opts?: { silent?: boolean }) => Promise<void>;
}

/**
 * Auth UI state lives in memory only (not persisted).
 * The JWT is stored separately in `accessToken` — also memory-only.
 * A full page refresh signs the user out by design.
 */
export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  clearUser: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  checkAuth: async () => {
    const token = getAccessToken();
    if (!token) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return false;
    }

    try {
      set({ isLoading: true });
      const user = await profileService.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
      return true;
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return false;
    }
  },

  fetchUser: async (opts) => {
    const token = getAccessToken();
    if (!token) {
      set({ user: null, isAuthenticated: false });
      return;
    }

    // Silent when we already have a user — avoids unmounting the dashboard
    const silent = opts?.silent ?? !!get().user;

    try {
      if (!silent) set({ isLoading: true });
      const user = await profileService.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
