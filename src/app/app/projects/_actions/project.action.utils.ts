'use server';

import { notFound } from 'next/navigation';

import serverFetch from '@/app/_common/helper/serverFetch.helper';
import { IApiResponse } from '@/app/_common/types';
import { ProjectMenu } from '@/app/app/projects/_constant/projectMenu.constant';
import { PROJECT_FETCH_TAG, PROJECT_LIST_FETCH_TAG } from '@/app/app/projects/_constant/projectTag.constant';
import { IProjectPermission, IProjectResponse, IProjectWithPermissions } from '@/app/app/projects/_interfaces';

export const actionFetchProjectList = async (): Promise<IProjectWithPermissions[]> => {
  try {
    const response = await serverFetch('/project', { next: { tags: [PROJECT_LIST_FETCH_TAG] } });
    const data: IApiResponse<IProjectResponse[]> = await response.json();
    const transformResponse: IProjectWithPermissions[] =
      data?.data?.map((data) => ({
        id: data?._id,
        name: data?.name,
        description: data?.description,
        shortId: data?.shortId,
        role: data?.role,
        stages: data?.stages,
        rolePermissions:
          data?.rolePermissions?.reduce(
            (acc, role) => ({
              ...acc,
              [role.menu]: {
                create: role?.create,
                read: role?.read,
                update: role?.update,
                delete: role?.delete,
              },
            }),
            {} as Record<ProjectMenu, Omit<IProjectPermission, 'menu'>>,
          ) ?? {},
      })) ?? [];
    return transformResponse;
  } catch {
    return [];
  }
};

export const actionFetchProject = async (id: string): Promise<IProjectWithPermissions | null> => {
  try {
    const response = await serverFetch(`/project/${id}`, { next: { tags: [`${PROJECT_FETCH_TAG}-${id}`] } });
    const data: IApiResponse<IProjectResponse> = await response.json();
    const transformResponse: IProjectWithPermissions = {
      id: data?.data?._id,
      name: data?.data?.name,
      description: data?.data?.description,
      shortId: data?.data?.shortId,
      role: data?.data?.role,
      stages: data?.data?.stages,
      rolePermissions:
        data?.data?.rolePermissions?.reduce(
          (acc, role) => ({
            ...acc,
            [role.menu]: { create: role.create, read: role.read, update: role.update, delete: role.delete },
          }),
          {} as Record<ProjectMenu, Omit<IProjectPermission, 'menu'>>,
        ) ?? {},
    };
    return transformResponse;
  } catch {
    notFound();
  }
};
