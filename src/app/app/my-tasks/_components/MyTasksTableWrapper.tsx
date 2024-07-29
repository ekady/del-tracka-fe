// MUI Component
import { redirect } from 'next/navigation';

import { IPageParams } from '@/app/_common/types';
import { actionFetchMyTaskList } from '@/app/app/my-tasks/_actions/myTasks.action.utils';
import MyTaskTable from '@/app/app/my-tasks/_components/MyTasksTable';

const MyTasksTableWrapper = async ({ searchParams }: Pick<IPageParams, 'searchParams'>) => {
  const taskPagination = await actionFetchMyTaskList({ searchParams: searchParams ?? {} });

  const page = searchParams?.page ?? '1';
  if (taskPagination.data.length <= 0 && Number(page) > 1) {
    const strSearchParams = new URLSearchParams({ ...searchParams, page: '1' }).toString();
    redirect(`/my-tasks?${strSearchParams}`);
  }

  return <MyTaskTable taskPagination={taskPagination} />;
};

export default MyTasksTableWrapper;
