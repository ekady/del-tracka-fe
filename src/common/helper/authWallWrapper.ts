import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

import { getSession } from 'next-auth/react';

import { TAppStore, wrapper } from '../store';
import { getPermission, getProfile } from '../store/api.slice';

export type TGetServerSidePropsFunction = (
  context: GetServerSidePropsContext,
  store: TAppStore,
) => Promise<GetServerSidePropsResult<{ [key: string]: unknown }>>;

const redirectLogin = {
  redirect: {
    permanent: false,
    destination: '/auth/sign-in',
  },
};

const redirectLogout = {
  redirect: {
    permanent: false,
    destination: '/auth/logout',
  },
};

export const authWallWrapper = (getServerSidePropsFn: TGetServerSidePropsFunction) =>
  wrapper.getServerSideProps((store) => async (context: GetServerSidePropsContext) => {
    const additionalProps = await getServerSidePropsFn(context, store);

    const session = await getSession({ req: context.req });
    if (!session?.user?.userToken) return redirectLogin;

    const profile = await store.dispatch(getProfile.initiate());
    if (!profile.data?.data) return redirectLogout;

    const permission = await store.dispatch(getPermission.initiate());
    if (!permission.data) return redirectLogout;

    return additionalProps;
  });
