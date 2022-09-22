import { Credential, UserType } from '@/common/types';
import { setCredential } from '@/features/Auth/store/auth.slice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession, signOut } from 'next-auth/react';
import { HYDRATE } from 'next-redux-wrapper';
import store, { RootState } from '.';

const getTokens = async (state: RootState): Promise<Credential | undefined> => {
  let accessToken = state.auth.data.credential.accessToken;
  let refreshToken = state.auth.data.credential.refreshToken;

  if (!accessToken || !refreshToken) {
    const session = await getSession();
    accessToken = session?.user.userToken.accessToken ?? null;
    refreshToken = session?.user.userToken.refreshToken ?? null;
    store.dispatch(setCredential({ accessToken, refreshToken }));
  }

  if (!accessToken || !refreshToken) return undefined;
  return { accessToken, refreshToken };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '//api.local/',
    prepareHeaders: async (headers, { getState }) => {
      const credential = await getTokens(getState() as RootState);
      if (!credential) signOut();
      if (credential?.accessToken) headers.set('Authorization', `Bearer ${credential.accessToken}`);
      if (credential?.refreshToken) headers.set('Refresh-Token', credential?.refreshToken);
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Profile', 'Credential'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserType, void>({
      query: () => '/user-info',
      providesTags: ['Profile'],
    }),
    getCredential: builder.query<Credential, void>({
      query: () => '/token',
      providesTags: ['Credential'],
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useGetUserInfoQuery, useGetCredentialQuery } = apiSlice;
export const { resetApiState } = apiSlice.util;
