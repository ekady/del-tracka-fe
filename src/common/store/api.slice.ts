import { redirect } from 'next/navigation';

import { HYDRATE } from 'next-redux-wrapper';
import { signOut } from 'next-auth/react';

import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { Mutex } from 'async-mutex';

import { IApiResponse, IPermission, IPermissionResponse, IResponseError, IUserInfoResponse } from '@/common/types';
import { RedirectType } from 'next/dist/client/components/redirect';
import { MAPPING_MENU } from '../constants/menu';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
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
        const isUnauthorized = (result.error.data as IResponseError)?.errors?.[0]?.errorType === 'UNAUTHORIZED';

        if (isUnauthorized) {
          await signOut({ redirect: false });
          redirect('/auth/sign-in', RedirectType.replace);
        } else {
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
    if (action.type === HYDRATE) return action.payload[reducerPath];
  },
  tagTypes: ['Profile', 'Permission'],
  endpoints: (builder) => ({
    getProfile: builder.query<IApiResponse<IUserInfoResponse>, void>({
      query: () => '/profile',
      providesTags: ['Profile'],
    }),
    getPermission: builder.query<IPermission[], void>({
      query: () => '/permission',
      providesTags: ['Permission'],
      transformResponse: (response: IApiResponse<IPermissionResponse>) => {
        const modifiedResponse = { ...response.data };
        if (modifiedResponse.GUEST) delete modifiedResponse.GUEST;

        const keys = Object.keys(modifiedResponse);
        const values = Object.values(modifiedResponse);

        const result = keys.map((key, index) => ({
          roleName: key,
          permissions: Object.values(values[index]).map((permission) => ({
            ...permission,
            menu: MAPPING_MENU[permission.menu] ?? permission.menu,
          })),
        }));
        return result;
      },
    }),
  }),
});

export const { useGetProfileQuery, useGetPermissionQuery } = apiSlice;
export const { resetApiState } = apiSlice.util;
export const { getProfile } = apiSlice.endpoints;
