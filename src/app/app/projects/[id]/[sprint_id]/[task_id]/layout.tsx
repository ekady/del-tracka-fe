import { notFound } from 'next/navigation';

import { IPropsChildren } from '@/app/_common/types';
import { actionFetchTask } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/_actions/taskId.action.utils';
import { ILayoutTaskWithIdProps } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/_interfaces';

const LayoutTaskWithId = async ({ children, params }: ILayoutTaskWithIdProps & IPropsChildren) => {
  const task = await actionFetchTask({ projectId: params.id, sprintId: params.sprint_id, taskId: params.task_id });

  if (!task) notFound();

  return <>{children}</>;
};

export default LayoutTaskWithId;
