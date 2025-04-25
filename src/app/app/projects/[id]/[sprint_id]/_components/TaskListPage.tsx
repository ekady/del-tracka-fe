import { redirect } from 'next/navigation';

import { actionFetchTaskList } from '@/app/app/projects/[id]/[sprint_id]/_actions/task.action.utils';
import TaskTable from '@/app/app/projects/[id]/[sprint_id]/_components/TaskTable';
import { ILayoutTaskProps } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { actionFetchSprintList } from '@/app/app/projects/[id]/_actions/projectId.action.utils';
import { IProjectWithPermissions, ISprintResponse } from '@/app/app/projects/_interfaces';

interface ITaskListPageProps extends ILayoutTaskProps {
  project: IProjectWithPermissions | null;
  sprint: ISprintResponse | null;
}

const TaskListPage = async ({ project, sprint, ...props }: ITaskListPageProps) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const sprintList = await actionFetchSprintList({ projectId: params.id });
  const taskPagination = await actionFetchTaskList({ projectId: params.id, sprintId: params.sprint_id }, searchParams);

  const page = searchParams?.page ?? '1';
  if (taskPagination.data.length <= 0 && Number(page) > 1) {
    const strSearchParams = new URLSearchParams({ ...searchParams, page: '1' }).toString();
    redirect(`/app/projects/${params.id}/${params.sprint_id}?${strSearchParams}`);
  }

  return <TaskTable project={project} sprint={sprint} taskPagination={taskPagination} sprintList={sprintList} />;
};

export default TaskListPage;
