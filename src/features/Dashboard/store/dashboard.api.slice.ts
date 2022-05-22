import { apiSlice } from '@/common/store/api.slice';

export interface DashboardResponse {
  totalProjects: number;
  totalIssues: number;
  allIssues: [number, number, number];
  allAssignTo: [number, number, number];
  activities: number[];
  activitiesLabel: string[];
}

export const dashboardApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDashboardDatas: builder.query<DashboardResponse, void>({
      query: () => '/information-chart',
    }),
  }),
});

export const { useGetDashboardDatasQuery } = dashboardApiSlice;
export const { resetApiState } = dashboardApiSlice.util;
