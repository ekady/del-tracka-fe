import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Credential, StateStore, UserType } from '@/common/types';

type UserInfoResponse = {
  credential: Credential;
  user: UserType;
};

const name = 'auth';

// Initial State
const initialData: UserInfoResponse = {
  credential: {
    refreshToken: null,
    token: null,
  },
  user: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    imageURL: null,
    isFirstLogin: false,
  },
};

const initialState: StateStore<UserInfoResponse> = {
  data: initialData,
  state: undefined,
};

// Register slice
const AuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCredential: (state: StateStore<UserInfoResponse>, action: PayloadAction<UserInfoResponse>) => {
      state.data = action.payload;
    },
    resetState: (state: StateStore<UserInfoResponse>) => {
      state.data = initialData;
    },
  },
});

// Actions
export const { resetState, setCredential } = AuthSlice.actions;

export default AuthSlice.reducer;
