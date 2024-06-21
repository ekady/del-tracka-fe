'use client';

import { IErrorToastContainerProps } from '@/app/_common/base/ErrorToastContainer';
import toastError from '@/app/_common/base/ErrorToastContainer/toastError';

const clientFetcher = async (url: string, init?: RequestInit) => {
  try {
    const response = await fetch(`/api${url}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      ...init,
    });

    if (!response.ok) {
      const responseJson = await response.json();
      const errorMessage = responseJson?.errors?.[0]?.message ?? 'Something went wrong';
      const errorType = responseJson?.errors?.[0]?.errorType ?? 'ERROR';

      const toastPayload: IErrorToastContainerProps = {
        message: errorType === 'TOO_MANY_REQUESTS' ? 'Too many requests. Try again later' : errorMessage,
        requestId: response?.headers?.get?.('X-Request-Id'),
      };
      if (errorType === 'TOO_MANY_REQUESTS' || errorType !== 'ACCESS_TOKEN_EXPIRED') {
        toastError(toastPayload);
      }
      throw response;
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default clientFetcher;
