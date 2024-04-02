import { TLevelType } from '@/common/constants/level';
import { TStatusType } from '@/common/constants/status';
import { IAutocompleteOptions, IFileStream, IRoleResponse, IUserInfoResponse } from '@/common/types';
import { ProjectMenu } from '../constant/projectMenu';

export interface ITasksCount {
  OPEN?: number;
  IN_PROGRESS?: number;
  CLOSED?: number;
  REVIEW?: number;
  READY_FOR_TEST?: number;
  HOLD?: number;
  FAILED?: number;
}

export interface IProject {
  _id: number;
  name: string;
  description: string;
  shortId: string;
}

export interface IProjectRequest {
  id?: string;
  _id?: string;
  name: string;
  description: string;
}

export interface IProjectPermission {
  menu: ProjectMenu;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface IProjectResponse extends IProjectRequest {
  shortId: string;
  role: string;
  stages: ISprintResponse[];
  rolePermissions: IProjectPermission[];
}

export interface IProjectWithPermissions extends IProjectRequest {
  shortId: string;
  role: string;
  stages: ISprintResponse[];
  rolePermissions: Record<ProjectMenu, Omit<IProjectPermission, 'menu'>>;
}

export interface IProjectMember extends IUserInfoResponse {
  role: IRoleResponse;
  createdBy: IUserInfoResponse;
  updatedBy: IUserInfoResponse;
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
  project?: IProject;
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
  assignee: IUserInfoResponse;
  reporter: IUserInfoResponse;
  images: IFileStream[];
  status: TStatusType;
  priority: TLevelType;
  shortId: string;
  project: IProject;
  stage: ISprint;
  dueDate?: Date | null;
  permissions?: IProjectPermission;
  name?: string;
}

export interface ITaskStatusUpdateRequest {
  status: string;
}

export interface ITaskStatusUpdateBulkRequest extends ITaskStatusUpdateRequest {
  taskIds: string[];
}

export interface ITaskMoveStageRequest {
  stageId: string;
  taskIds: string[];
}

export interface IProjectSprintTaskDetail {
  _id: string;
  title: string;
  feature: string;
  reporter: IProjectMember | null;
  assignee?: IProjectMember | null;
  detail?: string;
  priority: IAutocompleteOptions | null;
  images?: (File | IFileStream)[] | null;
  imageUrls?: IFileStream[];
  project?: IProject;
  stage?: ISprint;
  name?: string;
  dueDate?: Date | null;
  shortId?: string;
}

export interface IProjectSprintTask extends IProjectSprintTaskDetail {
  status: TStatusType;
  bugNumber: string;
  dateUpdated: string;
  assigneeAvatar?: string | null;
}

export interface IProjectComment {
  _id: string;
  createdAt: string;
  comment: string;
  task: Omit<ITaskResponse, 'assignee' | 'reporter' | 'images' | 'createdAt' | 'updatedAt' | 'project' | 'stage'>;
  user: IUserInfoResponse;
}

export interface IProjectCommentRequest {
  comment: string;
}
