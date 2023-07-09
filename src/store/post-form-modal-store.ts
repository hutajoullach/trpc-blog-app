import { create } from "zustand";

interface PostFormModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePostFormModal = create<PostFormModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePostFormModal;
