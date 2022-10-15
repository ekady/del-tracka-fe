// React Hook Form
import { Controller, RegisterOptions, UseFormReturn } from 'react-hook-form';

// MUI Components
import { Box } from '@mui/material';

// Local Components
import { CustomInput } from '@/common/base';
import { FormEvent } from 'react';

// Types
import { IProjectRequest } from '../types';
import { FunctionVoidWithParams } from '@/common/types';

export type ProjectNewFormValidation = {
  [key in keyof IProjectRequest]: RegisterOptions;
};

export interface ProjectNewFormProps {
  formMethods: UseFormReturn<IProjectRequest>;
  formOptions: ProjectNewFormValidation;
  onSubmit?: FunctionVoidWithParams<FormEvent<HTMLFormElement>>;
  disabled?: boolean;
}

const ProjectNewForm = ({ formMethods, formOptions, onSubmit, disabled }: ProjectNewFormProps) => {
  const {
    control,
    formState: { errors },
  } = formMethods;

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        rules={formOptions.name}
        render={({ field }) => (
          <CustomInput
            fieldname="Project Name"
            error={errors.name}
            TextFieldProps={{ placeholder: 'Enter Project Name', disabled, ...field }}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue=""
        rules={formOptions.description}
        render={({ field }) => (
          <CustomInput
            fieldname="Description"
            error={errors.description}
            TextFieldProps={{ placeholder: 'Enter Description', disabled, ...field }}
          />
        )}
      />
    </Box>
  );
};

export default ProjectNewForm;
