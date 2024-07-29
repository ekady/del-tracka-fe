import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IThemeState {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
}

export const useThemeStore = create<IThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      setMode: (mode) => set(() => ({ mode })),
    }),
    { name: 'theme' },
  ),
);
