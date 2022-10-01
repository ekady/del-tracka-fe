// React
import { ReactElement } from 'react';

// MUI Component
import { Box } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import LayoutProject from '@/features/projects/layout/LayoutProject';

const ProjectsPage = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      Your project content goes here
    </Box>
  );
};

ProjectsPage.getLayout = (page: ReactElement) => {
  return (
    <LayoutDefault>
      <LayoutProject hideMenu isMenu content={page} />
    </LayoutDefault>
  );
};

export default ProjectsPage;
