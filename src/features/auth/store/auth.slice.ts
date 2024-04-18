import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICredential, IStateStore } from '@/common/types';

type TAuthState = {
  ICredential: ICredential;
};

const name = 'auth';

// Initial State
const initialData: TAuthState = {
  ICredential: {
    accessToken: null,
  },
};

const initialState: IStateStore<TAuthState> = {
  data: initialData,
  state: null,
};

// Register slice
const AuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCredential: (state: IStateStore<TAuthState>, action: PayloadAction<ICredential>) => {
      state.data.ICredential = action.payload;
    },
    resetState: (state: IStateStore<TAuthState>) => {
      state.data = initialData;
    },
  },
});

// Actions
export const { resetState, setCredential } = AuthSlice.actions;

export default AuthSlice.reducer;
