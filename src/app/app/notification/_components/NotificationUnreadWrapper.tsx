import { actionFetchUnreadNotifications } from '@/app/_common/actions/notification.action.utils';
import { IParams } from '@/app/_common/types';
import NotificationList from '@/app/app/notification/_components/NotificationList';
import NotificationReadAllButton from '@/app/app/notification/_components/NotificationReadAllButton';

const NotificationUnreadWrapper = async ({ searchParams }: IParams) => {
  const notifications = await actionFetchUnreadNotifications(searchParams ?? {});

  return (
    <>
      {!!notifications?.data?.length && <NotificationReadAllButton />}
      <NotificationList notifications={notifications} />
    </>
  );
};

export default NotificationUnreadWrapper;
