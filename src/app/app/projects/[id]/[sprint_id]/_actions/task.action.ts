'use server';

import { revalidateTag } from 'next/cache';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';
import { TASK_FETCH_LIST_TAG } from '@/app/app/projects/[id]/[sprint_id]/_constants/taskTag.constant';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { ITaskStatusUpdateBulkRequest, ITaskStatusUpdateRequest } from '@/app/app/projects/_interfaces';

export const revalidateTaskListTag = async (projectId: string, sprintId: string) => {
  revalidateTag(`${TASK_FETCH_LIST_TAG}-${projectId}-${sprintId}`);
};

export const actionTaskDelete = async (ids: IProjectSprintTaskId): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${ids.projectId}/stage/${ids.sprintId}/task/${ids.taskId}`, {
      method: 'delete',
    });
    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();
    return {
      isError: false,
      isSuccess: true,
      message: data?.data?.message,
    };
  } catch (error) {
    const responseError: IResponseError = await (error as Response).json();
    return {
      isError: true,
      isSuccess: false,
      message: responseError?.errors?.[0]?.message?.toString() ?? 'Something went wrong',
    };
  }
};

export const actionTaskUpdateStatus = async (
  ids: IProjectSprintTaskId,
  payload: ITaskStatusUpdateRequest,
): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(
      `/project/${ids.projectId}/stage/${ids.sprintId}/task/${ids.taskId}/update-status`,
      { body: JSON.stringify(payload), method: 'put' },
    );
    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();
    return {
      isError: false,
      isSuccess: true,
      message: data?.data?.message,
    };
  } catch (error) {
    const responseError: IResponseError = await (error as Response).json();
    return {
      isError: true,
      isSuccess: false,
      message: responseError?.errors?.[0]?.message ?? 'Something went wrong',
    };
  }
};

export const actionTaskUpdateBulkStatus = async (
  ids: Omit<IProjectSprintTaskId, 'taskId'>,
  payload: ITaskStatusUpdateBulkRequest,
): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${ids.projectId}/stage/${ids.sprintId}/task/update-status`, {
      body: JSON.stringify(payload),
      method: 'put',
    });
    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();
    return {
      isError: false,
      isSuccess: true,
      message: data?.data?.message,
    };
  } catch (error) {
    const responseError: IResponseError = await (error as Response).json();
    return {
      isError: true,
      isSuccess: false,
      message: responseError?.errors?.[0]?.message ?? 'Something went wrong',
    };
  }
};
