import { useTableChange } from '@/common/hooks/useTableChange';
import { useLazyGetAllUnreadNotificationQuery, useReadNotificationMutation } from '../store/notification.api.slice';
import { useEffect } from 'react';

const useUnreadNotification = () => {
  const { tableOption, onLimitPage } = useTableChange({ sortBy: 'createdAt|-1' });
  const [getAllUnreadNotification, { data }] = useLazyGetAllUnreadNotificationQuery();
  const [readNotification] = useReadNotificationMutation();

  useEffect(() => {
    getAllUnreadNotification({ params: { ...tableOption } });
  }, [getAllUnreadNotification, tableOption]);

  return {
    content: data?.data ?? { data: [], pagination: { limit: 10, page: 1, total: 0, totalPages: 1 } },
    readNotification,
    onLimitPage,
  };
};

export default useUnreadNotification;
