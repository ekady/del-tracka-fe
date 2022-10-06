import { apiSlice } from '@/common/store/api.slice';
import { ApiResponse, StatusMessageResponse } from '@/common/types';
import { ForgotPasswordRequest, ResetPasswordRequest, SignUpRequest } from '../interfaces';

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation<ApiResponse<StatusMessageResponse>, SignUpRequest>({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'post',
        body,
      }),
    }),
    forgotPassword: builder.mutation<ApiResponse<StatusMessageResponse>, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'post',
        body,
      }),
    }),
    resetPassword: builder.mutation<ApiResponse<StatusMessageResponse>, ResetPasswordRequest>({
      query: ({ resetToken, ...passwords }) => ({
        url: `/auth/reset-password?reset-token=${resetToken}`,
        method: 'post',
        body: passwords,
      }),
    }),
    verifyResetToken: builder.mutation<ApiResponse<StatusMessageResponse>, Pick<ResetPasswordRequest, 'resetToken'>>({
      query: ({ resetToken }) => ({
        url: `/auth/verify-reset-token`,
        method: 'post',
        body: { token: resetToken },
      }),
    }),
    logout: builder.mutation<ApiResponse<StatusMessageResponse>, void>({
      query: () => ({
        url: '/auth/sign-out',
        method: 'post',
      }),
    }),
  }),
});

export const { useSignupMutation, useLogoutMutation, useForgotPasswordMutation, useResetPasswordMutation } =
  authApiSlice;
export const { forgotPassword, logout, resetPassword, signup, verifyResetToken } = authApiSlice.endpoints;

export const { getRunningOperationPromise, getRunningOperationPromises } = authApiSlice.util;
