// MUI Components
import { Box } from '@mui/material';

// Local Components
import { MyIssuesFilter, MyIssuesTable } from './components';

export default function MyIssuesUI() {
  return (
    <>
      <MyIssuesFilter />
      <Box sx={{ height: 40 }} />
      <MyIssuesTable />
    </>
  );
}
