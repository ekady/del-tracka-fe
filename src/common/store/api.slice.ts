import { HYDRATE } from 'next-redux-wrapper';

import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { Mutex } from 'async-mutex';

import { IApiResponse, IPermission, IPermissionResponse, IUserInfoResponse } from '@/common/types';
import { MAPPING_MENU } from '../constants/menu';

const baseQuery = fetchBaseQuery({
  baseUrl: typeof window !== 'undefined' ? '/api' : `${process.env.NEXT_PUBLIC_ROOT_URL}/api`,
  credentials: 'include',
  prepareHeaders: async (headers, { extra }) => {
    const extraThunk = extra as { cookies: { [key: string]: string } };
    if (extraThunk.cookies) {
      const cookie = Object.keys(extraThunk.cookies).map((key: string) => `${key}=${extraThunk.cookies[key]}`);
      headers.append('Cookie', cookie.join('; '));
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
        result = await baseQuery(args, api, extraOptions);
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
