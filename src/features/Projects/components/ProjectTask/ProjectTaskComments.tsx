// React
import { useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// Toast
import { toast } from 'react-toastify';

// MUI Components
import { Box, Divider } from '@mui/material';

// Local Components
import { ButtonLoading, CustomInput } from '@/common/base';
import ProjectTaskComment from './ProjectTaskComment';

// Hooks
import { useCreateCommentMutation, useGetCommentsQuery } from '../../store/task.api.slice';

// Interfaces
import { IProjectCommentRequest } from '../../interfaces';
import { useAppDispatch } from '@/common/store';
import { invalidateTags } from '../../store/project.api.slice';

const ProjectTaskComments = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['Comments']));
  }, [dispatch]);

  const { query } = useRouter();
  const idProject = query.project_id as string;
  const idSprint = query.sprint_id as string;
  const idTask = query.task_id as string;

  const { data } = useGetCommentsQuery(idProject && idSprint && idTask ? { idProject, idSprint, idTask } : skipToken);
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
      }
    } catch (_) {
      //
    }
  });

  return (
    <>
      <CustomInput
        fieldname="Comment"
        error={errors.comment}
        TextFieldProps={{
          placeholder: 'Enter Comment',
          disabled: isLoading,
          ...register('comment', { ...validation.comment }),
        }}
      />
      <ButtonLoading variant="contained" color="primary" onClick={onSubmit} loading={isLoading}>
        Add
      </ButtonLoading>
      <Divider sx={{ mt: 3, mb: 2 }} />
      {data?.data.map((comment) => (
        <Box key={comment._id}>
          <ProjectTaskComment
            comment={comment.comment}
            name={`${comment.user.firstName} ${comment.user.lastName}`}
            date={new Date(comment.createdAt).toLocaleString()}
          />
          <Box height={35} />
        </Box>
      ))}
    </>
  );
};

export default ProjectTaskComments;
