import { convertParams } from '@/common/helper/convert';
import { apiSlice } from '@/common/store/api.slice';
import { IPaginationParams, IPaginationResponse } from '@/common/types';

export interface MyTasksDataResponse {
  id: string;
  mainProblem: string;
  projectName: string;
  dateUpdated: string;
  reporter: string;
  level: string;
  status: string;
}

export const myTasksApiSLice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyTasks: builder.query<IPaginationResponse<MyTasksDataResponse>, IPaginationParams>({
      query: (arg) => {
        return { url: '/issues', params: convertParams(arg) };
      },
    }),
  }),
});

export const { useGetMyTasksQuery, useLazyGetMyTasksQuery } = myTasksApiSLice;
export const { resetApiState } = myTasksApiSLice.util;
