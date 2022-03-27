// MUI Components
import { Box, Button, Typography } from '@mui/material';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Local Components
import { ProjectIssueFilter, ProjectIssueTable } from './components';

export interface ProjectIssuesProps {
  sprint: string | number;
}

export default function ProjectIssues({ sprint }: ProjectIssuesProps) {
  const handleAddIssue = () => {
    //
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>{sprint}</Typography>
        <Button variant="contained" color="primary" startIcon={<AddCircleOutlined />} onClick={handleAddIssue}>
          Add New Issue
        </Button>
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
