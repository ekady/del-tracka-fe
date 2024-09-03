import { actionFetchAllNotifications } from '@/app/_common/actions/notification.action.utils';
import { IPageParams } from '@/app/_common/types';
import NotificationList from '@/app/app/notification/_components/NotificationList';

const NotificationAllWrapper = async ({ searchParams }: IPageParams) => {
  const notifications = await actionFetchAllNotifications(searchParams ?? {});

  return <NotificationList notifications={notifications} />;
};

export default NotificationAllWrapper;
