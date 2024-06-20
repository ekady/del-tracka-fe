import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IPaginationParams, IPaginationResponse } from '@/app/_common/types';
import {
  PROJECT_ACTIVITY_FETCH_TAG,
  PROJECT_STATS_FETCH_TAG,
  SPRINT_FETCH_TAG,
  SPRINT_LIST_FETCH_TAG,
} from '@/app/app/projects/[id]/_constant/projectIdTag.constant';
import {
  IProjectActivityResponse,
  ISprintResponse,
  ISprintsResponse,
  IStatsResponse,
  ITasksCount,
} from '@/app/app/projects/_interfaces';

export const actionFetchProjectActivity = async (
  id: string,
  params?: IPaginationParams,
): Promise<IPaginationResponse<IProjectActivityResponse> | null> => {
  try {
    const searchQuery = new URLSearchParams();
    Object.keys(params ?? {}).forEach((key) => {
      searchQuery.append(key, params?.[key]?.toString() ?? '');
    });
    const response = await serverFetch(`/project/${id}/activity?${searchQuery.toString()}`, {
      next: { tags: [`${PROJECT_ACTIVITY_FETCH_TAG}-${id}`] },
    });
    const data: IApiResponse<IPaginationResponse<IProjectActivityResponse>> = await response.json();
    return data.data;
  } catch {
    return null;
  }
};

export const actionFetchProjectStats = async (id: string): Promise<Record<keyof ITasksCount, number>> => {
  try {
    const response = await serverFetch(`/task-statistic/project/${id}`, {
      next: { tags: [`${PROJECT_STATS_FETCH_TAG}-${id}`] },
    });
    const data: IApiResponse<IStatsResponse[]> = await response.json();
    const transformResponse: Record<keyof ITasksCount, number> = data.data?.reduce(
      (acc, curr) => {
        acc[curr.name] = curr.count;
        return acc;
      },
      {} as Record<string, number>,
    );
    return transformResponse;
  } catch {
    return { CLOSED: 0, FAILED: 0, HOLD: 0, IN_PROGRESS: 0, OPEN: 0, READY_FOR_TEST: 0, REVIEW: 0 };
  }
};

export const actionFetchSprintList = async ({ projectId }: { projectId: string }): Promise<ISprintsResponse[]> => {
  try {
    const response = await serverFetch(`/task-statistic/project/${projectId}/stage`, {
      next: { tags: [`${SPRINT_LIST_FETCH_TAG}-${projectId}`] },
    });
    const data: IApiResponse<ISprintsResponse[]> = await response.json();
    return data.data;
  } catch {
    return [];
  }
};

export const actionFetchSprint = async ({
  projectId,
  sprintId,
}: {
  projectId: string;
  sprintId: string;
}): Promise<ISprintResponse | null> => {
  try {
    const response = await serverFetch(`/project/${projectId}/stage/${sprintId}`, {
      next: { tags: [`${SPRINT_FETCH_TAG}-${projectId}-${sprintId}`] },
    });
    const data: IApiResponse<ISprintResponse> = await response.json();
    return data.data;
  } catch {
    return null;
  }
};
