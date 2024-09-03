'use client';

import { BaseSyntheticEvent, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  actionCreateEditProject,
  revalidateProjectListTag,
  revalidateProjectTag,
} from '@/app/app/projects/_actions/project.action';
import ProjectCreateEditFormContent from '@/app/app/projects/_components/ProjectCreateEditFormContent';
import { IProjectRequest } from '@/app/app/projects/_interfaces';

export interface IProjectInformationFormProps {
  id: string;
  defaultValues?: IProjectRequest;
}

const messageEditSuccess = 'Project edited successfully';

const ProjectInformationForm = ({ defaultValues, id }: IProjectInformationFormProps) => {
  const { handleSubmit, ...form } = useForm<IProjectRequest>({ mode: 'onSubmit', values: defaultValues });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const state = await actionCreateEditProject(data, id);

      if (state.isSuccess) {
        toast.success(messageEditSuccess);
        revalidateProjectListTag();
        revalidateProjectTag(id);
      }

      if (state.isError) {
        toast.error(state.message);
      }
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <ProjectCreateEditFormContent {...form} loading={loading} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          width: '100%',
          mt: 1,
          maxWidth: 200,
        }}
      >
        <Button onClick={() => form.reset()} variant="outlined" fullWidth disabled={loading}>
          Reset
        </Button>
        <LoadingButton type="submit" variant="contained" fullWidth loading={loading}>
          Save
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ProjectInformationForm;
