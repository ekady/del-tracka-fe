// Helper
import { UseFormReturn, RegisterOptions, Controller } from 'react-hook-form';

// Local Components
import { CustomInput } from '@/common/base';
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
    control,
    formState: { errors },
  } = formMethods;

  return (
    <>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        rules={formOptions.firstName}
        render={({ field }) => (
          <CustomInput
            fieldname="First Name"
            error={errors.firstName}
            TextFieldProps={{ placeholder: !disabled ? 'Enter Your First Name' : '', disabled, ...field }}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        defaultValue=""
        rules={formOptions.lastName}
        render={({ field }) => (
          <CustomInput
            fieldname="Last Name"
            error={errors.lastName}
            TextFieldProps={{ placeholder: !disabled ? 'Enter Your Last Name' : '', disabled, ...field }}
          />
        )}
      />
    </>
  );
}
