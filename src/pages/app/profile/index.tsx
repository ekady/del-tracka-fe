// React
import { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

import { authWallWrapper } from '@/common/helper/authWallWrapper';

import { LayoutDefault } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const ProfilePage = dynamic(() => import('@/features/profile/views/ProfilePage'), {
  ssr: false,
  loading: () => <PageLoader />,
});

const Profile = () => <ProfilePage />;

Profile.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export const getServerSideProps = authWallWrapper(async () => {
  return {
    props: {
      title: 'Profile',
    },
  };
});

export default Profile;
