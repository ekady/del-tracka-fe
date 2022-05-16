// MUI Components
import { Box } from '@mui/material';

// Local Components
import { MyIssuesFilter, MyIssuesTable } from './components';

const MyIssuesUI = () => {
  return (
    <>
      <MyIssuesFilter />
      <Box sx={{ height: 40 }} />
      <MyIssuesTable />
    </>
  );
};

export default MyIssuesUI;
