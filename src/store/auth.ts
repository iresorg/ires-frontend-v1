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
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearUser: () => {
        set({ user: null, isAuthenticated: false });
      },

      // Check authentication by fetching user profile
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
        } catch  {
          set({ user: null, isAuthenticated: false, isLoading: false });
          return false;
        }
      },

      // Fetch and update user profile
      fetchUser: async () => {
        const token = getCookie("auth_token");
        if (!token) {
          set({ user: null, isAuthenticated: false });
          return;
        }

        try {
          set({ isLoading: true });
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
    }
  )
);
