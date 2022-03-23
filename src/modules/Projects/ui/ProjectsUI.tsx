// React
import { useState } from 'react';

//MUI Components
import { Box, Button, Typography } from '@mui/material';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// MUI Colors
import { grey } from '@mui/material/colors';

// Local Components
import { ProjectDialogNew, ProjectList } from './components';
import { BaseDialogAlert } from '@/common/components/base';
import { BaseDialogAlertProps } from '@/common/components/base/BaseDialogAlert';

type TypeSprint = {
  id: string;
  name: string;
};

export type TypeProject = {
  id: string;
  name: string;
  sprints: TypeSprint[];
};

export interface ProjectsProps {
  projectList?: TypeProject[];
  handleAdd?: () => void;
}

export default function ProjectsUI({ projectList }: ProjectsProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dialogAlertOpt, setDialogAlertOpt] = useState<BaseDialogAlertProps>({
    isOpen: false,
    type: 'success',
    titleDialog: 'Success',
    description: 'New Project has been added',
    notUsingCancel: true,
  });

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleClose = () => {
    setOpenDialog(!openDialog);
    openDialogSuccess();
  };

  const handleDialogAlert = () => {
    setDialogAlertOpt({ ...dialogAlertOpt, isOpen: !dialogAlertOpt.isOpen });
  };

  const openDialogSuccess = (description?: string) => {
    setDialogAlertOpt({
      ...dialogAlertOpt,
      isOpen: true,
      type: 'success',
      titleDialog: 'Success',
      description: description || 'New Project has been added',
      subDescription: '',
      notUsingCancel: true,
    });
  };

  const handleDialogDelete = () => {
    setDialogAlertOpt({
      ...dialogAlertOpt,
      isOpen: true,
      type: 'delete',
      titleDialog: 'Delete Project',
      description: 'Are you sure want to delete this project?',
      subDescription: "This project isn't empty",
      notUsingCancel: false,
      handleOk: () => openDialogSuccess('Success delete this project'),
    });
  };

  if (!projectList || !projectList.length) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography color={grey[600]}>No Project</Typography>
        <Box sx={{ height: 25 }} />
        <Button variant="contained" color="primary" startIcon={<AddCircleOutlined />} onClick={handleOpenDialog}>
          Add Project
        </Button>
        <ProjectDialogNew isOpen={openDialog} handleCancel={handleClose} handleOk={handleClose} />
      </Box>
    );
  }
  return (
    <>
      <Box sx={{ mb: 2, px: 1, textAlign: 'center' }}>
        <Button color="primary" variant="contained" onClick={handleOpenDialog}>
          <AddCircleOutlined sx={{ mr: 1 }} /> Add New Project
        </Button>
        <ProjectDialogNew isOpen={openDialog} handleCancel={handleClose} handleOk={handleClose} />
      </Box>
      <ProjectList projectList={projectList} handleDelete={handleDialogDelete} handleEdit={handleOpenDialog} />
      <BaseDialogAlert handleCancel={handleDialogAlert} handleOk={handleDialogAlert} {...dialogAlertOpt} />
    </>
  );
}
