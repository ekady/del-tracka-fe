import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { getSession } from 'next-auth/react';

import { wrapper } from '../store';
import { getProfile } from '../store/api.slice';

export const authWallWrapper = (getServerSidePropsFn: GetServerSideProps) =>
  wrapper.getServerSideProps(({ dispatch }) => async (context: GetServerSidePropsContext) => {
    const additionalProps = await getServerSidePropsFn(context);

    const session = await getSession({ req: context.req });
    if (!session?.user?.userToken)
      return {
        redirect: {
          permanent: false,
          destination: '/auth/sign-in',
        },
      };

    const profile = await dispatch(getProfile.initiate());
    if (!profile.data?.data)
      return {
        redirect: {
          permanent: false,
          destination: '/auth/logout',
        },
      };

    return additionalProps;
  });
