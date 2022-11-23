// React
import { ReactElement, useEffect } from 'react';

// MUI Component
import { Box } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import { MyTasksFilter, MyTasksTable } from '@/features/my-issues/components';

import { useTableChange } from '@/common/hooks/useTableChange';
import { useLazyGetMyTasksQuery } from '@/features/my-issues/store/myTasks.api.slice';

const MyTasksPage = () => {
  const [getTasks, { data, isFetching, isLoading }] = useLazyGetMyTasksQuery();
  const { onFilter, onSearch, onSort, tableOption, onLimitPage } = useTableChange();

  useEffect(() => {
    const response = getTasks(tableOption);
    return () => {
      response.abort();
    };
  }, [getTasks, tableOption]);

  return (
    <>
      <MyTasksFilter onChange={onFilter} />
      <Box sx={{ height: 40 }} />
      <MyTasksTable
        TableProps={{
          rows: data?.content ?? [],
          rowCount: data?.totalContent ?? 0,
          loading: isFetching || isLoading,
          onSortModelChange: onSort,
          onPageSizeChange: (limit) => onLimitPage('limit', limit),
          onPageChange: (page) => onLimitPage('page', page),
        }}
        SearchProps={{ onChange: onSearch }}
      />
    </>
  );
};

MyTasksPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default MyTasksPage;
