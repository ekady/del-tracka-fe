import { ProjectRoles } from './constant/role';

export declare type ProjectRolesType = keyof typeof ProjectRoles;

export type ProjectMember = {
  id: string;
  name: string;
  dateAdded: string;
  addedBy: string;
  role: string;
  roleName: string;
};

export declare type SprintType = {
  id: string;
  name: string;
  open?: number;
  inProgress?: number;
  review?: number;
  close?: number;
};

export declare type ProjectRequest = {
  name: string;
  description: string;
};

export declare type ProjectResponse = ProjectRequest & {
  id: string;
  sprints: SprintType[];
  asRole: ProjectRolesType;
  totalOpen?: number;
  totalInProgress?: number;
  totalReview?: number;
  totalClose?: number;
};
