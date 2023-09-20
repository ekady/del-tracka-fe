import { ActivityType } from '../constants/activityType.constant';

export interface ILogsResponse {
  _id: string;
  createdAt: string;
  createdBy: { _id: string; firstName: string; lastName: string };
  project: { _id: string; name: string; description: string; shortId: string };
  stageBefore: { _id: string; name: string; description: string; shortId: string };
  stageAfter: { _id: string; name: string; description: string; shortId: string };
  taskAfter: { _id: string; title: string; feature: string; priority: string; status: string; shortId: string };
  taskBefore: { _id: string; title: string; feature: string; priority: string; status: string; shortId: string };
  type: ActivityType;
}
