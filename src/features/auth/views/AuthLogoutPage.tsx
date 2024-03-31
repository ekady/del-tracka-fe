// React
import { useCallback, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Next Auth
import { signOut } from 'next-auth/react';

// Components
import PageLoader from '@/common/base/PageLoader';

const AuthLogoutPage = () => {
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

export default AuthLogoutPage;
