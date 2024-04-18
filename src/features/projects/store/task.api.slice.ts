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
  ITaskMoveStageRequest,
  ITaskResponse,
  ITaskStatusUpdateBulkRequest,
  ITaskStatusUpdateRequest,
} from '../interfaces';
import { TProjectIds } from './project.api.slice';
import { sprintApiSlice } from './sprint.api.slice';

export const taskApiSlice = sprintApiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTasks: builder.query<
      IApiResponse<IPaginationResponse<Omit<ITaskResponse, 'project' | 'stage'>[]>>,
      { ids: TProjectIds; params: IPaginationParams }
    >({
      query: ({ ids, params }) => ({
        url: `/project/${ids.idProject}/stage/${ids.idSprint}/task`,
        params,
      }),
      providesTags: ['Tasks'],
    }),
    getTask: builder.query<IProjectSprintTaskDetail, { ids: TProjectIds }>({
      query: ({ ids }) => {
        const taskParam = ids.idTask ? `/task/${ids.idTask}` : '';
        return {
          url: `/project/${ids.idProject}/stage/${ids.idSprint}${taskParam}`,
        };
      },
      transformResponse: (response: IApiResponse<ITaskResponse>) => {
        return {
          ...(response?.data ?? {}),
          reporter: (response?.data?.reporter as IProjectMember) ?? null,
          assignee: (response?.data?.assignee as IProjectMember) ?? null,
          priority: levelList.find((level) => level.value === response?.data?.priority) ?? null,
        };
      },
      providesTags: ['Task'],
    }),
    moveSprint: builder.mutation<
      IApiResponse<IStatusMessageResponse>,
      { ids: TProjectIds; payload: ITaskMoveStageRequest }
    >({
      query: ({ ids, payload }) => ({
        url: `/project/${ids.idProject}/stage/${ids.idSprint}/task/move-stage`,
        body: payload,
        method: 'put',
      }),
      invalidatesTags: ['Tasks', 'ProjectStats', 'Project', 'Sprint'],
    }),
    updateStatusTaskBulk: builder.mutation<
      IApiResponse<IStatusMessageResponse>,
      { ids: TProjectIds; payload: ITaskStatusUpdateBulkRequest }
    >({
      query: ({ ids, payload }) => ({
        url: `/project/${ids.idProject}/stage/${ids.idSprint}/task/update-status`,
        body: payload,
        method: 'put',
      }),
      invalidatesTags: ['Tasks', 'Task', 'TaskActivities', 'ProjectStats'],
    }),
    updateStatusTask: builder.mutation<
      IApiResponse<IStatusMessageResponse>,
      { ids: TProjectIds; payload: ITaskStatusUpdateRequest }
    >({
      query: ({ ids, payload }) => ({
        url: `/project/${ids.idProject}/stage/${ids.idSprint}/task/${ids.idTask}/update-status`,
        body: payload,
        method: 'put',
      }),
      invalidatesTags: ['Tasks', 'Task', 'TaskActivities', 'ProjectStats'],
    }),
    createUpdateTask: builder.mutation<
      IApiResponse<IProjectSprintTaskDetail>,
      IProjectSettingRequest<IProjectSprintTaskDetail, TProjectIds>
    >({
      query: ({ id, body }) => {
        const formData = new FormData();
        const { feature, priority, title, reporter, assignee, detail, dueDate, images } = body;

        formData.append('feature', feature);
        formData.append('title', title);
        if (dueDate) {
          const date = typeof dueDate === 'string' ? dueDate : dueDate?.toISOString();
          formData.append('dueDate', date);
        }
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
          url: `/project/${id.idProject}/stage/${id.idSprint}/task/${id.idTask ? id.idTask : ''}`,
          method: id.idTask ? 'put' : 'post',
          body: formData,
        };
      },
      invalidatesTags: ['Tasks', 'TaskActivities', 'ProjectStats'],
    }),
    deleteTask: builder.mutation<IProjectSprintTaskDetail, TProjectIds>({
      query: ({ idProject, idSprint, idTask }) => ({
        url: `/project/${idProject}/stage/${idSprint}/task/${idTask}`,
        method: 'delete',
      }),
      invalidatesTags: ['Tasks', 'Task', 'TaskActivities', 'ProjectStats'],
    }),
    getComments: builder.query<
      IApiResponse<IPaginationResponse<IProjectComment>>,
      { ids: TProjectIds; params?: IPaginationParams }
    >({
      query: ({ ids, params }) => ({
        url: `/project/${ids.idProject}/stage/${ids.idSprint}/task/${ids.idTask}/comment`,
        params,
      }),
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation<
      IApiResponse<IStatusMessageResponse>,
      IProjectSettingRequest<IProjectCommentRequest, TProjectIds>
    >({
      query: ({ id, body }) => {
        return {
          url: `/project/${id.idProject}/stage/${id.idSprint}/task/${id.idTask}/comment`,
          method: 'post',
          body,
        };
      },
      invalidatesTags: ['TaskActivities'],
    }),
    getTaskActivities: builder.query<
      IApiResponse<IPaginationResponse<ILogsResponse[]>>,
      { ids: TProjectIds; params?: IPaginationParams }
    >({
      query: ({ ids, params }) => ({
        url: `/project/${ids.idProject}/stage/${ids.idSprint}/task/${ids.idTask}/activity`,
        params,
      }),
      providesTags: ['TaskActivities'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useLazyGetTasksQuery,
  useMoveSprintMutation,
  useUpdateStatusTaskMutation,
  useUpdateStatusTaskBulkMutation,
  useCreateUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
  useCreateCommentMutation,
  useGetTaskActivitiesQuery,
  useLazyGetTaskActivitiesQuery,
} = taskApiSlice;

export const {
  createComment,
  createUpdateTask,
  deleteTask,
  getComments,
  getTask,
  getTaskActivities,
  getTasks,
  moveSprint,
  updateStatusTask,
  updateStatusTaskBulk,
} = taskApiSlice.endpoints;
