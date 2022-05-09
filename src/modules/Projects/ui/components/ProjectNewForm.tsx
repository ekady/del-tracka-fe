// React Hook Form
import { Controller, RegisterOptions, UseFormReturn } from 'react-hook-form';

// MUI Components
import { Box } from '@mui/material';

// Local Components
import { CustomInput } from '@/common/base';
import { FormEvent } from 'react';

// Types
import { ProjectNameType } from '../../types';
import { FunctionVoidWithParams } from '@/types';

export type ProjectNewFormValidation = {
  projectName: RegisterOptions;
  description: RegisterOptions;
};

export interface ProjectNewFormProps {
  formMethods: UseFormReturn<ProjectNameType>;
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
        name="projectName"
        control={control}
        defaultValue=""
        rules={formOptions.projectName}
        render={({ field }) => (
          <CustomInput
            fieldname="Project Name"
            error={errors.projectName}
            TextFieldProps={{ placeholder: !disabled ? 'Enter Project Name' : '', disabled, ...field }}
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
            TextFieldProps={{ placeholder: !disabled ? 'Enter Description' : '', disabled, ...field }}
          />
        )}
      />
    </Box>
  );
};

export default ProjectNewForm;
