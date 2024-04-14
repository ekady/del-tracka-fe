// React
import { ReactElement } from 'react';

// Next
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';

// Next Auth
import { getServerSession } from 'next-auth';

// Components
import { LayoutPlain } from '../common/layout';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const PageLoader = dynamic(() => import('@/common/base/PageLoader'));

const EntryPoint = () => <PageLoader />;

EntryPoint.getLayout = (page: ReactElement) => {
  return <LayoutPlain>{page}</LayoutPlain>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session?.user.userToken) {
    return {
      redirect: {
        permanent: false,
        destination: '/app/dashboard',
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/home',
    },
  };
};

export default EntryPoint;
