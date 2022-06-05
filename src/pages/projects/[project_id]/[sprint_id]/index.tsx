// React
import type { ReactElement } from 'react';

// MUI
import { Box, Typography } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/Projects/layout/LayoutProject';
import { ProjectIssueFilter, ProjectIssueTable } from '@/features/Projects/components';

const ProjectSprintPage = () => {
  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          Health Care 1
        </Typography>
        <Typography>Sprint 1</Typography>
      </Box>
      <Box height={25} />
      <Box>
        <ProjectIssueFilter />
        <Box sx={{ height: 40 }} />
        <ProjectIssueTable />
      </Box>
    </>
  );
};

ProjectSprintPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectSprintPage;
