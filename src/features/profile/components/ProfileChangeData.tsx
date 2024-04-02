// Helper
import { RegisterOptions, Controller } from 'react-hook-form';

// Local Components
import { CustomInput } from '@/common/base';

import { IProfile } from '../store/profile.api.slice';
import { IProfileChildProps } from './Profile';

export type TProfileChangeDataValidation = {
  [key in keyof IProfile]: RegisterOptions;
};

export type TProfileChangeDataProps = IProfileChildProps<TProfileChangeDataValidation>;

const ProfileChangeData = ({ formMethods, formOptions, disabled }: TProfileChangeDataProps) => {
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
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={formOptions.email}
        render={({ field }) => (
          <CustomInput
            fieldname="Email"
            error={errors.email}
            TextFieldProps={{ placeholder: !disabled ? 'Enter Your Email' : '', disabled, ...field }}
          />
        )}
      />
    </>
  );
};

export default ProfileChangeData;
