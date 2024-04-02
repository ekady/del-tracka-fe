import { ICredential, IResponseError } from '@/common/types';
import { IContinueWithProviderRequest, ILoginRequest } from '@/features/auth/interfaces';
import axios, { AxiosError } from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import NextAuth, { CallbacksOptions } from 'next-auth';

// Providers
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const requestSignIn = async (request?: ILoginRequest | IContinueWithProviderRequest) => {
  if (request && 'jwtToken' in request) {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL_V1}/authentication/with-provider`, request);
  }
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL_V1}/authentication/sign-in`, request);
};

const requestRefreshToken = async (refreshToken: string) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL_V1}/authentication/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  );
};

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID + '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET + '',
    idToken: true,
    profile: async ({ email, email_verified }, { id_token }) => {
      const response = await requestSignIn({ jwtToken: id_token ?? '' });
      const user = response.data;

      if (user && user.statusCode === 200) return { id: email, email, email_verified, ...user };
      return undefined;
    },
  }),
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: { label: 'Password', type: 'password' },
      jwtToken: { type: 'text' },
    },
    async authorize(credentials) {
      try {
        const res = await requestSignIn(credentials);
        const user = res.data;

        if (user && user.statusCode === 200) return user;
        return null;
      } catch (err) {
        const error = err as AxiosError<IResponseError>;
        const { errors } = error.response?.data ?? {};
        const errorType = errors?.[0].errorType ?? 'CredentialsError';
        throw new Error(errorType);
      }
    },
  }),
];

const callbacks: Partial<CallbacksOptions> = {
  async redirect({ url, baseUrl }) {
    const dashboard = `${baseUrl}/app/dashboard`;
    if (!url.includes('callbackUrl')) return dashboard;
    else if (url.includes('callbackUrl')) return new URL(url).searchParams.get('callbackUrl') ?? dashboard;
    return baseUrl;
  },
  async signIn({ user }) {
    return !!user && user.statusCode === 200;
  },
  async jwt({ token, user, account }) {
    if (account && user && user.statusCode === 200) token.userToken = user.data;

    if (token?.userToken) {
      const tokenData = token.userToken as ICredential;
      const decodedAccessToken = jwtDecode<JwtPayload>(tokenData?.accessToken ?? '');
      const isAccessTokenExpire = Date.now() > (decodedAccessToken.exp ?? 0) * 1000;

      if (isAccessTokenExpire) {
        const refreshResponse = await requestRefreshToken(tokenData?.refreshToken ?? '');
        const refreshTokenData = refreshResponse.data;
        if (refreshTokenData && refreshTokenData.statusCode === 200) token.userToken = refreshTokenData.data;
        else token.userToken = null;
      }
    }

    return token;
  },
  async session({ session, token }) {
    session.accessToken = token.accessToken as string;
    session.user.userToken = token.userToken as ICredential;
    return session;
  },
};

export const authOptions = {
  providers,
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/sign-up',
    error: '/auth/error',
  },
  callbacks,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
