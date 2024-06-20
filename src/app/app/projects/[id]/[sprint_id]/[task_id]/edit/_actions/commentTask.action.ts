'use server';

import { revalidateTag } from 'next/cache';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';
import { COMMENT_FETCH_LIST_TAG } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_constants/commentTag.constant';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { ITaskCommentRequest } from '@/app/app/projects/_interfaces';

export const revalidateCommentList = async ({ projectId, sprintId, taskId }: IProjectSprintTaskId) => {
  revalidateTag(`${COMMENT_FETCH_LIST_TAG}-${projectId}-${sprintId}-${taskId}`);
};

export const actionAddComment = async (
  ids: IProjectSprintTaskId,
  payload: ITaskCommentRequest,
): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${ids.projectId}/stage/${ids.sprintId}/task/${ids.taskId}/comment`, {
      method: 'post',
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();
    revalidateCommentList(ids);
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
