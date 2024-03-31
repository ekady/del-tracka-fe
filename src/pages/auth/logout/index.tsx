// React
import { ReactElement } from 'react';

// Utils
import { logout } from '@/features/auth/store/auth.api.slice';
import { wrapper } from '@/common/store';

// Components
import { LayoutPlain } from '@/common/layout';
import AuthLogoutPage from '@/features/auth/views/AuthLogoutPage';

const LogoutPage = () => <AuthLogoutPage />;

LogoutPage.getLayout = (page: ReactElement) => {
  return <LayoutPlain>{page}</LayoutPlain>;
};

export const getServerSideProps = wrapper.getServerSideProps(({ dispatch }) => async () => {
  await dispatch(logout.initiate());
  return {
    props: {
      title: '',
    },
  };
});

export default LogoutPage;
