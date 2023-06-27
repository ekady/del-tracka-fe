import { apiSlice } from '@/common/store/api.slice';
import { IApiResponse, IStatusMessageResponse } from '@/common/types';
import { ForgotPasswordRequest, ResetPasswordRequest, SignUpRequest } from '../interfaces';

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation<IApiResponse<IStatusMessageResponse>, SignUpRequest>({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'post',
        body,
      }),
    }),
    forgotPassword: builder.mutation<IApiResponse<IStatusMessageResponse>, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'post',
        body,
      }),
    }),
    resetPassword: builder.mutation<IApiResponse<IStatusMessageResponse>, ResetPasswordRequest>({
      query: ({ resetToken, ...passwords }) => ({
        url: `/auth/reset-password?reset-token=${resetToken}`,
        method: 'post',
        body: passwords,
      }),
    }),
    verifyResetToken: builder.query<IApiResponse<IStatusMessageResponse>, Pick<ResetPasswordRequest, 'resetToken'>>({
      query: ({ resetToken }) => ({
        url: `/auth/verify-reset-token`,
        params: { token: resetToken },
      }),
    }),
    logout: builder.mutation<IApiResponse<IStatusMessageResponse>, void>({
      query: () => ({
        url: '/auth/sign-out',
        method: 'post',
      }),
    }),
    registerDeviceId: builder.mutation<IApiResponse<IStatusMessageResponse>, { deviceId: string }>({
      query: ({ deviceId }) => ({
        url: '/user/device',
        method: 'post',
        body: { deviceId },
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRegisterDeviceIdMutation,
} = authApiSlice;

export const { forgotPassword, logout, resetPassword, signup, verifyResetToken, registerDeviceId } =
  authApiSlice.endpoints;
