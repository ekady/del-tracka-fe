import { IApiResponse, IStatusMessageResponse } from '@/common/types';
import { IProjectRequest, IProjectSettingRequest, ISprintResponse, ISprintsResponse } from '../interfaces';
import { projectApiSlice, ProjectIds } from './project.api.slice';

export const sprintApiSlice = projectApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createUpdateSprint: builder.mutation<IApiResponse<IStatusMessageResponse>, IProjectSettingRequest<IProjectRequest>>(
      {
        query: ({ id, body }) => {
          const stageId = body.id ?? '';
          return {
            url: `/project/${id}/stage/${stageId}`,
            method: stageId ? 'put' : 'post',
            body,
          };
        },
        invalidatesTags: ['Project', 'Projects', 'Sprints', 'ProjectActivities'],
      },
    ),
    getSprintInfo: builder.query<IApiResponse<ISprintsResponse[]>, ProjectIds>({
      query: ({ idProject }) => `task-statistic/project/${idProject}/stage`,
      providesTags: ['Sprints'],
    }),
    getSprint: builder.query<IApiResponse<ISprintResponse>, ProjectIds>({
      query: ({ idProject, idSprint }) => `/project/${idProject}/stage/${idSprint}`,
      providesTags: ['Sprint'],
    }),
    deleteSprint: builder.mutation<IApiResponse<IStatusMessageResponse>, ProjectIds>({
      query: ({ idProject, idSprint }) => ({
        url: `project/${idProject}/stage/${idSprint}`,
        method: 'delete',
      }),
      invalidatesTags: ['Projects', 'Project', 'Sprints', 'ProjectActivities'],
    }),
  }),
});

export const {
  useCreateUpdateSprintMutation,
  useGetSprintInfoQuery,
  useGetSprintQuery,
  useLazyGetSprintInfoQuery,
  useDeleteSprintMutation,
  useLazyGetSprintQuery,
} = sprintApiSlice;
export const { resetApiState } = sprintApiSlice.util;
