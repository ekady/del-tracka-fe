// Helper
import { UseFormReturn, RegisterOptions } from 'react-hook-form';

// MUI Components
import { TextField } from '@mui/material';

// Local Components
import { CustomInputs } from '@/common/components/base';
import { ProfileData } from '../ProfileUI';

export type ProfileChangeDataField = {
  firstName: string;
  lastName: string;
};

export type ProfileChangeDataValidation = {
  firstName: RegisterOptions;
  lastName: RegisterOptions;
};

export interface ProfileChangeDataProps {
  formMethods: UseFormReturn<ProfileData>;
  formOptions: ProfileChangeDataValidation;
  disabled?: boolean;
}

export default function ProfileChangeData({ formMethods, formOptions, disabled }: ProfileChangeDataProps) {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <>
      <CustomInputs
        Component={TextField}
        name="First Name"
        error={errors.firstName}
        componentProps={{
          ...register('firstName', {
            ...formOptions.firstName,
          }),
          margin: 'normal',
          fullWidth: true,
          placeholder: !disabled ? 'Enter Your First Name' : '',
          id: 'firstName',
          name: 'firstName',
          disabled,
        }}
      />
      <CustomInputs
        Component={TextField}
        name="Last Name"
        error={errors.lastName}
        componentProps={{
          ...register('lastName', {
            ...formOptions.lastName,
          }),
          margin: 'normal',
          fullWidth: true,
          placeholder: !disabled ? 'Enter Your Last Name' : '',
          name: 'lastName',
          id: 'lastName',
          disabled,
        }}
      />
    </>
  );
}
