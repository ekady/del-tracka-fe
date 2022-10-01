import { apiSlice } from '@/common/store/api.slice';
import { StatusMessageResponse } from '@/common/types';
import { AuthResponse, SignUpRequest } from '../interfaces';

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation<StatusMessageResponse, SignUpRequest>({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'post',
        body,
      }),
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
        url: '/auth/sign-out',
        method: 'post',
      }),
      invalidatesTags: ['Credential'],
    }),
  }),
});

export const { useSignupMutation, useLogoutMutation } = authApiSlice;
