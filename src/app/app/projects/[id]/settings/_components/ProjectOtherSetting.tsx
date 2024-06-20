'use client';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import Warning from '@mui/icons-material/Warning';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';

import BaseDialogAlert from '@/app/_common/base/BaseDialogAlert';
import useDialogAlert from '@/app/_common/base/BaseDialogAlert/useDialogAlert';
import { TFunctionVoid } from '@/app/_common/types';
import { actionDeleteProject, revalidateProjectListTag } from '@/app/app/projects/_actions/project.action';

interface IProjectOtherSettingProps {
  id: string;
}

const ProjectOtherSetting = ({ id }: IProjectOtherSettingProps) => {
  const router = useRouter();
  const { dialogAlertOpt, closeDialogAlert, openDialogWarning } = useDialogAlert();
  const [loading, setLoading] = useState(false);

  const handleDeleteProject = useCallback(async () => {
    setLoading(true);
    try {
      const responseState = await actionDeleteProject(id);

      if (responseState.isSuccess) {
        revalidateProjectListTag();
        toast.success('Project has been deleted successfully!');
        router.replace('/app/projects');
      }

      if (responseState.isError) toast.error(responseState?.message?.toString());
    } finally {
      closeDialogAlert();
      setLoading(false);
    }
  }, [id, router, closeDialogAlert]);

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
      <BaseDialogAlert loading={loading} {...dialogAlertOpt} handleCancel={closeDialogAlert} />
    </>
  );
};

export default ProjectOtherSetting;
