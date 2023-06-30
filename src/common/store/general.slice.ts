import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TGeneralState = {
  customBreadcrumb: { [x: string]: string };
  sidebarOpen: boolean;
  colorTheme: 'light' | 'dark';
};

const name = 'general';

// Initial State
const initialState: TGeneralState = {
  customBreadcrumb: {},
  sidebarOpen: true,
  colorTheme: 'light',
};

// Register slice
const generalSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCustomBreadcrumb: (state: TGeneralState, action: PayloadAction<TGeneralState['customBreadcrumb']>): void => {
      state.customBreadcrumb = action.payload;
    },
    resetState: (state: TGeneralState) => {
      state.customBreadcrumb = {};
    },
    setSideBarOpen: (state: TGeneralState, action: PayloadAction<TGeneralState['sidebarOpen']>) => {
      state.sidebarOpen = action.payload;
    },
    setColorTheme: (state: TGeneralState, action: PayloadAction<TGeneralState['colorTheme']>) => {
      state.colorTheme = action.payload;
    },
  },
});

// Actions
export const { resetState, setCustomBreadcrumb, setSideBarOpen, setColorTheme } = generalSlice.actions;

export default generalSlice.reducer;
