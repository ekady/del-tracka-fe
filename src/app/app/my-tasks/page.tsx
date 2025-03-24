import { Suspense } from 'react';

import { Metadata } from 'next';

import { IPageParams } from '@/app/_common/types';
import MyTasksFilter from '@/app/app/my-tasks/_components/MyTasksFilter';
import MyTasksTableHeader from '@/app/app/my-tasks/_components/MyTasksTableHeader';
import MyTasksTableSkeleton from '@/app/app/my-tasks/_components/MyTasksTableSkeleton';
import MyTasksTableWrapper from '@/app/app/my-tasks/_components/MyTasksTableWrapper';
import { actionFetchProjectList } from '@/app/app/projects/_actions/project.action.utils';

export const metadata: Metadata = {
  title: 'My Tasks',
};

const MyTasksPage = async (props: IPageParams) => {
  const projects = await actionFetchProjectList();
  const searchParams = await props.searchParams;
  return (
    <>
      <MyTasksFilter projects={projects} />
      <MyTasksTableHeader />
      <Suspense key={JSON.stringify(searchParams ?? {})} fallback={<MyTasksTableSkeleton />}>
        <MyTasksTableWrapper searchParams={props.searchParams} />
      </Suspense>
    </>
  );
};

export default MyTasksPage;
