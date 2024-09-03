// MUI Component
import { Suspense } from 'react';

import { Metadata } from 'next';

import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';
import TaskListHeader from '@/app/app/projects/[id]/[sprint_id]/_components/TaskListHeader';
import TaskListPage from '@/app/app/projects/[id]/[sprint_id]/_components/TaskListPage';
import ProjectTaskFilter from '@/app/app/projects/[id]/[sprint_id]/_components/TaskTableFilter';
import TaskTableSkeleton from '@/app/app/projects/[id]/[sprint_id]/_components/TaskTableSkeleton';
import { ILayoutTaskProps } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { actionFetchSprint } from '@/app/app/projects/[id]/_actions/projectId.action.utils';
import { actionFetchProject } from '@/app/app/projects/_actions/project.action.utils';

export async function generateMetadata({ params }: ILayoutTaskProps): Promise<Metadata> {
  const sprint = await actionFetchSprint({ projectId: params.id, sprintId: params.sprint_id });
  return {
    title: sprint?.name ?? 'Sprint',
  };
}

const TasksPage = async ({ params, searchParams }: ILayoutTaskProps) => {
  const ids = { projectId: params.id, sprintId: params.sprint_id };
  const project = await actionFetchProject(params.id);
  const sprint = await actionFetchSprint(ids);

  return (
    <>
      <TitleWithBreadcrumb
        title={sprint?.name ?? ''}
        backTo={`/app/projects/${params.id}`}
        breadcrumbs={[
          { breadcrumb: 'Project', href: '/app/projects' },
          { breadcrumb: sprint?.project?.name ?? params.id, href: `/app/projects/${params.id}` },
          { breadcrumb: sprint?.name ?? params.sprint_id, href: `/app/projects/${params.id}/${params.sprint_id}` },
        ]}
      />
      <ProjectTaskFilter />
      <TaskListHeader project={project} sprint={sprint} />
      <Suspense key={JSON.stringify(searchParams ? { ...searchParams } : {})} fallback={<TaskTableSkeleton />}>
        <TaskListPage project={project} sprint={sprint} params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default TasksPage;
