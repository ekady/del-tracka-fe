import { IApiResponse, IStatusMessageResponse } from '@/common/types';
import { IProjectRequest, IProjectSettingRequest, ISprintResponse, ISprintsResponse } from '../types';
import { projectApiSlice, ProjectIds } from './project.api.slice';

export const sprintApiSlice = projectApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUpdateSprint: builder.mutation<IApiResponse<IStatusMessageResponse>, IProjectSettingRequest<IProjectRequest>>(
      {
        query: ({ id, body }) => {
          const stageId = body.id || '';
          return {
            url: `/projects/${id}/stages/${stageId}`,
            method: stageId ? 'put' : 'post',
            body,
          };
        },
        invalidatesTags: ['Project', 'Projects', 'Sprints'],
      },
    ),
    getSprintInfo: builder.query<IApiResponse<ISprintsResponse[]>, ProjectIds>({
      query: ({ idProject }) => `tasks-statistic/project/${idProject}/stages`,
      providesTags: ['Sprints'],
    }),
    getSprint: builder.query<IApiResponse<ISprintResponse>, ProjectIds>({
      query: ({ idProject, idSprint }) => `/projects/${idProject}/stages/${idSprint}`,
      providesTags: ['Sprint'],
    }),
    deleteSprint: builder.mutation<IApiResponse<IStatusMessageResponse>, ProjectIds>({
      query: ({ idProject, idSprint }) => ({
        url: `projects/${idProject}/stages/${idSprint}`,
        method: 'delete',
      }),
      invalidatesTags: ['Projects', 'Project', 'Sprints'],
    }),
  }),
});

export const {
  useCreateUpdateSprintMutation,
  useGetSprintInfoQuery,
  useLazyGetSprintInfoQuery,
  useDeleteSprintMutation,
  useLazyGetSprintQuery,
} = sprintApiSlice;
export const { resetApiState } = sprintApiSlice.util;
