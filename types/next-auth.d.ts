import { DefaultSession } from 'next-auth';

import { ICredential } from '@/app/_common/types';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      userToken: ICredential;
    } & DefaultSession;
    error?: string;
    accessToken: string;
  }

  interface User {
    statusCode: number;
    data: ICredential;
  }
}
