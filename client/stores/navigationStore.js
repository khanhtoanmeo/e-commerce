import { create } from "zustand";

const useNavigationStore = create((set) => ({
  navigation: null,
  setNavigation: (navigation) =>
    set(() => ({
      navigation,
    })),
}));

export default useNavigationStore;
