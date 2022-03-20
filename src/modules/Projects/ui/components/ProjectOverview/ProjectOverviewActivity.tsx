// MUI Components
import { Box, Typography } from '@mui/material';

// Local Component
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

export default function ProjectOverviewActivity() {
  return (
    <Box>
      <Typography sx={{ mb: 2, marginTop: '5px' }} fontSize={16}>
        Activities
      </Typography>
      <LogsUI logs={dummyLogs} notFullInfo />
    </Box>
  );
}
