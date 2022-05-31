// Helper
import { RegisterOptions, Controller } from 'react-hook-form';

// Local Components
import { CustomInput } from '@/common/base';

import { Profile } from '../store/profile.api.slice';
import { ProfileChildProps } from './Profile';

export type ProfileChangeDataValidation = {
  [key in keyof Profile]: RegisterOptions;
};

export type ProfileChangeDataProps = ProfileChildProps<ProfileChangeDataValidation>;

const ProfileChangeData = ({ formMethods, formOptions, disabled }: ProfileChangeDataProps) => {
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
};

export default ProfileChangeData;
