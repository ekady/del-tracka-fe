import { RegisterOptions, UseFormReturn } from 'react-hook-form';

import CustomInput from '@/app/_common/base/CustomInput';

import { ISprint } from '../../_interfaces';

export type TSprintCreateEditFormContentValidation = {
  [key in keyof ISprint]: RegisterOptions;
};

export interface ISprintCreateEditFormContentProps extends Omit<UseFormReturn<Partial<ISprint>>, 'handleSubmit'> {
  loading?: boolean;
}

const validationRule = {
  name: { required: true },
  description: { required: true },
};

const SprintCreateEditFormContent = ({ loading, register, formState }: ISprintCreateEditFormContentProps) => {
  return (
    <>
      <CustomInput
        fieldname="Sprint Name"
        error={formState.errors.name}
        TextFieldProps={{
          placeholder: 'Enter Sprint Name',
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

export default SprintCreateEditFormContent;
