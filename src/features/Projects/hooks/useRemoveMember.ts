import { useCallback } from 'react';
import { useRouter } from 'next/router';

import { useGetProfileQuery } from '@/common/store/api.slice';
import { useLeaveProjectMutation, useRemoveMemberMutation } from '../store/member.api.slice';

import { toast } from 'react-toastify';

import { IProjectMember } from '../types';
import { FunctionVoid, IApiResponse, IStatusMessageResponse } from '@/common/types';

export const useRemoveMember = (projectId: string) => {
  const router = useRouter();
  const { data: profileData } = useGetProfileQuery();
  const [deleteMember, { isLoading: isLoadingDelete }] = useRemoveMemberMutation();
  const [leave, { isLoading: isLoadingLeave }] = useLeaveProjectMutation();

  const deleteLeaveMember = useCallback(
    async (data: IProjectMember, callbackSuccess?: FunctionVoid) => {
      let res: { data: IApiResponse<IStatusMessageResponse> } | { error: unknown }, message: string;
      if (data._id === profileData?.data?._id) {
        res = await leave({ id: projectId, body: undefined });
        message = 'left this project';
      } else {
        res = await deleteMember({ id: projectId, body: { userId: data._id || '' } });
        message = 'deleted a member';
      }

      if ('data' in res && 'data' in res.data && res.data.data) {
        toast.success(`You have successfully ${message}`);
        callbackSuccess && callbackSuccess();
        if (message.includes('left')) router.replace('/app/projects');
      }
    },
    [deleteMember, leave, profileData?.data?._id, projectId, router],
  );

  return { loading: isLoadingDelete || isLoadingLeave, deleteLeaveMember, profileData };
};
