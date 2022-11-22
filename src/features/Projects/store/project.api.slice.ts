import { apiSlice } from '@/common/store/api.slice';
import { ILogsResponse } from '@/features/logs/store/logs.api.slice';
import { IApiResponse, IStatusMessageResponse } from '@/common/types';
import { IProjectResponse, IProjectRequest, IProjectSettingRequest, IStatsResponse, ITasksCount } from '../interfaces';

export type ProjectIds = { idIssue?: string; idProject: string; idSprint: string };

export const projectApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Project', 'Projects', 'Sprint', 'Sprints', 'Member', 'ProjectActivities'] })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      // Projects
      getProjects: builder.query<IApiResponse<IProjectResponse[]>, void>({
        query: () => '/projects',
        providesTags: ['Projects'],
      }),
      createProject: builder.mutation<IApiResponse<IStatusMessageResponse>, IProjectRequest>({
        query: (body) => ({
          url: '/projects',
          method: 'post',
          body,
        }),
        invalidatesTags: ['Projects'],
      }),
      getProject: builder.query<IApiResponse<IProjectResponse>, string>({
        query: (id) => `/projects/${id}`,
        providesTags: ['Project'],
      }),
      updateProject: builder.mutation<IApiResponse<IStatusMessageResponse>, IProjectSettingRequest<IProjectRequest>>({
        query: ({ id, body }) => ({
          url: `/projects/${id}`,
          method: 'put',
          body,
        }),
        invalidatesTags: ['Project', 'Projects'],
      }),
      deleteProject: builder.mutation<IApiResponse<IStatusMessageResponse>, string>({
        query: (id) => ({
          url: `/projects/${id}`,
          method: 'delete',
        }),
        invalidatesTags: ['Projects'],
      }),
      getProjectActivities: builder.query<IApiResponse<ILogsResponse[]>, string>({
        query: (id) => `/projects/${id}/activities`,
        providesTags: ['ProjectActivities'],
      }),
      getProjectStats: builder.query<Record<keyof ITasksCount, number>, string>({
        query: (id) => `tasks-statistic/project/${id}`,
        transformResponse: (response) => {
          const res = response as IApiResponse<IStatsResponse[]>;
          return res.data?.reduce((acc, curr) => {
            acc[curr.name] = curr.count;
            return acc;
          }, {} as Record<string, number>);
        },
      }),
    }),
  });

export const {
  useGetProjectsQuery,
  useLazyGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectQuery,
  useLazyGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectActivitiesQuery,
  useLazyGetProjectActivitiesQuery,
  useGetProjectStatsQuery,
} = projectApiSlice;
export const { resetApiState, invalidateTags } = projectApiSlice.util;
