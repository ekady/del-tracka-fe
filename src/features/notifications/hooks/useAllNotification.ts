import { useTableChange } from '@/common/hooks/useTableChange';
import { useLazyGetAllNotificationsQuery, useReadAllNotificationsMutation } from '../store/notification.api.slice';
import { useEffect } from 'react';

const useAllNotification = () => {
  const { tableOption, onLimitPage } = useTableChange({ sortBy: 'createdAt|-1' });
  const [getAllNotifications, { data }] = useLazyGetAllNotificationsQuery();
  const [readAllNotification] = useReadAllNotificationsMutation();

  useEffect(() => {
    getAllNotifications({ params: { ...tableOption } });
  }, [getAllNotifications, tableOption]);

  return {
    content: data?.data ?? { data: [], pagination: { limit: 10, page: 1, total: 0, totalPages: 1 } },
    readAllNotification,
    onLimitPage,
  };
};

export default useAllNotification;
