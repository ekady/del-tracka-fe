import { Metadata } from 'next';

import { Grid, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

import TitleWithBreadcrumb from '@/app/_common/base/TitleWithBreadcrumb';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardLoading = () => (
  <>
    <TitleWithBreadcrumb title="Dashboard" breadcrumbs={[{ breadcrumb: 'Dashboard', href: '/app/dashboard' }]} />
    <Grid container spacing={3} columns={12}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Grid>
    </Grid>
    <Box sx={{ height: 30 }} />
    <Grid container spacing={3} columns={12}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Grid>
    </Grid>
    <Box sx={{ height: 30 }} />
    <Grid container spacing={3} columns={12}>
      <Grid size={{ xs: 12 }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Grid>
    </Grid>
  </>
);

export default DashboardLoading;
