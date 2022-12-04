// React
import { ReactElement, useCallback, useEffect } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import Profile from '@/features/profile/components/Profile';

import { ProfileRequest, useUpdateProfileMutation } from '@/features/profile/store/profile.api.slice';
import { toast } from 'react-toastify';

const Settings = () => {
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();

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

  return <Profile isFirstTime={false} submit={submitHander} isEditable={true} />;
};

Settings.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Settings;
