'use server';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';
import { ISignUpRequest } from '@/app/auth/_interfaces';

export const actionSignUp = async (payload: ISignUpRequest): Promise<IResponseMessage<IStatusMessageResponse>> => {
  try {
    const response = await serverFetch('/authentication/sign-up', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw response;

    const data: IApiResponse<IStatusMessageResponse> = await response.json();

    return {
      isError: false,
      isSuccess: true,
      message: data?.data?.message,
    };
  } catch (error) {
    const responseError: IResponseError = await (error as Response).json();
    return {
      isError: true,
      isSuccess: false,
      message: responseError?.errors?.[0]?.message ?? 'Something went wrong',
    };
  }
};
