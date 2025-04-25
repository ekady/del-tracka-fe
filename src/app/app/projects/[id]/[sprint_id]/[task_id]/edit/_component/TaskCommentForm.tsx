'use client';

import { BaseSyntheticEvent, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import CustomInput from '@/app/_common/base/CustomInput';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { actionAddComment } from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_actions/commentTask.action';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';
import { ITaskCommentRequest } from '@/app/app/projects/_interfaces';

interface ITaskCommentForm {
  ids: IProjectSprintTaskId;
}

const validation = {
  comment: { required: true },
};

const TaskCommentForm = ({ ids }: ITaskCommentForm) => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { onPaginationChange } = useTableChange();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITaskCommentRequest>({ mode: 'onSubmit' });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await actionAddComment(ids, data);
      if (response.isSuccess) {
        toast.success('Comment added successfully');
        reset({ comment: '' });
        onPaginationChange({ page: 0, pageSize: Number(searchParams.get('limit') ?? '10') });
      }

      if (response.isError) {
        toast.error(response.message);
      }
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <CustomInput
          fieldname="Comment"
          error={errors.comment}
          TextFieldProps={{
            placeholder: 'Enter Comment',
            disabled: loading,
            ...register('comment', { ...validation.comment }),
          }}
        />
        <LoadingButton variant="contained" color="primary" type="submit" loading={loading}>
          Add
        </LoadingButton>
      </Box>
      <Divider sx={{ mt: 3, mb: 2 }} />
    </>
  );
};

export default TaskCommentForm;
