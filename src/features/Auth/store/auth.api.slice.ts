import { apiSlice } from '@/common/store/api.slice';
import { StatusMessageResponse } from '@/common/types';
import { SignUpRequest } from '../interfaces';

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
    logout: builder.mutation<StatusMessageResponse, void>({
      query: () => ({
        url: '/auth/sign-out',
        method: 'post',
      }),
    }),
  }),
});

export const { useSignupMutation, useLogoutMutation } = authApiSlice;
