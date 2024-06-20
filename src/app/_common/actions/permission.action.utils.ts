import { MAPPING_MENU } from '@/app/_common/constants/menu.constant';
import { PERMISSION_FETCH_TAG } from '@/app/_common/constants/permissionTag.constant';
import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse, IPermission, IPermissionResponse } from '@/app/_common/types';

export const actionFetchPermissions = async (): Promise<IPermission[]> => {
  try {
    const response = await serverFetch('/permission', { next: { tags: [PERMISSION_FETCH_TAG] } });
    const data: IApiResponse<IPermissionResponse> = await response.json();

    const modifiedResponse = { ...data.data };
    if (modifiedResponse.GUEST) delete modifiedResponse.GUEST;

    const keys = Object.keys(modifiedResponse);
    const values = Object.values(modifiedResponse);

    const result = keys.map((key, index) => ({
      roleName: key,
      permissions: Object.values(values[index]).map((permission) => ({
        ...permission,
        menu: MAPPING_MENU[permission.menu] ?? permission.menu,
      })),
    }));
    return result;
  } catch (error) {
    return [];
  }
};
