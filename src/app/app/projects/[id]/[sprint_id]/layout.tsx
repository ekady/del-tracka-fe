import { notFound } from 'next/navigation';

import { IPropsChildren } from '@/app/_common/types';
import { ILayoutTaskProps } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { actionFetchSprint } from '@/app/app/projects/[id]/_actions/projectId.action.utils';

const LayoutTask = async ({ children, params }: Omit<ILayoutTaskProps, 'searchParams'> & IPropsChildren) => {
  const sprint = await actionFetchSprint({ projectId: params.id, sprintId: params.sprint_id });

  if (!sprint) notFound();

  return <>{children}</>;
};

export default LayoutTask;
