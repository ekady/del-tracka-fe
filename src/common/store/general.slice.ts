import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TGeneralState = {
  customBreadcrumb: { [x: string]: string };
};

const name = 'general';

// Initial State
const initialState: TGeneralState = {
  customBreadcrumb: {},
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
  },
});

// Actions
export const { resetState, setCustomBreadcrumb } = generalSlice.actions;

export default generalSlice.reducer;
