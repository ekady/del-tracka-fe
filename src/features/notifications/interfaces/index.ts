import { ActivityType } from '@/features/logs/constants/activityType.constant';

export interface INotificationResponse {
  id: string;
  title: string;
  body: string;
  webUrl: string;
  isRead: boolean;
  createdAt: Date;
  type: ActivityType;
  task?: {
    deletedAt: Date;
  };
}
