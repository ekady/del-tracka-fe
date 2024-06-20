import { PROFILE_FETCH_TAG } from '@/app/_common/constants/profileAction.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IUserInfoResponse } from '@/app/_common/types';

export const actionFetchProfile = async () => {
  try {
    const response = await serverFetch('/profile', { next: { tags: [PROFILE_FETCH_TAG] } });
    const data: IApiResponse<IUserInfoResponse> = await response.json();
    return data.data;
  } catch (error) {
    return null;
  }
};
