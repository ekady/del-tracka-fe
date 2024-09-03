import { notFound } from 'next/navigation';

import { IPropsChildren } from '@/app/_common/types';
import { IProjectPageProps } from '@/app/app/projects/[id]/_interfaces';
import { actionFetchProject } from '@/app/app/projects/_actions/project.action.utils';

const LayoutProjectId = async ({ children, params }: IProjectPageProps & IPropsChildren) => {
  const project = await actionFetchProject(params.id);

  if (!project) notFound();

  return <>{children}</>;
};

export default LayoutProjectId;
