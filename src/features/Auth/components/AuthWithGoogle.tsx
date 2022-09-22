// Local Components
import { ButtonLoading } from '@/common/base';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

export type AuthWithGoogleProps = {
  disabled?: boolean;
};

const AuthWithGoogle = ({ disabled }: AuthWithGoogleProps) => {
  const onGoogleLogin = async () => {
    try {
      await signIn('google', { redirect: false });
    } catch (_) {
      toast.error('Invalid google account');
    }
  };

  return (
    <ButtonLoading onClick={onGoogleLogin} disabled={disabled} fullWidth sx={{ textTransform: 'capitalize' }}>
      Continue With Google
    </ButtonLoading>
  );
};

export default AuthWithGoogle;
