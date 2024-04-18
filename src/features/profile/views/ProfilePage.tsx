// React
import { useCallback } from 'react';

// Toast
import { toast } from 'react-toastify';

// Components
import Profile from '@/features/profile/components/Profile';

import { IProfileRequest, useUpdateProfileMutation } from '@/features/profile/store/profile.api.slice';
import { TFunctionVoidWithParams } from '@/common/types';

const ProfilePage = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const submitHander = useCallback(
    async (v: IProfileRequest) => {
      const response = await updateProfile(v);
      if ('data' in response) toast.success('Profile Updated!');
    },
    [updateProfile],
  );

  return (
    <Profile
      isFirstTime={false}
      submit={submitHander as TFunctionVoidWithParams<IProfileRequest>}
      isEditable={true}
      isLoading={isLoading}
    />
  );
};

export default ProfilePage;
