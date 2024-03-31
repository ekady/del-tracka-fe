// React
import { useCallback, useEffect } from 'react';

// Toast
import { toast } from 'react-toastify';

// Components
import Profile from '@/features/profile/components/Profile';

import { ProfileRequest, useUpdateProfileMutation } from '@/features/profile/store/profile.api.slice';
import { FunctionVoidWithParams } from '@/common/types';

const ProfilePage = () => {
  const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation();

  const submitHander = useCallback(
    async (v: ProfileRequest) => {
      await updateProfile(v);
    },
    [updateProfile],
  );

  useEffect(() => {
    if (isSuccess) toast.success('Profile Updated!');
    return () => {
      toast.dismiss();
    };
  }, [isSuccess]);

  return (
    <Profile
      isFirstTime={false}
      submit={submitHander as FunctionVoidWithParams<ProfileRequest>}
      isEditable={true}
      isLoading={isLoading}
    />
  );
};

export default ProfilePage;
