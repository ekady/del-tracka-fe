import { redirect } from 'next/navigation';

import { HYDRATE } from 'next-redux-wrapper';
import { getSession, signOut } from 'next-auth/react';

import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { Mutex } from 'async-mutex';

import { IApiResponse, ICredential, IResponseError, IUserInfoResponse } from '@/common/types';
import { setCredential } from '@/features/auth/store/auth.slice';
import store, { RootState } from '.';
import { RedirectType } from 'next/dist/client/components/redirect';

const getTokens = async (state: RootState): Promise<ICredential | undefined> => {
  let accessToken = state.auth.data.ICredential.accessToken;

  if (!accessToken) {
    const session = await getSession();
    accessToken = session?.user.userToken.accessToken ?? null;
    store.dispatch(setCredential({ accessToken }));
  }

  if (!accessToken) return undefined;
  return { accessToken };
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? '//api.local/',
  prepareHeaders: async (headers, { getState, endpoint }) => {
    if (!['signup', 'forgotPassword', 'resetPassword', 'verifyResetToken'].includes(endpoint)) {
      const ICredential = await getTokens(getState() as RootState);
      if (!ICredential) {
        await signOut({ redirect: false });
        redirect('/auth/sign-in', RedirectType.replace);
      } else if (ICredential?.accessToken) headers.set('Authorization', `Bearer ${ICredential.accessToken}`);
    }
    return headers;
  },
});

const mutex = new Mutex();
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const isAuthApi = ['signup', 'forgotPassword', 'resetPassword', 'verifyResetToken'].includes(api.endpoint);
  if (result.error && result.error.status === 401 && !isAuthApi) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const session = await getSession();
        const accessToken = session?.user.userToken.accessToken ?? null;
        const isUnauthorized = (result.error.data as IResponseError)?.errors?.[0]?.errorType === 'UNAUTHORIZED';

        if (!accessToken || session?.error === 'RefreshAccessTokenError' || isUnauthorized) {
          await signOut({ redirect: false });
          redirect('/auth/sign-in', RedirectType.replace);
        } else {
          api.dispatch(setCredential({ accessToken }));
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<IApiResponse<IUserInfoResponse>, void>({
      query: () => '/profile',
      providesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery } = apiSlice;
export const { resetApiState } = apiSlice.util;
export const { getProfile } = apiSlice.endpoints;
