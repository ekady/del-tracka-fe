'use server';

import { revalidateTag } from 'next/cache';

import {
  NOTIFICATION_LIST_FETCH_TAG,
  NOTIFICATION_LIST_UNREAD_FETCH_TAG,
} from '@/app/_common/constants/notificationTag.constant';
import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';

export const revalidateNotificationListTag = async () => {
  revalidateTag(NOTIFICATION_LIST_FETCH_TAG);
};

export const revalidateUnreadNotificationListTag = async () => {
  revalidateTag(NOTIFICATION_LIST_UNREAD_FETCH_TAG);
};

export const actionReadNotification = async (id: string): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch(`/notification/read/${id}`, { method: 'put' });
    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();
    revalidateNotificationListTag();
    revalidateUnreadNotificationListTag();
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

export const actionReadAllNotification = async (): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch('/notification/read', { method: 'put' });
    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();
    revalidateNotificationListTag();
    revalidateUnreadNotificationListTag();
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
