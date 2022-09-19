import { Credential } from '@/common/types';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { CallbacksOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

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
    async jwt({ token, account, user }) {
      if (account) token.accessToken = account.access_token;
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
