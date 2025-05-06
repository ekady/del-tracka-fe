import { convertParamsToSearchQuery } from '@/app/_common/helper/paginationParams.helper';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IParams, IPaginationResponse } from '@/app/_common/types';
import { MY_TASKS_FETCH_TAG } from '@/app/app/my-tasks/_constants/myTasksTag.constant';
import { ITaskResponse } from '@/app/app/projects/_interfaces';

export const actionFetchMyTaskList = async ({
  searchParams,
}: Pick<IParams, 'searchParams'>): Promise<IPaginationResponse<ITaskResponse>> => {
  try {
    const newParams = { sortBy: 'updatedAt|-1', ...searchParams };
    const params = convertParamsToSearchQuery(newParams);
    const response = await serverFetch(`/my-task?${params}`, {
      next: { tags: [MY_TASKS_FETCH_TAG] },
    });
    const data: IApiResponse<IPaginationResponse<ITaskResponse>> = await response.json();
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
