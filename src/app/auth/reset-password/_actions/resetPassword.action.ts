'use server';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IStatusMessageResponse } from '@/app/_common/types';
import { IResetPasswordForm } from '@/app/auth/_interfaces';

export const actionResetPassword = async (
  token: string,
  payload: IResetPasswordForm,
): Promise<IResponseMessage<IStatusMessageResponse>> => {
  try {
    const response = await serverFetch(`/authentication/reset-password?reset-token=${token}`, {
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
    return {
      isError: true,
      isSuccess: false,
      message: (error as Response).statusText ?? 'Something went wrong',
    };
  }
};
