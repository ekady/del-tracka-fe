import { useCallback } from 'react';
import { signOut } from 'next-auth/react';

import { useLogoutMutation } from '@/features/auth/store/auth.api.slice';

export const useLogout = (disabledLogoutMutation?: boolean) => {
  const [logout] = useLogoutMutation();

  const onLogout = useCallback(async () => {
    if (!disabledLogoutMutation) await logout().unwrap();
    signOut();
  }, [logout, disabledLogoutMutation]);

  return onLogout;
};
