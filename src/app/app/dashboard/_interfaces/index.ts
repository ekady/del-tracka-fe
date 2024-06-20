export interface ITaskStatusStatsResponse {
  OPEN: number;
  IN_PROGRESS: number;
  READY_FOR_TEST: number;
  REVIEW: number;
  FAILED: number;
  CLOSED: number;
  HOLD: number;
  [x: string]: number;
}

export interface ITaskProjectResponse {
  totalTask: number;
  totalProject: number;
}

export interface IUserActivitiesStats {
  date: string;
  count: number;
}
