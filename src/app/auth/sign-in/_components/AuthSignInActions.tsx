import Link from 'next/link';

import { Button, Divider } from '@mui/material';

import AuthWithGoogle from '@/app/auth/_components/AuthWithGoogle';

interface IAuthSignInActions {
  loading?: boolean;
}

const AuthSignInActions = ({ loading }: IAuthSignInActions) => {
  return (
    <>
      <AuthWithGoogle disabled={loading} />

      <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />

      <Button LinkComponent={Link} href="/auth/sign-up" fullWidth variant="outlined" sx={{ mb: 2 }} disabled={loading}>
        Sign Up
      </Button>
    </>
  );
};

export default AuthSignInActions;
