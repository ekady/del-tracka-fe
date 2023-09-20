import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICredential, IStateStore } from '@/common/types';

type AuthState = {
  ICredential: ICredential;
};

const name = 'auth';

// Initial State
const initialData: AuthState = {
  ICredential: {
    accessToken: null,
  },
};

const initialState: IStateStore<AuthState> = {
  data: initialData,
  state: null,
};

// Register slice
const AuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCredential: (state: IStateStore<AuthState>, action: PayloadAction<ICredential>) => {
      state.data.ICredential = action.payload;
    },
    resetState: (state: IStateStore<AuthState>) => {
      state.data = initialData;
    },
  },
});

// Actions
export const { resetState, setCredential } = AuthSlice.actions;

export default AuthSlice.reducer;
