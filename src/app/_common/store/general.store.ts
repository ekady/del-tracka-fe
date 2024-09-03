import { create } from 'zustand';

export interface IGeneralState {
  isSidebarOpen: boolean;
  setSidebar: (isOpen: boolean) => void;
}

export const useGeneralStore = create<IGeneralState>((set) => ({
  isSidebarOpen: true,
  setSidebar: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
