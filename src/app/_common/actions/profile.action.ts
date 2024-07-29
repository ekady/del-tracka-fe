'use server';

import { revalidateTag } from 'next/cache';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';
import { IProfileRequest } from '@/app/_common/types/profile.type';

import { PROFILE_FETCH_TAG } from '../constants/profileAction.constant';

export const revalidateProfileTag = async () => {
  revalidateTag(PROFILE_FETCH_TAG);
};

export const actionUpdateProfile = async (payload: IProfileRequest): Promise<IResponseMessage> => {
  try {
    const formData = new FormData();
    formData.append('firstName', payload?.firstName ?? '');
    formData.append('lastName', payload?.lastName ?? '');
    formData.append('email', payload?.email ?? '');
    !!payload.password && formData.append('password', payload.password);
    !!payload.passwordConfirm && formData.append('passwordConfirm', payload.passwordConfirm);

    if (payload.picture && typeof payload.picture === 'object' && 'stream' in payload.picture) {
      formData.append('picture', payload.picture);
    }

    const response = await serverFetch('/profile', { body: formData, method: 'put' }, 'auto');
    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();
    revalidateProfileTag();
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

export const actionDeleteProfile = async (): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch('/profile', { method: 'delete' });
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
