// React
import { ReactElement, useEffect } from 'react';

// MUI Component
import { Box, Button } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import { Logs } from '@/features/Logs/components';

import { useGetLogActivitiesQuery, resetApiState } from '@/features/Logs/store/logs.api.slice';
import { useAppDispatch } from '@/common/store/store';
import { useTableChange } from '@/common/hooks/useTableChange';

const LogsPage = () => {
  const { onLimitPage, tableOption } = useTableChange();
  const dispatch = useAppDispatch();
  const { isLoading, isFetching, data } = useGetLogActivitiesQuery(tableOption);

  useEffect(() => {
    return () => {
      dispatch(resetApiState());
    };
  }, [dispatch]);

  return (
    <>
      <Box sx={{ mb: 5, justifyContent: 'end', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button variant="contained" color="secondary">
          Export to Excel
        </Button>
        <Button variant="contained" sx={{ background: '#27A03B', color: '#fff', ml: { xs: 0, sm: 1 }, mt: { xs: 1, sm: 0 } }}>
          Export to PDF
        </Button>
      </Box>
      <Logs
        TableProps={{
          rows: data?.content ?? [],
          rowCount: data?.totalContent ?? 0,
          loading: isFetching || isLoading,
          onPageSizeChange: (limit) => onLimitPage('limit', limit),
          onPageChange: (page) => onLimitPage('page', page),
        }}
      />
    </>
  );
};

LogsPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default LogsPage;
