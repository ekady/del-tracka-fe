import { Credential, UserType } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export interface UserInfoResponse {
  credential: Credential;
  user: UserType;
}

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
  endpoints: (builder) => ({
    getUserInfo: builder.query<UserInfoResponse, void>({
      query: () => '/user-info',
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const { useGetUserInfoQuery } = apiSlice;
