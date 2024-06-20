// Helper
import { UseFormReturn } from 'react-hook-form';

// Local Components
import CustomInput from '@/app/_common/base/CustomInput';
import { IProfileRequest } from '@/app/_common/types/profile.type';

interface IProfileDataFormContentProps extends Omit<UseFormReturn<IProfileRequest>, 'handleSubmit' | 'resetField'> {
  disabled?: boolean;
}

const validation = {
  firstName: { required: true },
  lastName: { required: true },
  email: { required: true },
};

const ProfileDataFormContent = ({ formState, register, disabled }: IProfileDataFormContentProps) => {
  return (
    <>
      <CustomInput
        fieldname="First Name"
        error={formState?.errors.firstName}
        TextFieldProps={{
          placeholder: 'Enter your first name',
          type: 'text',
          disabled,
          ...register('firstName', { ...validation?.firstName }),
        }}
      />
      <CustomInput
        fieldname="Last Name"
        error={formState?.errors.lastName}
        TextFieldProps={{
          placeholder: 'Enter your last name',
          type: 'text',
          disabled,
          ...register('lastName', { ...validation?.lastName }),
        }}
      />
      <CustomInput
        fieldname="Email Address"
        error={formState?.errors.email}
        TextFieldProps={{
          placeholder: 'Enter email address',
          type: 'email',
          disabled,
          ...register('email', { ...validation?.email }),
        }}
      />
    </>
  );
};

export default ProfileDataFormContent;
