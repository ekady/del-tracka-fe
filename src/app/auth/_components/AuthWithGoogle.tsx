import { useCallback } from 'react';

import Image from 'next/image';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

import { IconGoogle } from '@/app/_common/icons';
import { TFunctionVoid } from '@/app/_common/types';

export interface IAuthWithGoogleProps {
  disabled?: boolean;
}

const AuthWithGoogle = ({ disabled }: IAuthWithGoogleProps) => {
  const onGoogleLogin = useCallback(async () => {
    try {
      await signIn('google', { redirect: false });
    } catch (_) {
      toast.error('Invalid google account');
    }
  }, []);

  const theme = useTheme();

  return (
    <Button
      onClick={onGoogleLogin as TFunctionVoid}
      disabled={disabled}
      fullWidth
      variant="outlined"
      sx={{ textTransform: 'capitalize', borderColor: '#dbdbdb', color: theme.palette.text.primary }}
    >
      <Image src={IconGoogle} alt="logo" height={25} />
      Continue With Google
    </Button>
  );
};

export default AuthWithGoogle;
