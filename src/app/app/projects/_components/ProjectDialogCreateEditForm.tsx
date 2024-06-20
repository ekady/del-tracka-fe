'use client';

import { BaseSyntheticEvent, useCallback, useState } from 'react';

import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import BaseDialog from '@/app/_common/base/BaseDialog';
import { TFunctionVoid } from '@/app/_common/types';

import ProjectCreateEditFormContent from './ProjectCreateEditFormContent';
import { actionCreateEditProject, revalidateProjectListTag, revalidateProjectTag } from '../_actions/project.action';
import { IProjectRequest } from '../_interfaces';

export interface IProjectDialogCreateEditFormProps {
  title?: string;
  onClose?: TFunctionVoid;
  isEdit?: boolean;
  isOpen?: boolean;
  defaultValues?: IProjectRequest;
  id?: string;
}

const messageCreateSuccess = 'Project created successfully';
const messageEditSuccess = 'Project edited successfully';

const ProjectDialogCreateEditForm = ({
  title,
  isEdit,
  isOpen,
  onClose,
  defaultValues,
  id,
}: IProjectDialogCreateEditFormProps) => {
  const { handleSubmit, ...form } = useForm<IProjectRequest>({ mode: 'onSubmit', values: defaultValues });
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
    form.reset();
  }, [onClose, form]);

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const state = await actionCreateEditProject(data, id);

      if (state.isSuccess) {
        toast.success(id ? messageEditSuccess : messageCreateSuccess);
        revalidateProjectListTag();
        handleClose?.();
      }

      if (state.isSuccess && id) revalidateProjectTag(id);

      if (state.isError) {
        toast.error(state.message);
      }
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  const propsBaseDialog = {
    titleDialog: `${isEdit || id ? 'Edit' : 'Create'} ${title ?? 'Project'}`,
    isOpen: !!isOpen,
    handleCancel: handleClose,
    handleOk: handleFormSubmit,
    textOk: isEdit || id ? 'Edit' : 'Add',
    showClose: true,
  };

  return (
    <BaseDialog {...propsBaseDialog} loading={loading}>
      <Box component="form" onSubmit={handleFormSubmit}>
        <ProjectCreateEditFormContent {...form} loading={loading} />
      </Box>
    </BaseDialog>
  );
};

export default ProjectDialogCreateEditForm;
