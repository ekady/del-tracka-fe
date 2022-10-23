import { apiSlice } from '@/common/store/api.slice';
import { LogsResponse } from '@/features/logs/store/logs.api.slice';
import { IApiResponse, IStatusMessageResponse } from '@/common/types';
import {
  IProjectResponse,
  IProjectRequest,
  IProjectSprintIssueDetail,
  IProjectSettingRequest,
  IStatsResponse,
  ITasksCount,
} from '../types';

export type ProjectIds = { idIssue?: string; idProject: string; idSprint: string };

export const projectApiSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ['Project', 'Projects', 'Sprint', 'Sprints', 'Member'] })
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
      getProjectActivities: builder.query<IApiResponse<LogsResponse[]>, string>({
        query: (id) => `/projects/${id}/activities`,
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

      // Tasks
      getIssue: builder.query<IProjectSprintIssueDetail, ProjectIds>({
        query: ({ idProject, idSprint, idIssue }) => `/projects/${idProject}/stages/${idSprint}/tasks/${idIssue}`,
        transformResponse: (response) => {
          const res = response as IProjectSprintIssueDetail;
          res.images = res.imageUrls;
          return res;
        },
      }),
      createUpdateIssue: builder.mutation<
        IProjectSprintIssueDetail,
        IProjectSettingRequest<IProjectSprintIssueDetail, ProjectIds>
      >({
        query: ({ id, body }) => {
          const formData = new FormData();
          const { feature, level, mainProblem, reporter, assignee, detail, images } = body;

          formData.append('feature', feature);
          formData.append('mainProblem', mainProblem);
          formData.append('level', level?.value ?? '');
          formData.append('reporter', reporter?.value ?? '');
          formData.append('assignee', assignee?.value ?? '');
          formData.append('detail', detail ?? '');
          if (images && images.length > 0) {
            images.forEach((image) => {
              if (image instanceof File) formData.append('image', image);
              else formData.append('imageOld', image.name);
            });
          }

          return {
            url: `/projects/${id.idProject}/stages/${id.idSprint}/tasks/${id.idIssue ? id.idIssue : ''}`,
            method: id.idIssue ? 'put' : 'post',
            body: formData,
          };
        },
      }),
      deleteIssue: builder.mutation<IProjectSprintIssueDetail, ProjectIds>({
        query: ({ idProject, idSprint, idIssue }) => ({
          url: `/projects/${idProject}/stages/${idSprint}/tasks/${idIssue}`,
          method: 'delete',
        }),
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
export const { resetApiState } = projectApiSlice.util;
