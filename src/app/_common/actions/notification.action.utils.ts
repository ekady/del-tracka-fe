import {
  NOTIFICATION_LIST_FETCH_TAG,
  NOTIFICATION_LIST_UNREAD_FETCH_TAG,
} from '@/app/_common/constants/notificationTag.constant';
import { convertParamsToSearchQuery } from '@/app/_common/helper/paginationParams.helper';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IPaginationParams, IPaginationResponse } from '@/app/_common/types';
import { INotificationResponse } from '@/app/_common/types/notification.type';

export const actionFetchAllNotifications = async (
  params: IPaginationParams,
): Promise<IPaginationResponse<INotificationResponse>> => {
  try {
    const newParams = { sortBy: 'updatedAt|-1', ...params };
    const searchParams = convertParamsToSearchQuery(newParams);
    const response = await serverFetch(`/notification?${searchParams}`, {
      next: { tags: [NOTIFICATION_LIST_FETCH_TAG] },
    });
    const data: IApiResponse<IPaginationResponse<INotificationResponse>> = await response.json();
    return data.data;
  } catch {
    return {
      data: [],
      pagination: {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1,
      },
    };
  }
};

export const actionFetchUnreadNotifications = async (
  params: IPaginationParams,
): Promise<IPaginationResponse<INotificationResponse>> => {
  try {
    const newParams = { sortBy: 'updatedAt|-1', ...params };
    const searchParams = convertParamsToSearchQuery(newParams);
    const response = await serverFetch(`/notification?readonly=true&${searchParams}`, {
      next: { tags: [NOTIFICATION_LIST_UNREAD_FETCH_TAG] },
    });
    const data: IApiResponse<IPaginationResponse<INotificationResponse>> = await response.json();
    return data.data;
  } catch {
    return {
      data: [],
      pagination: {
        limit: 10,
        page: 1,
        total: 0,
        totalPages: 1,
      },
    };
  }
};
