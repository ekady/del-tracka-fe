import { IApiResponse, IPaginationParams } from '@/common/types';
import { IProjectSettingRequest, IProjectSprintIssueDetail, ITaskResponse } from '../interfaces';
import { ProjectIds } from './project.api.slice';
import { sprintApiSlice } from './sprint.api.slice';

export const taskApiSlice = sprintApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTasks: builder.query<
      IApiResponse<Omit<ITaskResponse[], 'project' | 'stage'>>,
      { ids: ProjectIds; params: IPaginationParams }
    >({
      query: ({ ids, params }) => ({
        url: `/projects/${ids.idProject}/stages/${ids.idSprint}/tasks`,
        params,
      }),
    }),
    createUpdateTask: builder.mutation<
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
    deleteTask: builder.mutation<IProjectSprintIssueDetail, ProjectIds>({
      query: ({ idProject, idSprint, idIssue }) => ({
        url: `/projects/${idProject}/stages/${idSprint}/tasks/${idIssue}`,
        method: 'delete',
      }),
    }),
  }),
});

export const { useGetTasksQuery, useLazyGetTasksQuery } = taskApiSlice;
