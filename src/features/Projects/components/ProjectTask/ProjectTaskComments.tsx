// React
import { BaseSyntheticEvent, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// React Hook Form
import { useForm } from 'react-hook-form';

// Toast
import { toast } from 'react-toastify';

// MUI Components
import { Box, Divider, TablePagination } from '@mui/material';

// Local Components
import { ButtonLoading, CustomInput } from '@/common/base';
import ProjectTaskComment from './ProjectTaskComment';

// Hooks
import { useCreateCommentMutation, useLazyGetCommentsQuery } from '@/features/projects/store/task.api.slice';
import { useAppDispatch } from '@/common/store';
import { useTableChange } from '@/common/hooks/useTableChange';

// Interfaces
import { IProjectCommentRequest } from '@/features/projects/interfaces';

import { invalidateTags } from '@/features/projects/store/project.api.slice';
import { table } from '@/common/constants';

const ProjectTaskComments = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['Comments']));
  }, [dispatch]);

  const { query } = useRouter();
  const { tableOption, onLimitPage } = useTableChange({ sortBy: 'createdAt|-1' });
  const idProject = query.project_id as string;
  const idSprint = query.sprint_id as string;
  const idTask = query.task_id as string;

  const [fetchComments, { data }] = useLazyGetCommentsQuery();
  useEffect(() => {
    if (idProject && idSprint && idTask) fetchComments({ ids: { idProject, idSprint, idTask }, params: tableOption });
  }, [dispatch, fetchComments, idProject, idSprint, idTask, tableOption]);

  const [createComment, { isLoading }] = useCreateCommentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProjectCommentRequest>({ mode: 'onSubmit' });

  const validation = {
    comment: {
      required: true,
    },
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createComment({ body: data, id: { idProject, idSprint, idTask } });
      if ('data' in response && response.data) {
        toast.success('Comment created successfully');
        reset({ comment: '' });
        onLimitPage('page', 1);
      }
    } catch (_) {
      //
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
            disabled: isLoading,
            ...register('comment', { ...validation.comment }),
          }}
        />
        <ButtonLoading variant="contained" color="primary" type="submit" loading={isLoading}>
          Add
        </ButtonLoading>
      </Box>
      <Divider sx={{ mt: 3, mb: 2 }} />
      {data?.data.data.map((comment) => (
        <Box key={comment._id}>
          <ProjectTaskComment
            comment={comment.comment}
            name={`${comment.user.firstName} ${comment.user.lastName}`}
            image={comment.user.picture ?? null}
            date={new Date(comment.createdAt).toLocaleString()}
          />
          <Box height={35} />
        </Box>
      ))}
      {!!data?.data?.data?.length && (
        <TablePagination
          rowsPerPageOptions={table.limitOptions}
          component="div"
          labelRowsPerPage="Comments per page"
          count={data?.data.pagination.total}
          page={data?.data.pagination.page > 0 ? data.data.pagination.page - 1 : 0}
          rowsPerPage={data?.data.pagination.limit}
          onPageChange={(_, page) => onLimitPage('page', page + 1)}
          onRowsPerPageChange={(e) => onLimitPage('limit', Number(e.target.value))}
        />
      )}
    </>
  );
};

export default ProjectTaskComments;
