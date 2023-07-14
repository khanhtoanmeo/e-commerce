import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set(() => (user ? { user: { ...user } } : null)),
}));

export default useUserStore;
