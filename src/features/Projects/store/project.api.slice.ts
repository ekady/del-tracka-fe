import { convertParams } from '@/common/helper/convert';
import { apiSlice } from '@/common/store/api.slice';
import { LogsResponse } from '@/features/logs/store/logs.api.slice';
import { IApiResponse, IPaginationParams, IPaginationResponse, IStatusMessageResponse } from '@/common/types';
import {
  IProjectResponse,
  IProjectMember,
  IProjectRequest,
  ProjectSprintInfo,
  IProjectSprintIssue,
  IProjectSprintIssueDetail,
  SprintType,
  IProjectSettingRequest,
  IProjectMemberAddRequest,
  IProjectMemberUpdateRequest,
} from '../types';

type ProjectIds = Pick<ProjectSprintInfo, 'idProject' | 'idSprint'> & { idIssue?: string };

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
      updateProject: builder.mutation<IApiResponse<IProjectRequest>, IProjectSettingRequest<IProjectRequest>>({
        query: ({ id, body }) => ({
          url: `/projects/${id}`,
          method: 'put',
          body,
        }),
        invalidatesTags: ['Project', 'Projects'],
      }),
      deleteProject: builder.mutation<IApiResponse<IProjectRequest>, string>({
        query: (id) => ({
          url: `/projects/${id}`,
          method: 'delete',
        }),
        invalidatesTags: ['Projects'],
      }),
      getProjectActivities: builder.query<IApiResponse<LogsResponse[]>, string>({
        query: (id) => `/projects/${id}/activities`,
      }),

      // Project Member
      getProjectMembers: builder.query<IProjectMember[], string>({
        query: (id) => `/projects/${id}/member`,
        providesTags: ['Member'],
        transformResponse: (response: IApiResponse<IProjectMember[]>) => response.data,
      }),
      addMember: builder.mutation<
        IApiResponse<IStatusMessageResponse>,
        IProjectSettingRequest<IProjectMemberAddRequest>
      >({
        query: ({ id, body }) => ({
          url: `/projects/${id}/member`,
          method: 'post',
          body,
        }),
        invalidatesTags: ['Member'],
      }),
      updateRoleMember: builder.mutation<
        IApiResponse<IStatusMessageResponse>,
        IProjectSettingRequest<IProjectMemberUpdateRequest>
      >({
        query: ({ id, body }) => ({
          url: `/projects/${id}/member`,
          method: 'put',
          body,
        }),
        invalidatesTags: ['Member', 'Project', 'Projects'],
      }),
      removeMember: builder.mutation<
        IApiResponse<IStatusMessageResponse>,
        IProjectSettingRequest<Pick<IProjectMemberUpdateRequest, 'userId'>>
      >({
        query: ({ id, body }) => {
          return {
            url: `/projects/${id}/member`,
            method: 'delete',
            body,
          };
        },
        invalidatesTags: ['Member', 'Project', 'Projects'],
      }),
      leaveProject: builder.mutation<IApiResponse<IStatusMessageResponse>, IProjectSettingRequest<void>>({
        query: ({ id }) => {
          return {
            url: `/projects/${id}/leave`,
            method: 'put',
          };
        },
        invalidatesTags: ['Projects'],
      }),

      // Stages
      createNewSprint: builder.mutation<SprintType, IProjectSettingRequest<Pick<SprintType, 'newestSprint'>>>({
        query: ({ id, body }) => ({
          url: `/projects/${id}/stages`,
          method: 'post',
          body,
        }),
      }),
      getSprintInfo: builder.query<ProjectSprintInfo, ProjectIds>({
        query: ({ idProject, idSprint }) => `/projects/${idProject}/stages/${idSprint}`,
      }),
      getSprintIssues: builder.query<
        IPaginationResponse<IProjectSprintIssue>,
        IProjectSettingRequest<IPaginationParams, ProjectIds>
      >({
        query: ({ id, body }) => ({
          url: `/projects/${id.idProject}/stages/${id.idSprint}`,
          params: convertParams(body),
        }),
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

  useGetProjectMembersQuery,
  useAddMemberMutation,
  useUpdateRoleMemberMutation,
  useRemoveMemberMutation,
  useLeaveProjectMutation,

  useCreateNewSprintMutation,
  useGetSprintInfoQuery,
  useLazyGetSprintInfoQuery,
  useGetSprintIssuesQuery,
  useLazyGetSprintIssuesQuery,
} = projectApiSlice;
export const { resetApiState } = projectApiSlice.util;
