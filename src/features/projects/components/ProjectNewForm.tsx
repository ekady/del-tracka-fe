// React Hook Form
import { Controller, RegisterOptions, UseFormReturn } from 'react-hook-form';

// MUI Components
import Box from '@mui/material/Box';

// Local Components
import { CustomInput } from '@/common/base';
import { FormEvent } from 'react';

// Types
import { IProjectRequest } from '../interfaces';
import { TFunctionVoidWithParams } from '@/common/types';

export type TProjectNewFormValidation = {
  [key in keyof IProjectRequest]: RegisterOptions;
};

export interface IProjectNewFormProps {
  title?: string;
  formMethods: UseFormReturn<IProjectRequest>;
  formOptions: TProjectNewFormValidation;
  onSubmit?: TFunctionVoidWithParams<FormEvent<HTMLFormElement>>;
  disabled?: boolean;
  defaultValues?: IProjectRequest;
}

const ProjectNewForm = ({
  title,
  formMethods,
  formOptions,
  onSubmit,
  disabled,
  defaultValues,
}: IProjectNewFormProps) => {
  const {
    control,
    formState: { errors },
  } = formMethods;

  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
      <Controller
        name="name"
        control={control}
        defaultValue={defaultValues?.name ?? ''}
        rules={formOptions.name}
        render={({ field }) => (
          <CustomInput
            fieldname={`${title ?? 'Project'} Name`}
            error={errors.name}
            TextFieldProps={{ placeholder: `Enter ${title ?? 'Project'} Name`, disabled, ...field }}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        defaultValue={defaultValues?.description ?? ''}
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
