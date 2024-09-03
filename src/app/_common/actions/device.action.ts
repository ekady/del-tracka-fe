'use server';

import { IResponseMessage } from '@/app/_common/constants/responseMessage.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IResponseError, IStatusMessageResponse } from '@/app/_common/types';

export const actionRegisterDevice = async (deviceId: string): Promise<IResponseMessage> => {
  try {
    const response = await serverFetch('/user/device', { method: 'post', body: JSON.stringify({ deviceId }) });
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
      message: responseError?.errors?.[0]?.message?.toString() ?? 'Something went wrong',
    };
  }
};
