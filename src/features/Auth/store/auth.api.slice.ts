import { apiSlice } from '@/common/store/api.slice';
import { UserType } from '@/types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest extends LoginRequest {
  confirmPassword: string;
}

export interface AuthResponse {
  user: UserType;
}

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'post',
        body,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignUpRequest>({
      query: (body) => ({
        url: '/sign-up',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
