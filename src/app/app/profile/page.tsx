import { Metadata } from 'next';

import { actionFetchProfile } from '@/app/_common/actions/profile.action.utils';
import ProfileForm from '@/app/app/profile/_components/ProfileForm';

export const metadata: Metadata = {
  title: 'Profile',
};

const ProfilePage = async () => {
  const profile = await actionFetchProfile();
  return (
    <ProfileForm
      profile={{
        email: profile?.email ?? '',
        firstName: profile?.firstName ?? '',
        lastName: profile?.lastName ?? '',
        picture: profile?.picture,
      }}
    />
  );
};

export default ProfilePage;
