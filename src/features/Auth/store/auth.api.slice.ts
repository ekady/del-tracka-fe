import { apiSlice } from '@/common/store/api.slice';
import { AuthResponse, LoginRequest, SignUpRequest } from '../interfaces';

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignUpRequest>({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'post',
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/sign-in',
        method: 'post',
        body,
      }),
      invalidatesTags: ['Credential'],
    }),
    refreshToken: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'post',
      }),
      invalidatesTags: ['Credential'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'post',
      }),
      invalidatesTags: ['Credential'],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
