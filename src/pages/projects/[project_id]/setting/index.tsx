// React
import type { ReactElement } from 'react';

// Helper
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// Components
import { LayoutDefault, LayoutDrawerAdditional } from '@/common/layout';
import ProjectsUI from '@/features/Projects/ui/ProjectsUI';
import ProjectSetting from '@/features/Projects/ui/ProjectSetting';

// Types
import { ProjectType } from '@/features/Projects/types';

const dummyProjectList: ProjectType[] = [
  { id: '1', name: 'Health Care', description: '', sprints: [{ id: 'sprint-1', name: 'Sprint 1' }] },
  {
    id: '2',
    name: 'Dums',
    description: '',
    sprints: [
      { id: 'sprint-1', name: 'Sprint 1' },
      { id: 'sprint-2', name: 'Sprint 2' },
    ],
  },
];

const ProjectSprintPage = () => {
  const theme = useTheme();
  const lgAndUp = useMediaQuery(theme.breakpoints.up('lg'));

  if (lgAndUp) {
    return (
      <Box sx={{ position: 'relative', height: '100%' }}>
        <LayoutDrawerAdditional menuList={<ProjectsUI projectList={dummyProjectList} />} content={<ProjectSetting />} />
      </Box>
    );
  }
  return <ProjectSetting />;
};

ProjectSprintPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default ProjectSprintPage;
