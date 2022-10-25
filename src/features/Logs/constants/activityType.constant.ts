import { ILogsResponse } from '../store/logs.api.slice';

export type ActivityType =
  | 'CREATE_STAGE'
  | 'UPDATE_STAGE'
  | 'DELETE_STAGE'
  | 'CREATE_TASK'
  | 'UPDATE_TASK'
  | 'UPDATE_TASK_STATUS'
  | 'DELETE_TASK'
  | 'CREATE_COMMENT';

export const ActivityMessage: Record<ActivityType, (data: ILogsResponse) => string> = {
  CREATE_STAGE: (data) =>
    '{name} created a new sprint, {sprint}'
      .replace('{name}', `${data.createdBy.firstName} ${data.createdBy.lastName}`)
      .replace('{sprint}', data.stageAfter.name),
  UPDATE_STAGE: (data) =>
    '{name} has updated a sprint, {sprint}'
      .replace('{name}', `${data.createdBy.firstName} ${data.createdBy.lastName}`)
      .replace('{sprint}', data.stageAfter.name),
  DELETE_STAGE: (data) =>
    '{name} has deleted a sprint, {sprint}'
      .replace('{name}', `${data.createdBy.firstName} ${data.createdBy.lastName}`)
      .replace('{sprint}', data.stageAfter.name),
  CREATE_TASK: (data) =>
    '{name} has created a new task {task}'
      .replace('{name}', `${data.createdBy.firstName} ${data.createdBy.lastName}`)
      .replace('{task}', data.stageAfter.name),
  UPDATE_TASK: (data) =>
    '{name} has updated task {task}'
      .replace('{name}', `${data.createdBy.firstName} ${data.createdBy.lastName}`)
      .replace('{task}', data.stageAfter.name),
  UPDATE_TASK_STATUS: (data) =>
    '{name} has updated status taks {task} to {status}'
      .replace('{name}', `${data.createdBy.firstName} ${data.createdBy.lastName}`)
      .replace('{task}', data.stageAfter.name)
      .replace('{status}', data.stageAfter.name),
  DELETE_TASK: (data) =>
    '{name} has deleted task {task}'
      .replace('{name}', `${data.createdBy.firstName} ${data.createdBy.lastName}`)
      .replace('{task}', data.stageAfter.name),
  CREATE_COMMENT: (data) =>
    '{name} has commented on task {task}'
      .replace('{name}', `${data.createdBy.firstName} ${data.createdBy.lastName}`)
      .replace('{task}', data.stageAfter.name),
};
