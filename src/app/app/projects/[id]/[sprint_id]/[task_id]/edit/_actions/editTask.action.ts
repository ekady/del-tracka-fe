'use server';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IFileStream, IResponseError, IStatusMessageResponse } from '@/app/_common/types';
import { revalidateTaskListTag } from '@/app/app/projects/[id]/[sprint_id]/_actions/task.action';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { ITaskForm } from '@/app/app/projects/_interfaces';

export const actionEditTask = async (ids: IProjectSprintTaskId, payload: ITaskForm): Promise<IResponseMessage> => {
  try {
    const formData = new FormData();
    const { feature, priority, title, reporter, assignee, detail, dueDate, images } = payload;

    formData.append('feature', feature);
    formData.append('title', title);
    if (dueDate) {
      const date = typeof dueDate === 'string' ? dueDate : dueDate?.toISOString();
      formData.append('dueDate', date);
    }
    formData.append('priority', priority?.value ?? '');
    formData.append('reporter', reporter?._id ?? '');
    formData.append('assignee', assignee?._id ?? '');
    formData.append('detail', detail ?? '');
    if (images && images.length > 0) {
      const oldImages: IFileStream[] = [];
      images.forEach((image) => {
        if ('stream' in image) formData.append('images', image);
        else oldImages.push(image);
      });
      formData.append('oldImages', JSON.stringify(oldImages));
    }
    const response = await serverFetch(
      `/project/${ids.projectId}/stage/${ids.sprintId}/task/${ids.taskId}`,
      { method: 'put', body: formData },
      'auto',
    );
    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();
    revalidateTaskListTag(ids.projectId, ids.sprintId);
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
