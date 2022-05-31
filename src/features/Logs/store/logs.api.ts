import { apiSlice } from '@/common/store/api.slice';

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
    getLogActivities: builder.query<LogsResponse[], void>({
      query: () => '/log-activities',
    }),
  }),
});

export const { useGetLogActivitiesQuery } = logsApiSlice;
export const { resetApiState } = logsApiSlice.util;
