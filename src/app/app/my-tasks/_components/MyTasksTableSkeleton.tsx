import DataTableSkeleton, { IDataTableSkeletonProps } from '@/app/_common/base/DataTableSkeleton';

const tableHeader: IDataTableSkeletonProps['headers'] = [
  { title: 'Action', field: 'action', width: 150 },
  { title: 'Task Id', field: 'shortId', width: 170 },
  { title: 'Main Problem', field: 'title', width: 300 },
  { title: 'Status', field: 'status', width: 200 },
  { title: 'Feature', field: 'feature', width: 200 },
  { title: 'Level', field: 'priority', width: 200 },
  { title: 'Due Date', field: 'dueDate', width: 200 },
  { title: 'Reporter', field: 'reporter', width: 200 },
  { title: 'Assignee', field: 'assignee', width: 200 },
  { title: 'Date Updated', field: 'updatedAt', width: 250 },
];

const MyTasksTableSkeleton = () => {
  return <DataTableSkeleton headers={tableHeader} />;
};

export default MyTasksTableSkeleton;
