import { apiSlice } from '@/common/store/api.slice';
import { LogsResponse } from '@/features/Logs/store/logs.api.slice';
import { ProjectMember, ProjectRequest, ProjectResponse } from '../types';

export type ProjectMemberRequest = Pick<ProjectMember, 'id' | 'role'>;

type ProjectSettingRequest<T> = {
  id: string;
  body: T;
};

export const projectApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectResponse[], void>({
      query: () => '/project',
    }),
    creataProject: builder.mutation<ProjectRequest, ProjectRequest>({
      query: (body) => ({
        url: '/project-new',
        method: 'post',
        body,
      }),
    }),
    getProject: builder.query<ProjectResponse, string>({
      query: (id) => `/project/${id}`,
    }),
    updateProject: builder.mutation<ProjectRequest, ProjectSettingRequest<ProjectRequest>>({
      query: ({ id, body }) => ({
        url: `/project/${id}`,
        method: 'put',
        body,
      }),
    }),
    deleteProject: builder.mutation<ProjectRequest, string>({
      query: (id) => ({
        url: `/project/${id}`,
        method: 'delete',
      }),
    }),
    getProjectActivities: builder.query<LogsResponse[], string>({
      query: (id) => `/project/${id}/activities`,
    }),
    getProjectMembers: builder.query<ProjectMember[], string>({
      query: (id) => `/project/${id}/members`,
    }),
    addMember: builder.mutation<ProjectMember, ProjectSettingRequest<ProjectMemberRequest>>({
      query: ({ id, body }) => ({
        url: `/project/${id}/members`,
        method: 'post',
        body,
      }),
    }),
    updateRoleMember: builder.mutation<ProjectMember, ProjectSettingRequest<ProjectMemberRequest>>({
      query: ({ id, body }) => ({
        url: `/project/${id}/members`,
        method: 'put',
        body,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useLazyGetProjectsQuery,
  useCreataProjectMutation,
  useGetProjectQuery,
  useLazyGetProjectQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectActivitiesQuery,
  useLazyGetProjectActivitiesQuery,
  useGetProjectMembersQuery,
  useAddMemberMutation,
  useUpdateRoleMemberMutation,
} = projectApiSlice;
export const { resetApiState } = projectApiSlice.util;
