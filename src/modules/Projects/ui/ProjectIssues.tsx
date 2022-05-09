// MUI Components
import { Box, Typography } from '@mui/material';

// Local Components
import { ProjectIssueFilter, ProjectIssueTable } from './components';

// Types
import { SprintType } from '../types';

export type ProjectIssuesProps = SprintType;

const ProjectIssues = ({ name }: ProjectIssuesProps) => {
  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          Health Care 1
        </Typography>
        <Typography>{name}</Typography>
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

export default ProjectIssues;
