import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/services/profile";
import { profileService } from "@/services/profile";
import { getCookie } from "@/lib/api";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  clearUser: () => void;
  checkAuth: () => Promise<boolean>;
  fetchUser: (opts?: { silent?: boolean }) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearUser: () => {
        set({ user: null, isAuthenticated: false, isLoading: false });
      },

      checkAuth: async () => {
        const token = getCookie("auth_token");
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
        const token = getCookie("auth_token");
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
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
