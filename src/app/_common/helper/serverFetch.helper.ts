import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/_common/utils/nextAuthOptions';

const serverFetch = async (url: string, init?: RequestInit, contentType: 'json' | 'auto' = 'json') => {
  const headerContentType: HeadersInit = contentType === 'json' ? { 'Content-Type': 'application/json' } : {};
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}${url}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${session?.user?.userToken?.accessToken}`,
        ...headerContentType,
        ...init?.headers,
      },
      cache: 'no-store', // TODO: Update to optimize api call in server
      next: {
        ...init?.next,
      },
    });

    if (!response.ok) throw response;

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default serverFetch;
