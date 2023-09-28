// React
import { ReactElement, useEffect } from 'react';

// MUI Component
import Box from '@mui/material/Box';

// Components
import { LayoutDefault } from '@/common/layout';
import { MyTasksFilter } from '@/features/my-issues/components';

import { useTableChange } from '@/common/hooks/useTableChange';
import { useLazyGetMyTasksQuery } from '@/features/my-issues/store/myTasks.api.slice';

import { ITaskResponse } from '@/features/projects/interfaces';
import { ProjectTaskTable } from '@/features/projects/components';

const MyTasksPage = () => {
  const [getTasks, { data, isFetching, isLoading }] = useLazyGetMyTasksQuery();
  const { onFilter, onSearch, onSort, tableOption, onLimitPage } = useTableChange({ sortBy: 'updatedAt|-1' });

  useEffect(() => {
    getTasks(tableOption).catch(() => {
      //
    });
  }, [getTasks, tableOption]);

  return (
    <>
      <MyTasksFilter onChange={onFilter} />
      <Box sx={{ height: 40 }} />
      <ProjectTaskTable
        disabledBulkMoveSprint
        disabledBulkUpdateStatus
        SearchProps={{ onChange: onSearch }}
        TableProps={{
          getRowId: (row: ITaskResponse) => row._id,
          rows: data?.data?.data ?? [],
          paginationMode: 'server',
          rowCount: data?.data?.pagination?.total ?? 0,
          loading: isFetching || isLoading,
          onSortModelChange: onSort,
          onPaginationModelChange: (model) => {
            onLimitPage('limit', model.pageSize);
            onLimitPage('page', model.page + 1);
          },
          paginationModel: {
            page: (data?.data.pagination.page ? Number(data.data.pagination.page) : 1) - 1,
            pageSize: data?.data.pagination.limit ? Number(data.data.pagination.limit) : 10,
          },
        }}
      />
    </>
  );
};

MyTasksPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default MyTasksPage;
