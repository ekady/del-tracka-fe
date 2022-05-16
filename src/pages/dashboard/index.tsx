// React
import { ReactElement, useEffect } from 'react';

// Store
import { useDispatch } from 'react-redux';
import { DashboardState, getData } from '@/features/Dashboard/redux/dashboard.slice';

// Components
import { Box } from '@mui/material';

import { LayoutDefault } from '@/common/layout';
import { DashboardActivities, DashboardIssues, DashboardTotal } from '@/features/Dashboard/components';

const dataExample: DashboardState = {
  status: 'finished',
  totalProjects: 12,
  totalIssues: 67,
  allIssues: [12, 5, 21],
  allAssignTo: [2, 5, 5],
  activities: [1, 3, 3, 4, 5, 6, 7],
  activitiesLabel: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
};

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData(dataExample));
  }, []);
  return (
    <>
      <DashboardTotal />
      <Box sx={{ height: 30 }} />
      <DashboardIssues />
      <Box sx={{ height: 30 }} />
      <DashboardActivities />
    </>
  );
};

DashboardPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default DashboardPage;
