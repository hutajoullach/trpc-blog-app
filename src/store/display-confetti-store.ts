import { create } from "zustand";

interface DisplayConfettiStore {
  isDisplayed: boolean;
  toggleShow: () => void;
  toggleHide: () => void;
}

const useDisplayConfetti = create<DisplayConfettiStore>((set) => ({
  isDisplayed: false,
  toggleShow: () => set({ isDisplayed: true }),
  toggleHide: () => set({ isDisplayed: false }),
}));

export default useDisplayConfetti;
