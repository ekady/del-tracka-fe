import { useEffect } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Local Component
import { Logs } from '@/features/logs/components';

import useProjectIdActivities from '@/features/projects/hooks/useProjectIdActivities';
import { useAppDispatch } from '@/common/store';
import { invalidateTags } from '@/features/projects/store/project.api.slice';

const ProjectOverviewActivity = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['ProjectActivities']));
  }, [dispatch]);

  const { data, isLoading, isFetching } = useProjectIdActivities();
  return (
    <Box>
      <Typography sx={{ mb: 2, marginTop: '5px' }} fontSize={16}>
        Activities
      </Typography>
      <Logs
        TableProps={{
          rows: data?.data?.data ?? [],
          loading: isLoading || isFetching,
          getRowId: (row) => row.createdAt,
        }}
      />
    </Box>
  );
};

export default ProjectOverviewActivity;
