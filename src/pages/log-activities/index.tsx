// React
import { ReactElement, useEffect } from 'react';

// MUI Component
import { Box, Button } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import { Logs } from '@/features/Logs/components';

import { useGetLogActivitiesQuery, resetApiState } from '@/features/Logs/store/logs.api';
import { useAppDispatch, useAppSelector } from '@/common/store/store';
import { selectLogsData } from '@/features/Logs/store/logs.selector';

const LogsPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useGetLogActivitiesQuery();
  const logs = useAppSelector(selectLogsData);

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
      <Logs logs={logs} TableProps={{ loading: isLoading }} />
    </>
  );
};

LogsPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default LogsPage;
