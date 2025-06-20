import { notFound } from 'next/navigation';

import { IPropsChildren } from '@/app/_common/types';
import { IProjectPageProps } from '@/app/app/projects/[id]/_interfaces';
import { actionFetchProject } from '@/app/app/projects/_actions/project.action.utils';

const LayoutProjectId = async ({ children, ...props }: IProjectPageProps & IPropsChildren) => {
  const params = await props.params;
  const project = await actionFetchProject(params.id);

  if (!project) notFound();

  return <>{children}</>;
};

export default LayoutProjectId;
