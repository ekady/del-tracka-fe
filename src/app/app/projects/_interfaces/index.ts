import { TLevelType } from '@/app/_common/constants/level.constant';
import { TStatusType } from '@/app/_common/constants/status.constant';
import { IAutocompleteOptions, IFileStream, IRoleResponse, IUserInfoResponse } from '@/app/_common/types';
import { TActivityType } from '@/app/app/projects/_constant/activityType.constant';

import { ProjectMenu } from '../_constant/projectMenu.constant';

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
  _id: number | string;
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

export interface ITask {
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
  dueDate?: Date | null;
  shortId?: string;
  status?: string;
}

export interface ITaskDetail extends ITask {
  status: TStatusType;
  bugNumber: string;
  dateUpdated: string;
  assigneeAvatar?: string | null;
}

export interface ITaskForm {
  _id?: string;
  shortId?: string;
  title: string;
  feature: string;
  reporter: IProjectMember | null;
  assignee: IProjectMember | null;
  priority: IAutocompleteOptions | null;
  status: IAutocompleteOptions | null;
  dueDate: Date | null;
  detail: string;
  images: (File | IFileStream)[] | null;
}

export interface ITaskResponse {
  _id: string;
  title: string;
  feature: string;
  reporter: IProjectMember | null;
  assignee?: IProjectMember | null;
  detail?: string;
  images?: (File | IFileStream)[] | null;
  imageUrls?: IFileStream[];
  project?: IProject;
  stage?: ISprint;
  dueDate?: Date | null;
  shortId?: string;
  priority: TLevelType | null;
  status?: TStatusType;
  bugNumber?: string;
  dateUpdated?: string;
  assigneeAvatar?: string | null;
  permissions?: IProjectPermission;
}

export interface ITaskComment {
  _id: string;
  createdAt: string;
  comment: string;
  task: Omit<ITaskResponse, 'assignee' | 'reporter' | 'images' | 'createdAt' | 'updatedAt' | 'project' | 'stage'>;
  user: IUserInfoResponse;
}

export interface ITaskCommentRequest {
  comment: string;
}

export interface IProjectActivityResponse {
  _id: string;
  createdAt: string;
  createdBy: { _id: string; firstName: string; lastName: string };
  project: string;
  stageBefore: { _id: string; name: string; description: string; shortId: string };
  stageAfter: { _id: string; name: string; description: string; shortId: string };
  taskAfter: { _id: string; title: string; feature: string; priority: string; status: string; shortId: string };
  taskBefore: { _id: string; title: string; feature: string; priority: string; status: string; shortId: string };
  type: TActivityType;
}
