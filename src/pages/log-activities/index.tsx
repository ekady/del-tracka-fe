// React
import type { ReactElement } from 'react';

// MUI Component
import { Box, Button } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/components/layout';
import LogsUI, { Logs } from '@/modules/Logs/ui/LogsUI';

const dummyLogs: Logs[] = [
  {
    id: '1',
    projectName: 'Health',
    date: '2021-02-09',
    cardNumber: 'Card#12',
    feature: 'Course',
    activity: 'Mess move A to Review Waiting',
  },
  {
    id: '2',
    projectName: 'Health',
    date: '2021-02-09',
    cardNumber: 'Card#12',
    feature: 'Course',
    activity: 'Mess move A to Review Waiting',
  },
  {
    id: '3',
    projectName: 'Health',
    date: '2021-02-09',
    cardNumber: 'Card#12',
    feature: 'Course',
    activity: 'Mess move A to Review Waiting',
  },
  {
    id: '4',
    projectName: 'Health',
    date: '2021-02-09',
    cardNumber: 'Card#12',
    feature: 'Course',
    activity: 'Mess move A to Review Waiting',
  },
];

const LogsPage = () => {
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
      <LogsUI logs={dummyLogs} />
    </>
  );
};

LogsPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default LogsPage;
