import { Credential } from '@/common/types';
import { ContinueWithProviderRequest, LoginRequest } from '@/features/Auth/interfaces';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { CallbacksOptions } from 'next-auth';

// Providers
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const requestSignIn = async (request?: LoginRequest | ContinueWithProviderRequest) => {
  if (request && 'jwtToken' in request) {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/with-provider`, request);
  }
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, request);
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
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
        const res = await requestSignIn(credentials);
        const user = res.data;

        if (user && user.statusCode === 200) return user;
        return null;
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
    async jwt({ token, user }) {
      if (user && user.statusCode === 200) token.userToken = user.data;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.userToken = token.userToken as Credential;
      return session;
    },
  };

  return NextAuth(req, res, {
    providers,
    pages: {
      signIn: '/auth/sign-in',
      newUser: '/auth/sign-up',
    },
    callbacks,
  });
}
