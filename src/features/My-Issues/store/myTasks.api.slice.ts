import { IApiResponse, IPaginationParams, IPaginationResponse } from '@/common/types';
import { ITaskResponse } from '@/features/projects/interfaces';
import { projectApiSlice } from '@/features/projects/store/project.api.slice';

export const myTasksApiSLice = projectApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getMyTasks: builder.query<IApiResponse<IPaginationResponse<ITaskResponse>>, IPaginationParams>({
      query: (params) => ({ url: '/my-tasks', params }),
      providesTags: ['Tasks'],
    }),
  }),
});

export const { useGetMyTasksQuery, useLazyGetMyTasksQuery } = myTasksApiSLice;
export const { resetApiState } = myTasksApiSLice.util;
