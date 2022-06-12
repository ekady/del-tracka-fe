// React
import { ReactElement, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Components
import { LayoutPlain } from '@/common/layout';
import ProfileUI from '@/features/Profile/components/Profile';

import { ProfileRequest, useUpdateProfileMutation } from '@/features/Profile/store/profile.api.slice';
import { toast } from 'react-toastify';

const SetUpProfile = () => {
  const router = useRouter();
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();

  const submitHander = async (v: ProfileRequest) => {
    const response = await updateProfile(v);
    if (response) router.replace('/dashboard');
  };

  useEffect(() => {
    if (isSuccess) toast.success('Success! Please wait, redirecting...', { autoClose: false });
    return () => {
      toast.dismiss();
    };
  }, [isSuccess]);

  return <ProfileUI isFirstTime={true} submit={submitHander} isEditable={true} disabled={isSuccess} />;
};

SetUpProfile.getLayout = (page: ReactElement) => {
  return <LayoutPlain>{page}</LayoutPlain>;
};

export default SetUpProfile;
