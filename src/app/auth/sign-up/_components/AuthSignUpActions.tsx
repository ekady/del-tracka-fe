import Link from 'next/link';

import { Button, Divider } from '@mui/material';

import AuthWithGoogle from '@/app/auth/_components/AuthWithGoogle';

interface IAuthSignUpActions {
  loading?: boolean;
}

const AuthSignUpActions = ({ loading }: IAuthSignUpActions) => {
  return (
    <>
      <AuthWithGoogle />
      <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
      <Button LinkComponent={Link} href="/auth/sign-in" fullWidth variant="outlined" sx={{ mb: 2 }} disabled={loading}>
        Sign In
      </Button>
    </>
  );
};

export default AuthSignUpActions;
