import { create } from "zustand";
import { UserData } from "./types";

export type AuthStore = {
  currentUser: UserData | null;
  setCurrentUser: (currentUser: UserData | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser: currentUser }),
}));
