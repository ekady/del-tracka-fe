import { Thumbnail } from '@/common/base/FileUploader/interfaces';
import { LevelType } from '@/common/constants/level';
import { StatusType } from '@/common/constants/status';
import { IAutocompleteOptions, IRoleResponse, IUserInfo } from '@/common/types';

export interface ITasksCount {
  OPEN?: number;
  IN_PROGRESS?: number;
  CLOSED?: number;
  REVIEW?: number;
}

export interface IProject {
  _id: number;
  name: string;
  description: string;
  shortId: string;
}

export interface IProjectRequest {
  id?: string;
  name: string;
  description: string;
}

export interface IProjectResponse extends IProjectRequest {
  shortId: string;
  role: string;
  stages: ISprintResponse[];
}

export interface IProjectMember extends IUserInfo {
  role: IRoleResponse;
  createdBy: IUserInfo;
  updatedBy: IUserInfo;
  createdAt: Date;
  updatedAt: Date;
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

export interface ISprint {
  _id: number;
  name: string;
  description: string;
  shortId: string;
}

export interface ISprintResponse {
  _id: string;
  name: string;
  description: string;
  shortId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISprintsResponse extends ISprintResponse {
  tasks: ITasksCount;
}

export interface IStatsResponse {
  name: string;
  count: number;
}

export interface IProjectTaskResponse {
  id: string;
  name: string;
  tasks: ITasksCount;
}

export interface ITaskResponse {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  detail: string;
  feature: string;
  assignee: IUserInfo;
  reporter: IUserInfo;
  images: string[];
  status: StatusType;
  priority: LevelType;
  shortId: string;
  project: IProject;
  stage: ISprint;
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
