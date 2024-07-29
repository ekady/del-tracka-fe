import dayjs from 'dayjs';

import { IPaginationResponse } from '@/app/_common/types';
import { actionFetchActivitiesTask } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_actions/activitiesTask.action.utils';
import TaskActivityList from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskActivityList';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { IProjectActivityResponse } from '@/app/app/projects/_interfaces';

interface ITaskActivityWrapperProps {
  ids: IProjectSprintTaskId;
  searchParams?: Record<string, string | number | null | never>;
}

const initialDateValue = {
  startDate: dayjs().startOf('month').toISOString(),
  endDate: dayjs().endOf('month').toISOString(),
};

const TaskActivityWrapper = async ({ ids, searchParams }: ITaskActivityWrapperProps) => {
  const activities: IPaginationResponse<IProjectActivityResponse> = await actionFetchActivitiesTask(ids, {
    startDate: initialDateValue.startDate,
    endDate: initialDateValue.endDate,
    sort: 'updatedAt|-1',
    ...searchParams,
  });

  return <TaskActivityList activities={activities} />;
};

export default TaskActivityWrapper;
