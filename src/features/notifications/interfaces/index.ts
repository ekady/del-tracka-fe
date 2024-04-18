import { TActivityType } from '@/features/logs/constants/activityType.constant';

export interface INotificationResponse {
  id: string;
  title: string;
  body: string;
  webUrl: string;
  isRead: boolean;
  createdAt: Date;
  type: TActivityType;
  task?: {
    deletedAt: Date;
  };
}
