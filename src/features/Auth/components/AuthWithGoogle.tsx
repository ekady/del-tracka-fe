// Local Components
import { ButtonLoading } from '@/common/base';

export type AuthWithGoogleProps = {
  isSignIn: boolean;
};

const AuthWithGoogle = ({ isSignIn }: AuthWithGoogleProps) => {
  return <ButtonLoading>{isSignIn ? 'Login' : 'Sign Up'} With Google</ButtonLoading>;
};

export default AuthWithGoogle;
