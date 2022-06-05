export enum ProjectRoles {
  ADMIN = 'ADMIN',
  MAINTAINER = 'MAINTAINER',
  DEVELEOPER = 'DEVELEOPER',
  SUBMITTER = 'SUBMITTER',
}

// enum ProjectRoles to array
export const ProjectRolesArray = Object.values(ProjectRoles).map((role) => ({
  label: role.charAt(0) + role.slice(1).toLowerCase(),
  value: role,
}));
