import { convertParams } from '@/common/helper/convert';
import { apiSlice } from '@/common/store/api.slice';
import { LogsResponse } from '@/features/logs/store/logs.api.slice';
import { PaginationParams, PaginationResponse } from '@/common/types';
import {
  ProjectMember,
  ProjectRequest,
  ProjectResponse,
  ProjectSprintInfo,
  ProjectSprintIssue,
  ProjectSprintIssueDetail,
  SprintType,
} from '../types';

export type ProjectMemberRequest = Pick<ProjectMember, 'id' | 'role'>;

type ProjectSettingRequest<BodyType, IdType = string> = {
  id: IdType;
  body: BodyType;
};

type ProjectIds = Pick<ProjectSprintInfo, 'idProject' | 'idSprint'> & { idIssue?: string };

export const projectApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectResponse[], void>({
      query: () => '/projects',
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
    createNewSprint: builder.mutation<SprintType, ProjectSettingRequest<Pick<SprintType, 'newestSprint'>>>({
      query: ({ id, body }) => ({
        url: `/project/${id}/sprint-new`,
        method: 'post',
        body,
      }),
    }),
    getSprintInfo: builder.query<ProjectSprintInfo, ProjectIds>({
      query: ({ idProject, idSprint }) => `/project/${idProject}/info/${idSprint}`,
    }),
    getSprintIssues: builder.query<
      PaginationResponse<ProjectSprintIssue>,
      ProjectSettingRequest<PaginationParams, ProjectIds>
    >({
      query: ({ id, body }) => ({ url: `/project/${id.idProject}/${id.idSprint}`, params: convertParams(body) }),
    }),
    getIssue: builder.query<ProjectSprintIssueDetail, ProjectIds>({
      query: ({ idProject, idSprint, idIssue }) => `/project/${idProject}/${idSprint}/${idIssue}`,
      transformResponse: (response) => {
        const res = response as ProjectSprintIssueDetail;
        res.images = res.imageUrls;
        return res;
      },
    }),
    createUpdateIssue: builder.mutation<
      ProjectSprintIssueDetail,
      ProjectSettingRequest<ProjectSprintIssueDetail, ProjectIds>
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
          url: `/project/${id.idProject}/${id.idSprint}/${id.idIssue ? id.idIssue : ''}`,
          method: id.idIssue ? 'put' : 'post',
          body: formData,
        };
      },
    }),
    deleteIssue: builder.mutation<ProjectSprintIssueDetail, ProjectIds>({
      query: ({ idProject, idSprint, idIssue }) => ({
        url: `/project/${idProject}/${idSprint}/${idIssue}`,
        method: 'delete',
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
  useCreateNewSprintMutation,
  useGetSprintInfoQuery,
  useLazyGetSprintInfoQuery,
  useGetSprintIssuesQuery,
  useLazyGetSprintIssuesQuery,
} = projectApiSlice;
export const { resetApiState } = projectApiSlice.util;
