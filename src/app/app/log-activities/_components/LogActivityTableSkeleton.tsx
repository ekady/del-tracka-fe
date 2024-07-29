import DataTableSkeleton, { IDataTableSkeletonProps } from '@/app/_common/base/DataTableSkeleton';

const tableHeader: IDataTableSkeletonProps['headers'] = [
  { title: 'Date', field: 'date', width: 150 },
  { title: 'Project Name', field: 'project.name', width: 150 },
  { title: 'Sprint', field: 'sprint', width: 100 },
  { title: 'Activity', field: 'activity', width: 400 },
];

const LogActivityTableSkeleton = () => {
  return <DataTableSkeleton headers={tableHeader} />;
};

export default LogActivityTableSkeleton;
