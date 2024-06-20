import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse } from '@/app/_common/types';
import { TASK_ID_FETCH_TAG } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/_constants/taskIdTag.constant';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { ITaskResponse } from '@/app/app/projects/_interfaces';

export const actionFetchTask = async ({
  projectId,
  sprintId,
  taskId,
}: IProjectSprintTaskId): Promise<ITaskResponse | null> => {
  try {
    const response = await serverFetch(`/project/${projectId}/stage/${sprintId}/task/${taskId}`, {
      next: { tags: [`${TASK_ID_FETCH_TAG}-${projectId}-${sprintId}-${taskId}`] },
    });
    const data: IApiResponse<ITaskResponse> = await response.json();
    return data.data;
  } catch {
    return null;
  }
};
