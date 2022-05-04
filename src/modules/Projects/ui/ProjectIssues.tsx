// MUI Components
import { Box, Typography } from '@mui/material';

// Local Components
import { ProjectIssueFilter, ProjectIssueTable } from './components';

export interface ProjectIssuesProps {
  sprint: string | number;
}

export default function ProjectIssues({ sprint }: ProjectIssuesProps) {
  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          Health Care 1
        </Typography>
        <Typography>{sprint}</Typography>
      </Box>
      <Box height={25} />
      <Box>
        <ProjectIssueFilter />
        <Box sx={{ height: 40 }} />
        <ProjectIssueTable />
      </Box>
    </>
  );
}
