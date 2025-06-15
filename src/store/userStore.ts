import { create } from 'zustand'
import { mockGetUserInfo, User } from '@services/user-services'

interface UserStore {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User) => void
  fetchUser: () => Promise<void>
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user: User) => set({ user }),

  fetchUser: async () => {
    try {
      set({ isLoading: true, error: null });
      const userData = await mockGetUserInfo();
      set({ user: userData, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch user",
        isLoading: false,
      });
    }
  },

  clearUser: () => {
    set({ user: null, error: null });
  },
}));
