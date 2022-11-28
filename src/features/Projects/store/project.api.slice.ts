import { apiSlice } from '@/common/store/api.slice';
import { ILogsResponse } from '@/features/logs/store/logs.api.slice';
import { IApiResponse, IStatusMessageResponse } from '@/common/types';
import {
  IProjectResponse,
  IProjectRequest,
  IProjectSettingRequest,
  IStatsResponse,
  ITasksCount,
  IProjectWithPermissions,
  IProjectPermission,
} from '../interfaces';
import { ProjectMenu } from '../constant/projectMenu';

export type ProjectIds = { idTask?: string; idProject: string; idSprint: string };

export const projectApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ['Project', 'Projects', 'Sprint', 'Sprints', 'Member', 'ProjectActivities', 'Tasks'],
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      // Projects
      getProjects: builder.query<IApiResponse<IProjectWithPermissions[]>, void>({
        query: () => '/projects',
        transformResponse: (response: IApiResponse<IProjectResponse[]>) => {
          return {
            data: response.data.map((data) => ({
              id: data._id,
              name: data.name,
              description: data.description,
              shortId: data.shortId,
              role: data.role,
              stages: data.stages,
              rolePermissions: data.rolePermissions.reduce(
                (acc, role) => ({
                  ...acc,
                  [role.menu]: { create: role.create, read: role.read, update: role.update, delete: role.delete },
                }),
                {} as Record<ProjectMenu, Omit<IProjectPermission, 'menu'>>,
              ),
            })),
            errors: response.errors,
            statusCode: response.statusCode,
          };
        },
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
      getProject: builder.query<IApiResponse<IProjectWithPermissions>, string>({
        query: (id) => `/projects/${id}`,
        providesTags: ['Project'],
        transformResponse: (response: IApiResponse<IProjectResponse>) => {
          return {
            data: {
              id: response.data._id,
              name: response.data.name,
              description: response.data.description,
              shortId: response.data.shortId,
              role: response.data.role,
              stages: response.data.stages,
              rolePermissions: response.data.rolePermissions.reduce(
                (acc, role) => ({
                  ...acc,
                  [role.menu]: { create: role.create, read: role.read, update: role.update, delete: role.delete },
                }),
                {} as Record<ProjectMenu, Omit<IProjectPermission, 'menu'>>,
              ),
            },
            errors: response.errors,
            statusCode: response.statusCode,
          };
        },
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
