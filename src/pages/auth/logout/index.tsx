// React
import { ReactElement, useCallback, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Next Auth
import { signOut } from 'next-auth/react';

// Utils
import { logout } from '@/features/auth/store/auth.api.slice';

// Components
import { LayoutPlain } from '@/common/layout';
import { wrapper } from '@/common/store';

const PageLoader = dynamic(() => import('@/common/base/PageLoader'));

const LogoutPage = () => {
  const router = useRouter();
  const logoutFn = useCallback(async () => {
    await signOut({ redirect: false });
    router.replace('/auth/sign-in');
  }, [router]);

  useEffect(() => {
    logoutFn();
  }, [logoutFn]);

  return <PageLoader />;
};

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
