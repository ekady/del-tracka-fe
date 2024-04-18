import { useTableChange } from '@/common/hooks/useTableChange';
import { useGetAllUnreadNotificationQuery, useReadNotificationMutation } from '../store/notification.api.slice';

const useUnreadNotification = () => {
  const { tableOption, onLimitPage } = useTableChange({ sortBy: 'createdAt|-1' });
  const { data } = useGetAllUnreadNotificationQuery({ params: tableOption });
  const [readNotification] = useReadNotificationMutation();

  return {
    content: data?.data ?? { data: [], pagination: { limit: 10, page: 1, total: 0, totalPages: 1 } },
    readNotification,
    onLimitPage,
  };
};

export default useUnreadNotification;
