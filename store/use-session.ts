import { AuthUser } from "@/interfaces/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Session = {
  user: AuthUser;
  refreshToken: string;
};

interface AuthStore {
  session: Session | null;
  setSession: (session: Session) => void;
  resetSession: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      resetSession: () => set({ session: null }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        session: state.session,
      }),
    }
  )
);
