'use client';

import { BaseSyntheticEvent, useCallback, useState } from 'react';

import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import BaseDialog from '@/app/_common/base/BaseDialog';
import { TFunctionVoid } from '@/app/_common/types';
import {
  actionCreateEditSprint,
  revalidateSprintListTag,
  revalidateSprintTag,
  revalidatProjectActivityTag,
} from '@/app/app/projects/[id]/_actions/projectId.action';
import { ISprint } from '@/app/app/projects/_interfaces';

import SprintCreateEditFormContent from './SprintCreateEditFormContent';

export interface ISprintDialogCreateEditFormProps {
  projectId: string;
  sprintId?: string;
  title?: string;
  onClose?: TFunctionVoid;
  isEdit?: boolean;
  isOpen?: boolean;
  defaultValues?: Partial<ISprint>;
}

const messageCreateSuccess = 'Sprint created successfully';
const messageEditSuccess = 'Sprint edited successfully';

const SprintDialogCreateEditForm = ({
  projectId,
  sprintId,
  title,
  isEdit,
  isOpen,
  onClose,
  defaultValues,
}: ISprintDialogCreateEditFormProps) => {
  const { handleSubmit, ...form } = useForm<Partial<ISprint>>({ mode: 'onSubmit', values: defaultValues });
  const [loading, setLoading] = useState(false);

  const handleClose = useCallback(() => {
    onClose?.();
    form.reset();
  }, [onClose, form]);

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const state = await actionCreateEditSprint(data, { projectId, sprintId });

      if (state.isSuccess) {
        toast.success(sprintId ? messageEditSuccess : messageCreateSuccess);
        revalidateSprintListTag(projectId);
        revalidatProjectActivityTag(projectId);
        handleClose?.();
      }

      if (state.isSuccess && sprintId) revalidateSprintTag(projectId, sprintId);

      if (state.isError) {
        toast.error(state.message);
      }
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  const propsBaseDialog = {
    titleDialog: `${isEdit || sprintId ? 'Edit' : 'Create'} ${title ?? 'Sprint'}`,
    isOpen: !!isOpen,
    handleCancel: handleClose,
    handleOk: handleFormSubmit,
    textOk: isEdit || sprintId ? 'Edit' : 'Add',
    showClose: true,
  };

  return (
    <BaseDialog {...propsBaseDialog} loading={loading}>
      <Box component="form" onSubmit={handleFormSubmit}>
        <SprintCreateEditFormContent {...form} loading={loading} />
      </Box>
    </BaseDialog>
  );
};

export default SprintDialogCreateEditForm;
