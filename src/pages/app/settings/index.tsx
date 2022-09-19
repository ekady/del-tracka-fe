// React
import { ReactElement, useEffect } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import ProfileUI from '@/features/Profile/components/Profile';

import { ProfileRequest, useUpdateProfileMutation } from '@/features/Profile/store/profile.api.slice';
import { toast } from 'react-toastify';

const Settings = () => {
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();

  const submitHander = async (v: ProfileRequest) => {
    await updateProfile(v);
  };

  useEffect(() => {
    if (isSuccess) toast.success('Profile Updated!');
    return () => {
      toast.dismiss();
    };
  }, [isSuccess]);

  return <ProfileUI isFirstTime={false} submit={submitHander} isEditable={true} />;
};

Settings.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Settings;
