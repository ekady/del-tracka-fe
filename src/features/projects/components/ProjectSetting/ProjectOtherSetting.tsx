import { useCallback } from 'react';
import { useRouter } from 'next/router';

// MUI Components
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// MUI Icons
import Warning from '@mui/icons-material/Warning';

import { BaseDialogAlert } from '@/common/base';

import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import { useDeleteProjectMutation } from '@/features/projects/store/project.api.slice';

import { TFunctionVoid } from '@/common/types';

const ProjectOtherSetting = () => {
  const router = useRouter();
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();
  const { dialogAlertOpt, closeDialogAlert, openDialogWarning, openDialogSuccess } = useDialogAlert();

  const redirectToProject = useCallback(async () => {
    await router.replace('/app/projects');
  }, [router]) as TFunctionVoid;

  const openSuccess = useCallback(() => {
    openDialogSuccess('Success', 'Project has been deleted successfully!', {
      handleCancel: redirectToProject,
      handleOk: redirectToProject,
    });
  }, [openDialogSuccess, redirectToProject]);

  const handleDeleteProject = useCallback(async () => {
    try {
      await deleteProject(router.query.project_id as string);
      openSuccess();
    } catch (error) {
      //
    }
  }, [deleteProject, openSuccess, router.query.project_id]);

  const openWarning = useCallback(() => {
    openDialogWarning('Warning', 'Are you sure you want to delete this project?', {
      subDescription: 'This action cannot be undone.',
      handleOk: handleDeleteProject as TFunctionVoid,
    });
  }, [handleDeleteProject, openDialogWarning]);

  return (
    <>
      <Button variant="outlined" color="warning" onClick={openWarning}>
        <Warning sx={{ mr: 1 }} /> <Typography>Delete This Project</Typography>
      </Button>
      <BaseDialogAlert loading={isLoading} {...dialogAlertOpt} handleCancel={closeDialogAlert} />
    </>
  );
};

export default ProjectOtherSetting;
