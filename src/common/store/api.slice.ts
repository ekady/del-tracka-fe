import { Credential, UserType } from '@/common/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '.';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '//api.local/',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.data.credential.accessToken;
      const refreshToken = (getState() as RootState).auth.data.credential.refreshToken;
      if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
      if (refreshToken) headers.set('Refresh-Token', refreshToken);
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
