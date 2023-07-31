import { apiSlice } from '@/common/store/api.slice';
import { ILogsResponse } from '@/features/logs/interfaces';
import { IApiResponse, IPaginationParams, IPaginationResponse, IStatusMessageResponse } from '@/common/types';
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

const projectTags = [
  'Project',
  'Projects',
  'ProjectStats',
  'Sprint',
  'Sprints',
  'Member',
  'ProjectActivities',
  'Tasks',
  'Task',
  'TaskActivities',
  'Comments',
] as const;

export type ProjectTags = (typeof projectTags)[number];

export const projectApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: projectTags,
  })
  .injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      // Projects
      getProjects: builder.query<IApiResponse<IProjectWithPermissions[]>, void>({
        query: () => '/project',
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
          url: '/project',
          method: 'post',
          body,
        }),
        invalidatesTags: ['Projects'],
      }),
      getProject: builder.query<IApiResponse<IProjectWithPermissions>, string>({
        query: (id) => `/project/${id}`,
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
          url: `/project/${id}`,
          method: 'put',
          body,
        }),
        invalidatesTags: ['Project', 'Projects'],
      }),
      deleteProject: builder.mutation<IApiResponse<IStatusMessageResponse>, string>({
        query: (id) => ({
          url: `/project/${id}`,
          method: 'delete',
        }),
        invalidatesTags: ['Projects'],
      }),
      getProjectActivities: builder.query<
        IApiResponse<IPaginationResponse<ILogsResponse[]>>,
        { id: string; params: IPaginationParams }
      >({
        query: ({ id, params }) => ({
          url: `/project/${id}/activity`,
          params,
        }),
        providesTags: ['ProjectActivities'],
      }),
      getProjectStats: builder.query<Record<keyof ITasksCount, number>, string>({
        query: (id) => `task-statistic/project/${id}`,
        transformResponse: (response) => {
          const res = response as IApiResponse<IStatsResponse[]>;
          return res.data?.reduce((acc, curr) => {
            acc[curr.name] = curr.count;
            return acc;
          }, {} as Record<string, number>);
        },
        providesTags: ['ProjectStats'],
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
