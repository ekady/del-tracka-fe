import { useCallback } from 'react';

import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

import { useLogoutMutation } from '@/features/auth/store/auth.api.slice';
import { resetState } from '@/features/auth/store/auth.slice';
import { useAppDispatch } from '../store';

export const useLogout = (disabledLogoutMutation?: boolean) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const onLogout = useCallback(async () => {
    if (!disabledLogoutMutation) await logout().unwrap();
    dispatch(resetState());
    signOut({ redirect: false });
    router.replace('/auth/sign-in');
  }, [dispatch, logout, router, disabledLogoutMutation]);

  return onLogout;
};
