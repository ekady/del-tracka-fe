import { convertParamsToSearchQuery } from '@/app/_common/helper/paginationParams.helper';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IPaginationParams, IPaginationResponse } from '@/app/_common/types';
import { COMMENT_FETCH_LIST_TAG } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_constants/commentTag.constant';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { ITaskComment } from '@/app/app/projects/_interfaces';

export const actionFetchCommentList = async (
  { projectId, sprintId, taskId }: IProjectSprintTaskId,
  params?: IPaginationParams,
): Promise<IPaginationResponse<ITaskComment>> => {
  try {
    const newParams = { ...params, sortBy: 'createdAt|-1' };
    const searchParams = convertParamsToSearchQuery(newParams);
    const response = await serverFetch(
      `/project/${projectId}/stage/${sprintId}/task/${taskId}/comment?${searchParams}`,
      { next: { tags: [`${COMMENT_FETCH_LIST_TAG}-${projectId}-${sprintId}-${taskId}`] } },
    );
    const data: IApiResponse<IPaginationResponse<ITaskComment>> = await response.json();
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
