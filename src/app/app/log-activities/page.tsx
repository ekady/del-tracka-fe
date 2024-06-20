import { Suspense } from 'react';

import { Metadata } from 'next';

import { IPageParams } from '@/app/_common/types';
import LogActivityButtonDownload from '@/app/app/log-activities/_components/LogActivityButtonDownload';
import LogActivityFilter from '@/app/app/log-activities/_components/LogActivityFilter';
import LogActivityTableSkeleton from '@/app/app/log-activities/_components/LogActivityTableSkeleton';
import LogActivityWrapper from '@/app/app/log-activities/_components/LogActivityTableWrapper';
import { actionFetchProjectList } from '@/app/app/projects/_actions/project.action.utils';

export const metadata: Metadata = {
  title: 'Log Activities',
};

const LogActivitiesPage = async ({ searchParams }: IPageParams) => {
  const projects = await actionFetchProjectList();
  return (
    <>
      <LogActivityFilter projects={projects} />
      <LogActivityButtonDownload />
      <Suspense key={JSON.stringify(searchParams ?? {})} fallback={<LogActivityTableSkeleton />}>
        <LogActivityWrapper searchParams={searchParams ?? {}} />
      </Suspense>
    </>
  );
};

export default LogActivitiesPage;
