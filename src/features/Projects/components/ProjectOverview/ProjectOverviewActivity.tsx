// MUI Components
import { Box, Typography } from '@mui/material';

// Local Component
import { Logs } from '@/features/logs/components';

import useProjectIdActivities from '../../hooks/useProjectIdActivities';

const ProjectOverviewActivity = () => {
  const { data, isLoading, isFetching } = useProjectIdActivities();
  return (
    <Box>
      <Typography sx={{ mb: 2, marginTop: '5px' }} fontSize={16}>
        Activities
      </Typography>
      <Logs notFullInfo TableProps={{ rows: data ?? [], loading: isLoading || isFetching }} />
    </Box>
  );
};

export default ProjectOverviewActivity;
