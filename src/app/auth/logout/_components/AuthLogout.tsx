'use client';

// React
import { useCallback, useEffect } from 'react';

// Next
import { useRouter } from 'next/navigation';

import { signOut } from 'next-auth/react';

// Components
import { revalidateProfileTag } from '@/app/_common/actions/profile.action';
import PageLoader from '@/app/_common/base/PageLoader';
import clientFetcher from '@/app/_common/helper/clientFetcher.helper';

const AuthLogout = () => {
  const router = useRouter();

  const logoutFn = useCallback(async () => {
    await clientFetcher('/authentication/sign-out', { method: 'POST' });
    await signOut({ redirect: false });
    revalidateProfileTag();
    router.replace('/auth/sign-in');
  }, [router]);

  useEffect(() => {
    logoutFn();
  }, [logoutFn]);

  return <PageLoader />;
};

export default AuthLogout;
