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
  const [getIssues, { isLoading, isFetching }] = useLazyGetMyIssuesQuery();
  const { onFilter, onSearch, onSort, tableOption } = useTableChange();

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
        TableProps={{ onSortModelChange: onSort, loading: isFetching || isLoading }}
        SearchProps={{ onChange: onSearch }}
      />
    </>
  );
};

MyIssuesPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default MyIssuesPage;
