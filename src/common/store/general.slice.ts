import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TGeneralState = {
  customBreadcrumb: { [x: string]: string };
  sidebarOpen: boolean;
};

const name = 'general';

// Initial State
const initialState: TGeneralState = {
  customBreadcrumb: {},
  sidebarOpen: true,
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
  },
});

// Actions
export const { resetState, setCustomBreadcrumb, setSideBarOpen } = generalSlice.actions;

export default generalSlice.reducer;
