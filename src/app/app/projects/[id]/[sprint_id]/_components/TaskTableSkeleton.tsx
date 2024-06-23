import DataTableSkeleton, { IDataTableSkeletonProps } from '@/app/_common/base/DataTableSkeleton';

const tableHeader: IDataTableSkeletonProps['headers'] = [
  { title: 'Action', field: 'action', width: 120 },
  { title: 'Task Id', field: 'shortId', width: 170 },
  { title: 'Title', field: 'title', width: 300 },
  { title: 'Status', field: 'status', width: 200 },
  { title: 'Level', field: 'priority', width: 200 },
  { title: 'Assignee', field: 'assignee', width: 200 },
];

const TaskTableSkeleton = () => {
  return <DataTableSkeleton headers={tableHeader} />;
};

export default TaskTableSkeleton;
