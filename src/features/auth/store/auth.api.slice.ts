import { apiSlice } from '@/common/store/api.slice';
import { IApiResponse, IStatusMessageResponse } from '@/common/types';
import { IForgotPasswordRequest, IResetPasswordRequest, ISignUpRequest } from '../interfaces';

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation<IApiResponse<IStatusMessageResponse>, ISignUpRequest>({
      query: (body) => ({
        url: '/authentication/sign-up',
        method: 'post',
        body,
      }),
    }),
    forgotPassword: builder.mutation<IApiResponse<IStatusMessageResponse>, IForgotPasswordRequest>({
      query: (body) => ({
        url: '/authentication/forgot-password',
        method: 'post',
        body,
      }),
    }),
    resetPassword: builder.mutation<IApiResponse<IStatusMessageResponse>, IResetPasswordRequest>({
      query: ({ resetToken, ...passwords }) => ({
        url: '/authentication/reset-password',
        params: { 'reset-token': resetToken },
        method: 'post',
        body: passwords,
      }),
    }),
    verifyResetToken: builder.query<IApiResponse<IStatusMessageResponse>, Pick<IResetPasswordRequest, 'resetToken'>>({
      query: ({ resetToken }) => ({
        url: '/authentication/verify-reset-token',
        params: { token: resetToken },
      }),
    }),
    logout: builder.mutation<IApiResponse<IStatusMessageResponse>, void>({
      query: () => ({
        url: '/authentication/sign-out',
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
