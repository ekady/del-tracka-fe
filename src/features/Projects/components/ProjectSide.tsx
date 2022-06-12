// React
import { useState } from 'react';

//MUI Components
import { Box, Button, Typography } from '@mui/material';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// MUI Colors
import { grey } from '@mui/material/colors';

// Local Components
import { ProjectDialogNew, ProjectList } from '.';
import { BaseDialogAlert } from '@/common/base';

import { ProjectResponse } from '../types';
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';

const messageSuccess = 'Project created successfully';

export type ProjectsProps = {
  projectList?: ProjectResponse[];
};

const ProjectSide = ({ projectList }: ProjectsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { dialogAlertOpt, openDialogSuccess, closeDialogAlert } = useDialogAlert();

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleCloseDialog = () => {
    setOpenDialog(!openDialog);
  };

  const successDialog = () => {
    openDialogSuccess('Success', messageSuccess);
    handleCloseDialog();
  };

  if (!projectList || !projectList.length) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography color={grey[600]}>No Project</Typography>
        <Box sx={{ height: 25 }} />
        <Button variant="contained" color="primary" startIcon={<AddCircleOutlined />} onClick={handleOpenDialog}>
          Add Project
        </Button>
        <ProjectDialogNew isOpen={openDialog} handleCancel={handleCloseDialog} handleOk={successDialog} />
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ mb: 2, px: 1, textAlign: 'center' }}>
        <Button color="primary" variant="contained" onClick={handleOpenDialog}>
          <AddCircleOutlined sx={{ mr: 1 }} /> Add New Project
        </Button>
        <ProjectDialogNew isOpen={openDialog} handleCancel={handleCloseDialog} handleOk={successDialog} />
      </Box>
      <ProjectList projectList={projectList} />
      <BaseDialogAlert handleCancel={closeDialogAlert} handleOk={closeDialogAlert} {...dialogAlertOpt} />
    </>
  );
};

export default ProjectSide;
