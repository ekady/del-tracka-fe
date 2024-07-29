'use server';

import { revalidateTag } from 'next/cache';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';
import {
  PROJECT_ACTIVITY_FETCH_TAG,
  PROJECT_STATS_FETCH_TAG,
  SPRINT_FETCH_TAG,
  SPRINT_LIST_FETCH_TAG,
} from '@/app/app/projects/[id]/_constant/projectIdTag.constant';
import { ISprint } from '@/app/app/projects/_interfaces';

export const revalidateSprintListTag = async (projectId: string) => {
  revalidateTag(`${SPRINT_LIST_FETCH_TAG}-${projectId}`);
};

export const revalidateSprintTag = async (projectId: string, sprintId: string) => {
  revalidateTag(`${SPRINT_FETCH_TAG}-${projectId}-${sprintId}`);
};

export const revalidatProjectStatTag = async (id: string) => {
  revalidateTag(`${PROJECT_STATS_FETCH_TAG}-${id}`);
};

export const revalidatProjectActivityTag = async (id: string) => {
  revalidateTag(`${PROJECT_ACTIVITY_FETCH_TAG}-${id}`);
};

export const actionCreateEditSprint = async (
  payload: Partial<ISprint>,
  { projectId, sprintId }: { projectId: string; sprintId?: string },
): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${projectId}/stage/${sprintId ?? ''}`, {
      body: JSON.stringify(payload),
      method: sprintId ? 'put' : 'post',
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

export const actionDeleteSprint = async ({
  projectId,
  sprintId,
}: {
  projectId: string;
  sprintId: string;
}): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${projectId}/stage/${sprintId}`, {
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
      message: responseError?.errors?.[0]?.message ?? 'Something went wrong',
    };
  }
};
