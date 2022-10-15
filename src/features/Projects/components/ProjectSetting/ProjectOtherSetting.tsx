import { useRouter } from 'next/router';
// MUI Components
import { Button, Typography } from '@mui/material';

// MUI Icons
import { Warning } from '@mui/icons-material';

import { BaseDialogAlert } from '@/common/base';

import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import { useDeleteProjectMutation } from '../../store/project.api.slice';

const ProjectOtherSetting = () => {
  const router = useRouter();
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();
  const { dialogAlertOpt, closeDialogAlert, openDialogWarning, openDialogSuccess } = useDialogAlert();

  const openWarning = () => {
    openDialogWarning('Warning', 'Are you sure you want to delete this project?', {
      subDescription: 'This action cannot be undone.',
    });
  };

  const openSuccess = () => {
    openDialogSuccess('Success', 'Project has been deleted successfully!', {
      handleCancel: () => router.replace('/app/projects'),
      handleOk: () => router.replace('/app/projects'),
    });
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(router.query.project_id as string);
      openSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="outlined" color="warning" onClick={openWarning}>
        <Warning sx={{ mr: 1 }} /> <Typography>Delete This Project</Typography>
      </Button>
      <BaseDialogAlert
        handleCancel={closeDialogAlert}
        handleOk={handleDeleteProject}
        loading={isLoading}
        {...dialogAlertOpt}
      />
    </>
  );
};

export default ProjectOtherSetting;
