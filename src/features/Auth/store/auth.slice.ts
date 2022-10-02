import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Credential, StateStore } from '@/common/types';

type AuthState = {
  credential: Credential;
};

const name = 'auth';

// Initial State
const initialData: AuthState = {
  credential: {
    accessToken: null,
  },
};

const initialState: StateStore<AuthState> = {
  data: initialData,
  state: undefined,
};

// Register slice
const AuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCredential: (state: StateStore<AuthState>, action: PayloadAction<Credential>) => {
      state.data.credential = action.payload;
    },
    resetState: (state: StateStore<AuthState>) => {
      state.data = initialData;
    },
  },
});

// Actions
export const { resetState, setCredential } = AuthSlice.actions;

export default AuthSlice.reducer;
