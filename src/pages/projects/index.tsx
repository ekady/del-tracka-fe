// React
import type { ReactElement } from 'react';

// MUI Components
import { Box } from '@mui/material';

// Helper
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// Components
import { LayoutDefault, LayoutDrawerAdditional } from '@/common/components/layout';
import ProjectsUI, { TypeProject } from '@/modules/Projects/ui/ProjectsUI';

const dummyProjectList: TypeProject[] = [
  { id: '1', name: 'Health Care', sprints: [{ id: 'sprint-1', name: 'Sprint 1' }] },
  {
    id: '2',
    name: 'Dums',
    sprints: [
      { id: 'sprint-1', name: 'Sprint 1' },
      { id: 'sprint-2', name: 'Sprint 2' },
    ],
  },
];

const EmptyContent = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    Your project content goes here
  </Box>
);

const ProjectsPage = () => {
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  if (lgAndUp) {
    return (
      <Box sx={{ position: 'relative', height: '100%' }}>
        <LayoutDrawerAdditional menuList={<ProjectsUI projectList={dummyProjectList} />} content={<EmptyContent />} />
      </Box>
    );
  }
  return <ProjectsUI projectList={dummyProjectList} />;
};

ProjectsPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default ProjectsPage;