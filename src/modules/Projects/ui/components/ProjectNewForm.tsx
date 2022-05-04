// React Hook Form
import { RegisterOptions, UseFormReturn } from 'react-hook-form';

// MUI Components
import { Box, TextField } from '@mui/material';

// Local Components
import { CustomInputs } from '@/common/components/base';
import { FormEvent } from 'react';

export type ProjectNewFormField = {
  projectName: string;
  description: string;
};

export type ProjectNewFormValidation = {
  projectName: RegisterOptions;
  description: RegisterOptions;
};

export interface ProjectNewFormProps {
  formMethods: UseFormReturn<ProjectNewFormField>;
  formOptions: ProjectNewFormValidation;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
}

export default function ProjectNewForm({ formMethods, formOptions, onSubmit, disabled }: ProjectNewFormProps) {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
      <CustomInputs
        Component={TextField}
        name="Project Name"
        error={errors.projectName}
        componentProps={{
          ...register('projectName', { ...formOptions.projectName }),
          margin: 'normal',
          fullWidth: true,
          placeholder: 'Enter Project Name',
          name: 'projectName',
          id: 'projectName',
          disabled,
        }}
      />
      <CustomInputs
        Component={TextField}
        name="Description"
        error={errors.description}
        componentProps={{
          ...register('description', { ...formOptions.description }),
          margin: 'normal',
          fullWidth: true,
          placeholder: 'Enter Description',
          name: 'description',
          id: 'description',
          disabled,
        }}
      />
    </Box>
  );
}
