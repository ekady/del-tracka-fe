import { apiSlice } from '@/common/store/api.slice';
import { IApiResponse } from '@/common/types';
import { ITaskProjectResponse, ITaskStatusStatsResponse, IUserActivitiesStats } from '../interfaces';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTaskStatusAll: builder.query<IApiResponse<ITaskStatusStatsResponse>, void>({
      query: () => '/task-statistic/all',
      transformResponse: (response: IApiResponse<ITaskStatusStatsResponse>) => {
        Object.keys(response.data).forEach((key) => {
          response.data[key] = response.data[key] || 0.01;
        });
        return response;
      },
    }),
    getTaskStatusUser: builder.query<IApiResponse<ITaskStatusStatsResponse>, void>({
      query: () => '/task-statistic/user',
      transformResponse: (response: IApiResponse<ITaskStatusStatsResponse>) => {
        Object.keys(response.data).forEach((key) => {
          response.data[key] = response.data[key] || 0.01;
        });
        return response;
      },
    }),
    getTaskProjectTotal: builder.query<IApiResponse<ITaskProjectResponse>, void>({
      query: () => '/task-statistic/total',
    }),
    getUserActivities: builder.query<IApiResponse<IUserActivitiesStats[]>, void>({
      query: () => '/activity/stats',
    }),
  }),
});

export const {
  useGetTaskProjectTotalQuery,
  useLazyGetTaskStatusAllQuery,
  useLazyGetTaskStatusUserQuery,
  useGetTaskStatusAllQuery,
  useGetTaskStatusUserQuery,
  useGetUserActivitiesQuery,
} = dashboardApiSlice;
export const { resetApiState } = dashboardApiSlice.util;

export const { getTaskProjectTotal, getTaskStatusAll, getTaskStatusUser, getUserActivities } =
  dashboardApiSlice.endpoints;
