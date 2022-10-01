// Next
import Image from 'next/image';

import { signIn } from 'next-auth/react';

import { toast } from 'react-toastify';

import { Button } from '@mui/material';
import { IconGoogle } from '@/common/icons';
import { useCallback } from 'react';

export interface AuthWithGoogleProps {
  disabled?: boolean;
}

const AuthWithGoogle = ({ disabled }: AuthWithGoogleProps) => {
  const onGoogleLogin = useCallback(async () => {
    try {
      await signIn('google', { redirect: false });
    } catch (_) {
      toast.error('Invalid google account');
    }
  }, []);

  return (
    <Button
      onClick={onGoogleLogin}
      disabled={disabled}
      fullWidth
      variant="outlined"
      sx={{ textTransform: 'capitalize', borderColor: '#dbdbdb', color: 'black' }}
    >
      <Image src={IconGoogle} alt="logo" height={25} />
      Continue With Google
    </Button>
  );
};

export default AuthWithGoogle;
