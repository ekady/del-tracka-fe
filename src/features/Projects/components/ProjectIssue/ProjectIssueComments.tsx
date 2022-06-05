// React
import { useEffect } from 'react';

// React Hook Form
import { useForm } from 'react-hook-form';

// MUI Components
import { Box, Button, Divider } from '@mui/material';

// Local Components
import { CustomInput } from '@/common/base';
import ProjectIssueComment from './ProjectIssueComment';

export type CommentType = {
  comment: string;
};

const ProjectIssueComments = () => {
  const data = {
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id risus lacus. In eget sem a mauris ultricies elementum. Curabitur iaculis, ipsum sed ultrices molestie, mauris dui imperdiet erat, non venenatis ante ante vitae magna. Sed viverra neque ante, rutrum dapibus tortor bibendum nec. Etiam eu lorem faucibus, volutpat arcu placerat, egestas nisi. Nunc sit amet urna in magna lacinia laoreet ac a massa. Cras ac felis vitae est placerat elementum in sed lectus. Aliquam at arcu lorem. Vestibulum nisl nisl, ullamcorper nec ullamcorper nec, finibus imperdiet lacus. Phasellus quam nisi, porttitor ac vestibulum eget, euismod a orci. ',
    name: 'Diyos Chixi',
    date: '2022-02-01 12:12',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<CommentType>({ mode: 'onSubmit' });

  const validation = {
    comment: {
      required: true,
    },
  };

  const onSubmit = handleSubmit((data) => console.log(data));

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ comment: '' });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <CustomInput
        fieldname="Comment"
        error={errors.comment}
        TextFieldProps={{ placeholder: 'Enter Comment', ...register('comment', { ...validation.comment }) }}
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Add
      </Button>
      <Divider sx={{ mt: 3, mb: 2 }} />
      {[1, 2, 3, 4].map((_, index) => (
        <Box key={index}>
          <ProjectIssueComment {...data} />
          {index !== 3 && <Box height={35} />}
        </Box>
      ))}
    </>
  );
};

export default ProjectIssueComments;
