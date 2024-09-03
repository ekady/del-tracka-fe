import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse } from '@/app/_common/types';
import { PROJECT_MEMBER_FETCH_TAG } from '@/app/app/projects/[id]/member/_constants/projectMemberTag.constant';
import { IProjectMember } from '@/app/app/projects/_interfaces';

export const actionFetchProjectMember = async (id: string): Promise<IProjectMember[]> => {
  try {
    const response = await serverFetch(`/project/${id}/member`, {
      next: { tags: [`${PROJECT_MEMBER_FETCH_TAG}-${id}`] },
    });
    const data: IApiResponse<IProjectMember[]> = await response.json();
    return data.data;
  } catch {
    return [];
  }
};
