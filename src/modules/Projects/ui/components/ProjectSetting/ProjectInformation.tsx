// React Hook Form
import { useForm } from 'react-hook-form';

// MUI Components
import { Box, Button } from '@mui/material';

// Local Components
import { ProjectName } from '../ProjectDialogNew';
import ProjectNewForm from '../ProjectNewForm';

export default function ProjectInformation() {
  const form = useForm<ProjectName>({ mode: 'all' });
  const {
    handleSubmit,
    formState: { errors },
    trigger,
  } = form;

  const validation = {
    projectName: {
      required: true,
    },
    description: {
      required: true,
    },
  };

  const onSubmit = handleSubmit(async (data) => {
    await trigger();
    if (errors.projectName?.type) return;

    console.log(data);
  });
  return (
    <>
      <ProjectNewForm formOptions={validation} formMethods={form} onSubmit={onSubmit} />
      <Box height={30} />
      <Button variant="contained" onClick={onSubmit}>
        Save
      </Button>
    </>
  );
}
