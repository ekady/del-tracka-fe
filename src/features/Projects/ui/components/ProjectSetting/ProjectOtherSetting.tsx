// MUI Components
import { Button, Typography } from '@mui/material';

// MUI Icons
import { Warning } from '@mui/icons-material';

const ProjectOtherSetting = () => {
  return (
    <Button variant="outlined" color="warning">
      <Warning sx={{ mr: 1 }} /> <Typography>Delete This Project</Typography>
    </Button>
  );
};

export default ProjectOtherSetting;
