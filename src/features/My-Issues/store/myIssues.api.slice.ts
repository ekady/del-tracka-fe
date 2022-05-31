import { convertParams } from '@/common/helper/convert';
import { apiSlice } from '@/common/store/api.slice';
import { PaginationParams, PaginationResponse } from '@/types';

export interface MyIssuesDataResponse {
  id: string;
  mainProblem: string;
  projectName: string;
  dateUpdated: string;
  reporter: string;
  level: string;
  status: string;
}

export const myIssuesApiSLice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyIssues: builder.query<PaginationResponse<MyIssuesDataResponse>, PaginationParams>({
      query: (arg) => {
        return { url: '/issues', params: convertParams(arg) };
      },
    }),
  }),
});

export const { useGetMyIssuesQuery, useLazyGetMyIssuesQuery } = myIssuesApiSLice;
export const { resetApiState } = myIssuesApiSLice.util;
