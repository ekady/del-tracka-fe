import Link from 'next/link';

import { LoadingButton } from '@mui/lab';
import { Button, Divider } from '@mui/material';

const AuthForgotPasswordActions = ({ loading }: { loading: boolean }) => {
  return (
    <>
      <LoadingButton type="submit" fullWidth variant="contained" sx={{ my: 2 }} loading={loading}>
        Send
      </LoadingButton>
      <Divider orientation="horizontal" flexItem sx={{ my: 3 }} />
      <Button LinkComponent={Link} href="/auth/sign-in" fullWidth variant="outlined" sx={{ mb: 2 }} disabled={loading}>
        Back to Sign In
      </Button>
    </>
  );
};

export default AuthForgotPasswordActions;
