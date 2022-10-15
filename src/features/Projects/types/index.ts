import { Thumbnail } from '@/common/base/FileUploader/interfaces';
import { StatusType } from '@/common/constants/status';
import { IAutocompleteOptions, IRoleResponse, IUserInfo } from '@/common/types';
import { ProjectRoles } from '../constant/role';

export type ProjectRolesType = keyof typeof ProjectRoles;

export interface IProjectRequest {
  name: string;
  description: string;
}

export interface IProjectResponse extends IProjectRequest {
  shortId: string;
  role: string;
  stages: any[];
}

export interface IProjectMember extends IUserInfo {
  role: IRoleResponse;
  createdBy: IUserInfo;
  updatedBy: IUserInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface SprintType {
  id: string;
  name: string;
  open?: number;
  inProgress?: number;
  review?: number;
  close?: number;
  newestSprint?: number | null;
  shortId?: string;
}

export interface IProjectSprintIssueDetail {
  id: string;
  mainProblem: string;
  feature: string;
  reporter: IAutocompleteOptions | null;
  assignee?: IAutocompleteOptions | null;
  detail?: string;
  level: IAutocompleteOptions | null;
  images?: (File | Thumbnail)[] | null;
  imageUrls?: Thumbnail[];
}

export interface IProjectSprintIssue extends IProjectSprintIssueDetail {
  status: StatusType;
  bugNumber: string;
  dateUpdated: string;
  assigneeAvatar?: string | null;
}

export interface ProjectSprintInfo {
  idProject: string;
  projectName: string;
  idSprint: string;
  sprint: string;
}

export interface IProjectMemberAddRequest {
  email: string;
  roleName: string;
}

export interface IProjectMemberUpdateRequest {
  userId: string;
  roleName: string;
}

export interface IProjectSettingRequest<BodyType, IdType = string> {
  id: IdType;
  body: BodyType;
}
