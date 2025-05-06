import { Metadata } from 'next';

import Box from '@mui/material/Box';

import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';

import DashboardActivities from './_components/DashboardActivities';
import DashboardTasks from './_components/DashboardTasks';
import DashboardTotal from './_components/DashboardTotal';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = () => (
  <>
    <TitleWithBreadcrumb title="Dashboard" breadcrumbs={[{ breadcrumb: 'Dashboard', href: '/app/dashboard' }]} />
    <DashboardTotal />
    <Box sx={{ height: 30 }} />
    <DashboardTasks />
    <Box sx={{ height: 30 }} />
    <DashboardActivities />
  </>
);

export default DashboardPage;
