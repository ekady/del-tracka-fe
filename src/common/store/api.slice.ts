import { Credential, UserType } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '//api.local/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.data.credential.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
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
