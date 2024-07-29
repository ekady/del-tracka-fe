import { convertParamsToSearchQuery } from '@/app/_common/helper/paginationParams.helper';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IPaginationParams, IPaginationResponse } from '@/app/_common/types';
import { TASK_FETCH_LIST_TAG } from '@/app/app/projects/[id]/[sprint_id]/_constants/taskTag.constant';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { ITaskResponse } from '@/app/app/projects/_interfaces';

export const actionFetchTaskList = async (
  { projectId, sprintId }: Omit<IProjectSprintTaskId, 'taskId'>,
  params?: IPaginationParams,
): Promise<IPaginationResponse<Omit<ITaskResponse, 'project' | 'stage'>[]>> => {
  try {
    const newParams = { sortBy: 'updatedAt|-1', ...params };
    const searchParams = convertParamsToSearchQuery(newParams);
    const response = await serverFetch(`/project/${projectId}/stage/${sprintId}/task?${searchParams}`, {
      next: { tags: [`${TASK_FETCH_LIST_TAG}-${projectId}-${sprintId}`] },
    });
    const data: IApiResponse<IPaginationResponse<Omit<ITaskResponse, 'project' | 'stage'>[]>> = await response.json();
    return data.data;
  } catch {
    return {
      data: [],
      pagination: {
        limit: 1,
        page: 1,
        total: 0,
        totalPages: 1,
      },
    };
  }
};
