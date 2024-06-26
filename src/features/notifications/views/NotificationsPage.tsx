import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { TFunctionVoid } from '@/common/types';
import NotificationList from '@/features/notifications/components/NotificationList';
import { PageEmpty } from '@/common/base';

import useAllNotification from '@/features/notifications/hooks/useAllNotification';
import useUnreadNotification from '@/features/notifications/hooks/useUnreadNotification';
import { useReadAllNotificationsMutation } from '@/features/notifications/store/notification.api.slice';

const NotificationsPage = () => {
  const unread = useUnreadNotification();
  const all = useAllNotification();

  const [readAllNotification] = useReadAllNotificationsMutation();

  if (all.content.data.length <= 0) {
    return <PageEmpty text="No Notification" />;
  }

  return (
    <>
      {unread.content.data.length > 0 && (
        <>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="bold" fontSize={16}>
              Unread Notifications
            </Typography>
            <Button
              color="primary"
              variant="contained"
              sx={{ textTransform: 'capitalize' }}
              onClick={readAllNotification as TFunctionVoid}
            >
              Mark All As Read
            </Button>
          </Box>
          <NotificationList content={unread.content} onChangePagination={(page) => unread.onLimitPage('page', page)} />
          <Box height={80} />
        </>
      )}

      <Typography fontWeight="bold" fontSize={16}>
        All Notifications
      </Typography>
      <NotificationList content={all.content} onChangePagination={(page) => all.onLimitPage('page', page)} />
    </>
  );
};

export default NotificationsPage;
