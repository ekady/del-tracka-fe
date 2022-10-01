import { Thumbnail } from '@/common/base/FileUploader/interfaces';
import { StatusType } from '@/common/constants/status';
import { AutocompleteOptions } from '@/common/types';
import { ProjectRoles } from '../constant/role';

export type ProjectRolesType = keyof typeof ProjectRoles;

export type ProjectMember = {
  id: string;
  name: string;
  dateAdded: string;
  addedBy: string;
  role: string;
  roleName: string;
};

export type SprintType = {
  id: string;
  name: string;
  open?: number;
  inProgress?: number;
  review?: number;
  close?: number;
  newestSprint?: number | null;
};

export type ProjectRequest = {
  name: string;
  description: string;
};

export type ProjectResponse = ProjectRequest & {
  id: string;
  sprints: SprintType[];
  asRole: ProjectRolesType;
  totalOpen?: number;
  totalInProgress?: number;
  totalReview?: number;
  totalClose?: number;
  newestSprint?: number | null;
};

export type ProjectSprintIssueDetail = {
  id: string;
  mainProblem: string;
  feature: string;
  reporter: AutocompleteOptions | null;
  assignee?: AutocompleteOptions | null;
  detail?: string;
  level: AutocompleteOptions | null;
  images?: (File | Thumbnail)[] | null;
  imageUrls?: Thumbnail[];
};

export type ProjectSprintIssue = ProjectSprintIssueDetail & {
  status: StatusType;
  bugNumber: string;
  dateUpdated: string;
  assigneeAvatar?: string | null;
};

export type ProjectSprintInfo = {
  idProject: string;
  projectName: string;
  idSprint: string;
  sprint: string;
};
