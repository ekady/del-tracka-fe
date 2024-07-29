'use server';

import { revalidateTag } from 'next/cache';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';

import { PROJECT_FETCH_TAG, PROJECT_LIST_FETCH_TAG } from '../_constant/projectTag.constant';
import { IProjectRequest } from '../_interfaces';

export const revalidateProjectListTag = async () => {
  revalidateTag(PROJECT_LIST_FETCH_TAG);
};

export const revalidateProjectTag = async (id: string) => {
  revalidateTag(`${PROJECT_FETCH_TAG}-${id}`);
};

export const actionCreateEditProject = async (payload: IProjectRequest, id?: string): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${id ?? ''}`, {
      body: JSON.stringify(payload),
      method: id ? 'put' : 'post',
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

export const actionDeleteProject = async (id: string): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/project/${id ?? ''}`, {
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
