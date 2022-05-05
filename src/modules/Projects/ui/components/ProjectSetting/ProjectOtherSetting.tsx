// MUI Components
import { Button, Typography } from '@mui/material';

// MUI Icons
import { Warning } from '@mui/icons-material';

export default function ProjectOtherSetting() {
  return (
    <Button variant="outlined" color="warning">
      <Warning sx={{ mr: 1 }} /> <Typography>Delete This Project</Typography>
    </Button>
  );
}
