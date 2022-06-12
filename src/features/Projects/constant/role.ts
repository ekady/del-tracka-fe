import { AutocompleteOptions } from '@/types';

export enum ProjectRoles {
  ADMIN = 'ADMIN',
  MAINTAINER = 'MAINTAINER',
  DEVELEOPER = 'DEVELEOPER',
  SUBMITTER = 'SUBMITTER',
}

export const ProjectRolesArray: AutocompleteOptions[] = Object.values(ProjectRoles).map((role) => ({
  label: role.charAt(0) + role.slice(1).toLowerCase(),
  value: role as string,
}));
