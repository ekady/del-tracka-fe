import { apiSlice } from '@/common/store/api.slice';
import { PaginationParams, PaginationResponse } from '@/common/types';

export interface LogsResponse {
  id: string;
  date: string;
  projectName: string;
  cardNumber: string;
  feature: string;
  activity: string;
}

export const logsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogActivities: builder.query<PaginationResponse<LogsResponse>, PaginationParams>({
      query: (arg) => {
        return { url: '/log-activities', params: arg };
      },
    }),
  }),
});

export const { useGetLogActivitiesQuery } = logsApiSlice;
export const { resetApiState } = logsApiSlice.util;
