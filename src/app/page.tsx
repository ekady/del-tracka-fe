import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/_common/utils/nextAuthOptions';

const EntryPoint = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user.userToken) {
    redirect('/app/dashboard');
  }

  redirect('/home');
};

export default EntryPoint;
