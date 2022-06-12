import { Thumbnail } from '@/common/base/FileUploader';
import { AutocompleteOptions } from '@/types';
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
  newestSprint?: number | null;
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
  newestSprint?: number | null;
};

export declare type ProjectSprintIssueDetail = {
  id: string;
  mainProblem: string;
  feature: string;
  reporter: AutocompleteOptions | null;
  assignee?: AutocompleteOptions | null;
  detail?: string;
  level: AutocompleteOptions | null;
  image?: FileIndexable | null;
  imageUrl?: Thumbnail[];
};

export declare type ProjectSprintIssue = ProjectSprintIssueDetail & {
  status: StatusType;
  bugNumber: string;
  dateUpdated: string;
  assigneeAvatar?: string | null;
};

export declare type ProjectSprintInfo = {
  idProject: string;
  projectName: string;
  idSprint: string;
  sprint: string;
};
