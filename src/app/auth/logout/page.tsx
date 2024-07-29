import { Metadata } from 'next';

import AuthLogout from './_components/AuthLogout';

export const metadata: Metadata = {
  title: 'Logout',
};

const AuthLogoutPage = () => {
  return <AuthLogout />;
};

export default AuthLogoutPage;
