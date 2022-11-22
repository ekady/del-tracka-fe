// React
import { useEffect } from 'react';

// React Hook Form
import { useForm } from 'react-hook-form';

// MUI Components
import { Box } from '@mui/material';

// Local Components
import ProjectNewForm from '../ProjectNewForm';
import { ButtonLoading } from '@/common/base';

// Types
import { IProjectRequest } from '@/features/projects/interfaces';

// Toast
import { toast } from 'react-toastify';

import { useUpdateProjectMutation } from '../../store/project.api.slice';
import useProjectId from '../../hooks/useProjectId';

const ProjectInformation = () => {
  const { data, projectId, isFetching } = useProjectId();
  const [updateProject, { isLoading }] = useUpdateProjectMutation();
  const form = useForm<IProjectRequest>({
    mode: 'all',
    defaultValues: { description: data?.data?.description ?? '', name: data?.data?.name ?? '' },
  });
  const {
    handleSubmit,
    formState: { errors },
    trigger,
    resetField,
  } = form;

  const validation = {
    name: { required: true },
    description: { required: false },
  };

  const onSubmit = handleSubmit(async (data) => {
    await trigger();
    if (errors.name?.type) return;

    try {
      await updateProject({ id: projectId, body: data });
      toast.success('Project updated successfully');
    } catch (_) {
      //
    }
  });

  useEffect(() => {
    if (!isFetching) {
      resetField('name', { defaultValue: data?.data?.name ?? '' });
      resetField('description', { defaultValue: data?.data?.description ?? '' });
    } else {
      resetField('name', { defaultValue: '' });
      resetField('description', { defaultValue: '' });
    }
  }, [data?.data?.description, data?.data?.name, isFetching, resetField]);

  return (
    <>
      <ProjectNewForm formOptions={validation} formMethods={form} onSubmit={onSubmit} disabled={isFetching} />
      <Box height={30} />
      <ButtonLoading loading={isLoading || isFetching} variant="contained" onClick={onSubmit}>
        Save
      </ButtonLoading>
    </>
  );
};

export default ProjectInformation;
