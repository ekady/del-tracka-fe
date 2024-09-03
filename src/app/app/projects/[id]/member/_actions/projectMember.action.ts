'use server';

import { revalidateTag } from 'next/cache';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';
import { PROJECT_MEMBER_FETCH_TAG } from '@/app/app/projects/[id]/member/_constants/projectMemberTag.constant';
import { IProjectMemberAddRequest, IProjectMemberUpdateRequest } from '@/app/app/projects/_interfaces';

export const revalidateMemberListTag = async (projectId: string) => {
  revalidateTag(`${PROJECT_MEMBER_FETCH_TAG}-${projectId}`);
};

export const actionAddMember = async (
  { projectId }: { projectId: string },
  payload: IProjectMemberAddRequest,
): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${projectId}/member`, {
      method: 'post',
      body: JSON.stringify(payload),
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

export const actionUpdateRoleMember = async (
  { projectId }: { projectId: string },
  payload: IProjectMemberUpdateRequest,
): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${projectId}/member`, {
      method: 'put',
      body: JSON.stringify(payload),
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

export const actionDeleteMember = async (
  { projectId }: { projectId: string },
  payload: Pick<IProjectMemberUpdateRequest, 'userId'>,
): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${projectId}/member`, {
      method: 'delete',
      body: JSON.stringify(payload),
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

export const actionLeaveProject = async ({ projectId }: { projectId: string }): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${projectId}/leave`, {
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
