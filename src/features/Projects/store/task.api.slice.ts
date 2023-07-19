import { levelList } from '@/common/constants/level';
import {
  IApiResponse,
  IFileStream,
  IPaginationParams,
  IPaginationResponse,
  IStatusMessageResponse,
} from '@/common/types';
import { ILogsResponse } from '@/features/logs/interfaces';
import {
  IProjectComment,
  IProjectCommentRequest,
  IProjectMember,
  IProjectSettingRequest,
  IProjectSprintTaskDetail,
  ITaskResponse,
  ITaskStatusUpdateRequest,
} from '../interfaces';
import { ProjectIds } from './project.api.slice';
import { sprintApiSlice } from './sprint.api.slice';

export const taskApiSlice = sprintApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTasks: builder.query<
      IApiResponse<IPaginationResponse<Omit<ITaskResponse, 'project' | 'stage'>[]>>,
      { ids: ProjectIds; params: IPaginationParams }
    >({
      query: ({ ids, params }) => ({
        url: `/projects/${ids.idProject}/stages/${ids.idSprint}/tasks`,
        params,
      }),
      providesTags: ['Tasks'],
    }),
    getTask: builder.query<IProjectSprintTaskDetail, { ids: ProjectIds }>({
      query: ({ ids }) => {
        const taskParam = ids.idTask ? `/tasks/${ids.idTask}` : '';
        return {
          url: `/projects/${ids.idProject}/stages/${ids.idSprint}${taskParam}`,
        };
      },
      transformResponse: (response: IApiResponse<ITaskResponse>) => {
        return {
          _id: response.data._id,
          title: response.data.title,
          feature: response.data.feature,
          reporter: response.data.reporter as IProjectMember,
          assignee: response.data.assignee as IProjectMember,
          detail: response.data.detail,
          priority: levelList.find((level) => level.value === response.data.priority) ?? null,
          images: response.data.images,
          project: response.data.project,
          stage: response.data.stage,
          name: response.data?.name,
          shortId: response.data.shortId,
        };
      },
      providesTags: ['Task'],
    }),
    updateStatusTask: builder.mutation<
      IApiResponse<IStatusMessageResponse>,
      { ids: ProjectIds; payload: ITaskStatusUpdateRequest }
    >({
      query: ({ ids, payload }) => ({
        url: `/projects/${ids.idProject}/stages/${ids.idSprint}/tasks/${ids.idTask}/update-status`,
        body: payload,
        method: 'put',
      }),
      invalidatesTags: ['Tasks', 'Task', 'TaskActivities', 'ProjectStats'],
    }),
    createUpdateTask: builder.mutation<
      IApiResponse<IProjectSprintTaskDetail>,
      IProjectSettingRequest<IProjectSprintTaskDetail, ProjectIds>
    >({
      query: ({ id, body }) => {
        const formData = new FormData();
        const { feature, priority, title, reporter, assignee, detail, images } = body;

        formData.append('feature', feature);
        formData.append('title', title);
        formData.append('priority', priority?.value ?? '');
        formData.append('reporter', reporter?._id ?? '');
        formData.append('assignee', assignee?._id ?? '');
        formData.append('detail', detail ?? '');
        if (images && images.length > 0) {
          const oldImages: IFileStream[] = [];
          images.forEach((image) => {
            if (image instanceof File || image instanceof Blob) formData.append('images', image);
            else oldImages.push(image);
          });
          formData.append('oldImages', JSON.stringify(oldImages));
        }

        return {
          url: `/projects/${id.idProject}/stages/${id.idSprint}/tasks/${id.idTask ? id.idTask : ''}`,
          method: id.idTask ? 'put' : 'post',
          body: formData,
        };
      },
      invalidatesTags: ['Tasks', 'TaskActivities', 'ProjectStats'],
    }),
    deleteTask: builder.mutation<IProjectSprintTaskDetail, ProjectIds>({
      query: ({ idProject, idSprint, idTask }) => ({
        url: `/projects/${idProject}/stages/${idSprint}/tasks/${idTask}`,
        method: 'delete',
      }),
      invalidatesTags: ['Tasks', 'Task', 'TaskActivities', 'ProjectStats'],
    }),
    getComments: builder.query<IApiResponse<IProjectComment[]>, ProjectIds>({
      query: ({ idProject, idSprint, idTask }) => `/projects/${idProject}/stages/${idSprint}/tasks/${idTask}/comments`,
      providesTags: ['Comments'],
      transformResponse: (response: IApiResponse<IProjectComment[]>) => {
        const dataCopy = [...response.data];
        dataCopy.reverse();
        return { ...response, data: dataCopy };
      },
    }),
    createComment: builder.mutation<
      IApiResponse<IStatusMessageResponse>,
      IProjectSettingRequest<IProjectCommentRequest, ProjectIds>
    >({
      query: ({ id, body }) => {
        return {
          url: `/projects/${id.idProject}/stages/${id.idSprint}/tasks/${id.idTask}/comments`,
          method: 'post',
          body,
        };
      },
      invalidatesTags: ['Comments', 'TaskActivities'],
    }),
    getTaskActivities: builder.query<IApiResponse<IPaginationResponse<ILogsResponse[]>>, ProjectIds>({
      query: (id) => `/projects/${id.idProject}/stages/${id.idSprint}/tasks/${id.idTask}/activities`,
      providesTags: ['TaskActivities'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useLazyGetTasksQuery,
  useUpdateStatusTaskMutation,
  useCreateUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetCommentsQuery,
  useCreateCommentMutation,
  useGetTaskActivitiesQuery,
} = taskApiSlice;
