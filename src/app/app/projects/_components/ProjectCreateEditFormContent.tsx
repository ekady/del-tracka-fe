import { RegisterOptions, UseFormReturn } from 'react-hook-form';

import CustomInput from '@/app/_common/base/CustomInput';

import { IProjectRequest } from '../_interfaces';

export type TProjectCreateEditFormContentValidation = {
  [key in keyof IProjectRequest]: RegisterOptions;
};

interface IProjectCreateEditFormContentProps extends Omit<UseFormReturn<IProjectRequest>, 'handleSubmit'> {
  loading?: boolean;
}

const validationRule = {
  name: { required: true },
  description: { required: true },
};

const ProjectCreateEditFormContent = ({ loading, register, formState }: IProjectCreateEditFormContentProps) => {
  return (
    <>
      <CustomInput
        fieldname="Project Name"
        error={formState.errors.name}
        TextFieldProps={{
          placeholder: 'Enter Project Name',
          disabled: loading,
          ...register('name', { ...validationRule.name }),
        }}
      />
      <CustomInput
        fieldname="Description"
        error={formState.errors.description}
        TextFieldProps={{
          placeholder: 'Enter Description',
          disabled: loading,
          ...register('description', { ...validationRule.description }),
        }}
      />
    </>
  );
};

export default ProjectCreateEditFormContent;
