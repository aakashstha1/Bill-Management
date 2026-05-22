import { create } from "zustand";

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
};

type ConfirmState = {
  open: boolean;
  options: ConfirmOptions | null;

  show: (options: ConfirmOptions) => void;
  hide: () => void;
};

export const useConfirmModal = create<ConfirmState>((set) => ({
  open: false,
  options: null,

  show: (options) =>
    set({
      open: true,
      options,
    }),

  hide: () =>
    set({
      open: false,
      options: null,
    }),
}));
