// React
import { ReactElement, useEffect } from 'react';

// MUI Component
import { Box } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import { MyIssuesFilter, MyIssuesTable } from '@/features/My-Issues/components';

import { useTableChange } from '@/common/hooks/useTableChange';
import { useLazyGetMyIssuesQuery } from '@/features/My-Issues/store/myIssues.api.slice';

const MyIssuesPage = () => {
  const [getIssues, { data, isFetching, isLoading }] = useLazyGetMyIssuesQuery();
  const { onFilter, onSearch, onSort, tableOption, onLimitPage } = useTableChange();

  useEffect(() => {
    const response = getIssues(tableOption);
    return () => {
      response.abort();
    };
  }, [getIssues, tableOption]);

  return (
    <>
      <MyIssuesFilter onChange={onFilter} />
      <Box sx={{ height: 40 }} />
      <MyIssuesTable
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

MyIssuesPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default MyIssuesPage;
