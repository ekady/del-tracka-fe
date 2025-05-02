import dayjs from 'dayjs';

import { IPageParams, IPaginationResponse } from '@/app/_common/types';
import TaskActivityList from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskActivityList';
import { actionFetchProjectActivity } from '@/app/app/projects/[id]/_actions/projectId.action.utils';
import { IProjectActivityResponse } from '@/app/app/projects/_interfaces';

const initialDateValue = {
  startDate: dayjs().startOf('month').toISOString(),
  endDate: dayjs().endOf('month').toISOString(),
};

const LogActivityWrapper = async (props: Pick<IPageParams, 'searchParams'>) => {
  const searchParams = await props.searchParams;
  const { project: projectId, ...params } = searchParams ?? {};
  let activities: IPaginationResponse<IProjectActivityResponse> | null = null;

  if (projectId) {
    activities = await actionFetchProjectActivity(projectId.toString(), {
      startDate: params?.startDate || initialDateValue.startDate,
      endDate: params?.endDate || initialDateValue.endDate,
      sort: 'updatedAt|-1',
      ...params,
    });
  } else {
    activities = null;
  }

  return <TaskActivityList activities={activities ?? null} />;
};

export default LogActivityWrapper;
