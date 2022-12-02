import { IApiResponse, IStatusMessageResponse } from '@/common/types';
import {
  IProjectMember,
  IProjectMemberAddRequest,
  IProjectMemberUpdateRequest,
  IProjectSettingRequest,
} from '../interfaces';
import { projectApiSlice } from './project.api.slice';

export const memberApiSlice = projectApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProjectMembers: builder.query<IProjectMember[], string>({
      query: (id) => `/projects/${id}/member`,
      providesTags: ['Member'],
      transformResponse: (response: IApiResponse<IProjectMember[]>) => response.data,
    }),
    addMember: builder.mutation<IApiResponse<IStatusMessageResponse>, IProjectSettingRequest<IProjectMemberAddRequest>>(
      {
        query: ({ id, body }) => ({
          url: `/projects/${id}/member`,
          method: 'post',
          body,
        }),
        invalidatesTags: ['Member'],
      },
    ),
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
  }),
});

export const {
  useGetProjectMembersQuery,
  useAddMemberMutation,
  useUpdateRoleMemberMutation,
  useRemoveMemberMutation,
  useLeaveProjectMutation,
} = memberApiSlice;

export const { resetApiState } = memberApiSlice.util;
