// React
import { useCallback, useState } from 'react';

//MUI Components
import { Box, Button, Typography } from '@mui/material';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// MUI Colors
import { grey } from '@mui/material/colors';

// Local Components
import { ProjectDialogNew, ProjectList } from '.';
import { BaseDialogAlert } from '@/common/base';

import { IProjectRequest, IProjectResponse } from '../types';
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import { useCreateProjectMutation } from '../store/project.api.slice';

const messageSuccess = 'Project created successfully';

export interface ProjectsProps {
  projectList?: IProjectResponse[];
}

const ProjectSide = ({ projectList }: ProjectsProps) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const { dialogAlertOpt, openDialogSuccess, closeDialogAlert } = useDialogAlert();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const toggleDialog = useCallback(() => {
    setOpenDialog(!openDialog);
  }, [openDialog]);

  const successDialog = useCallback(
    async (data: IProjectRequest) => {
      const response = await createProject(data);
      if ('data' in response && response.data.data) {
        openDialogSuccess('Success', messageSuccess);
        toggleDialog();
      }
    },
    [createProject, openDialogSuccess, toggleDialog],
  );

  if (!projectList || !projectList.length) {
    return (
      <Box sx={{ textAlign: 'center', px: 2 }}>
        <Typography color={grey[600]}>No Project</Typography>
        <Box sx={{ height: 25 }} />
        <Button fullWidth variant="contained" color="primary" startIcon={<AddCircleOutlined />} onClick={toggleDialog}>
          Add Project
        </Button>
        <ProjectDialogNew isOpen={openDialog} handleCancel={toggleDialog} handleOk={successDialog} />
      </Box>
    );
  }
  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Button fullWidth color="primary" variant="contained" onClick={toggleDialog}>
          <AddCircleOutlined sx={{ mr: 1 }} /> Add New Project
        </Button>
        <ProjectDialogNew
          isOpen={openDialog}
          handleCancel={toggleDialog}
          handleOk={successDialog}
          loading={isLoading}
        />
      </Box>
      <ProjectList projectList={projectList} />
      <BaseDialogAlert handleCancel={closeDialogAlert} handleOk={closeDialogAlert} {...dialogAlertOpt} />
    </Box>
  );
};

export default ProjectSide;
