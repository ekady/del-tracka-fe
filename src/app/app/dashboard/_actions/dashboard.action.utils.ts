'use server';

import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse } from '@/app/_common/types';
import {
  DASHBOARD_ACTIVITIES_FETCH_TAG,
  DASHBOARD_PROJECT_TOTAL_FETCH_TAG,
  DASHBOARD_TASK_ALL_FETCH_TAG,
  DASHBOARD_TASK_USER_FETCH_TAG,
} from '@/app/app/_constants/dashboardAction.constant';
import { ITaskProjectResponse, ITaskStatusStatsResponse, IUserActivitiesStats } from '@/app/app/dashboard/_interfaces';

export const actionFetchDashboardActivities = async (): Promise<IUserActivitiesStats[]> => {
  try {
    const response = await serverFetch('/activity/stats', { next: { tags: [DASHBOARD_ACTIVITIES_FETCH_TAG] } });
    const data: IApiResponse<IUserActivitiesStats[]> = await response.json();
    return data.data;
  } catch {
    return [];
  }
};

export const actionFetchDashboardProjectTotal = async (): Promise<ITaskProjectResponse> => {
  try {
    const response = await serverFetch('/task-statistic/total', {
      next: { tags: [DASHBOARD_PROJECT_TOTAL_FETCH_TAG] },
    });
    const data: IApiResponse<ITaskProjectResponse> = await response.json();
    return data.data;
  } catch {
    return {
      totalProject: 0,
      totalTask: 0,
    };
  }
};

export const actionFetchDashboardTaskAll = async (): Promise<ITaskStatusStatsResponse> => {
  try {
    const response = await serverFetch('/task-statistic/all', { next: { tags: [DASHBOARD_TASK_ALL_FETCH_TAG] } });
    const data: IApiResponse<ITaskStatusStatsResponse> = await response.json();
    Object.keys(data.data).forEach((key) => {
      data.data[key] = data.data[key] || 0.01;
    });
    return data.data;
  } catch {
    return { CLOSED: 0, FAILED: 0, HOLD: 0, IN_PROGRESS: 0, OPEN: 0, READY_FOR_TEST: 0, REVIEW: 0 };
  }
};

export const actionFetchDashboardTaskUser = async (): Promise<ITaskStatusStatsResponse> => {
  try {
    const response = await serverFetch('/task-statistic/user', { next: { tags: [DASHBOARD_TASK_USER_FETCH_TAG] } });
    const data: IApiResponse<ITaskStatusStatsResponse> = await response.json();
    Object.keys(data.data).forEach((key) => {
      data.data[key] = data.data[key] || 0.01;
    });
    return data.data;
  } catch {
    return { CLOSED: 0, FAILED: 0, HOLD: 0, IN_PROGRESS: 0, OPEN: 0, READY_FOR_TEST: 0, REVIEW: 0 };
  }
};
