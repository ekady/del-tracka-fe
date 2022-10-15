import { IAutocompleteOptions } from '@/common/types';

export enum ProjectRoles {
  OWNER = 'OWNER',
  MAINTAINER = 'MAINTAINER',
  DEVELOPER = 'DEVELOPER',
  SUBMITTER = 'SUBMITTER',
}

export const ProjectRolesArray: IAutocompleteOptions[] = Object.values(ProjectRoles).map((role) => ({
  label: role.charAt(0) + role.slice(1).toLowerCase(),
  value: role as string,
}));
