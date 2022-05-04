import { useForm } from 'react-hook-form';

// MUI Components
import { Box, Button, Divider, TextField } from '@mui/material';

// Local Components
import { CustomInputs } from '@/common/components/base';
import ProjectIssueComment from './ProjectIssueComment';
import { useEffect } from 'react';

export interface Comment {
  comment: string;
}

export default function ProjectIssueComments() {
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
  } = useForm<Comment>({ mode: 'onSubmit' });

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
      <Box>
        <CustomInputs
          Component={TextField}
          name="Add Comment"
          error={errors.comment}
          componentProps={{
            ...register('comment', { ...validation.comment }),
            margin: 'normal',
            fullWidth: true,
            placeholder: 'Enter comment',
            id: 'comment',
            name: 'comment',
            multiline: true,
            rows: 3,
          }}
        />
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Add
        </Button>
      </Box>
      <Divider sx={{ mt: 3, mb: 2 }} />
      {[1, 2, 3, 4].map((_, index) => (
        <Box key={index}>
          <ProjectIssueComment {...data} />
          {index !== 3 && <Box height={35} />}
        </Box>
      ))}
    </>
  );
}
