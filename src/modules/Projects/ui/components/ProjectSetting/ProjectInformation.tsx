// React Hook Form
import { useForm } from 'react-hook-form';

// MUI Components
import { Box, Button } from '@mui/material';

// Local Components
import ProjectNewForm from '../ProjectNewForm';

// Types
import { ProjectNameType } from '@/modules/Projects/types';

const ProjectInformation = () => {
  const form = useForm<ProjectNameType>({ mode: 'all' });
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
};

export default ProjectInformation;
