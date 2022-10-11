import nextRouter from 'next/router';
import { ApiResponse, Credential, ErrorDataResponse, ErrorResponse, UserInfo } from '@/common/types';
import { setCredential } from '@/features/auth/store/auth.slice';
import { BaseQueryFn, createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { getSession, signOut } from 'next-auth/react';
import { HYDRATE } from 'next-redux-wrapper';
import store, { RootState } from '.';

const getTokens = async (state: RootState): Promise<Credential | undefined> => {
  let accessToken = state.auth.data.credential.accessToken;

  if (!accessToken) {
    const session = await getSession();
    accessToken = session?.user.userToken.accessToken ?? null;
    store.dispatch(setCredential({ accessToken }));
  }

  if (!accessToken) return undefined;
  return { accessToken };
};

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '//api.local/',
  prepareHeaders: async (headers, { getState, endpoint }) => {
    if (!['signup', 'forgotPassword', 'resetPassword', 'verifyResetToken'].includes(endpoint)) {
      const credential = await getTokens(getState() as RootState);
      if (!credential) {
        await signOut({ redirect: false });
        nextRouter.replace('/auth/sign-in');
      } else if (credential?.accessToken) headers.set('Authorization', `Bearer ${credential.accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithRefresh: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  let fetchError: FetchBaseQueryError, errorResponse: ErrorResponse, hasAccessTokenError: ErrorDataResponse | undefined;
  if (result.error) {
    fetchError = result.error as FetchBaseQueryError;
    errorResponse = fetchError.data as ErrorResponse;
    hasAccessTokenError = errorResponse?.errors.find((err) => err.errorType === 'ACCESS_TOKEN_EXPIRED');
  }

  if (hasAccessTokenError) {
    const session = await getSession();
    const accessToken = session?.user.userToken.accessToken ?? null;

    if (!accessToken || session?.error === 'RefreshAccessTokenError') {
      await signOut({ redirect: false });
      nextRouter.replace('/auth/sign-in');
    } else {
      api.dispatch(setCredential({ accessToken }));
      await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRefresh,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<ApiResponse<UserInfo>, void>({
      query: () => '/profile',
      providesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery } = apiSlice;
export const { resetApiState, getRunningOperationPromises } = apiSlice.util;
export const { getProfile } = apiSlice.endpoints;
