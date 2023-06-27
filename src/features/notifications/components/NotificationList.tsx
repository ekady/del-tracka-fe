import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { Box, MenuItem, Pagination, Typography } from '@mui/material';
import { Circle } from '@mui/icons-material';

import { FunctionVoidWithParams, IPaginationResponse } from '@/common/types';
import { INotificationResponse } from '../interfaces';
import { useReadNotificationMutation } from '../store/notification.api.slice';

export interface INotificationListProps {
  content: IPaginationResponse<INotificationResponse>;
  onChangePagination?: FunctionVoidWithParams<number>;
}

const NotificationList = ({ content, onChangePagination }: INotificationListProps) => {
  const router = useRouter();

  const [readNotification] = useReadNotificationMutation();

  const handleRedirect = useCallback(
    async (notification: INotificationResponse) => {
      if (!notification.isRead) await readNotification({ id: notification.id });
      if (notification.task?.deletedAt || !notification.webUrl) return;

      await router.push(notification.webUrl);
    },
    [readNotification, router],
  ) as FunctionVoidWithParams<INotificationResponse>;
  return (
    <Box marginLeft={-2}>
      {content.data.map((notification) => (
        <MenuItem
          key={notification.id}
          onClick={() => handleRedirect(notification)}
          sx={{ my: 1, cursor: notification.task?.deletedAt || !notification.webUrl ? 'default' : 'pointer' }}
        >
          <Box display="flex" alignItems="center" gap={1} whiteSpace="normal">
            <Box>
              <Circle color="secondary" sx={{ fontSize: 8, visibility: notification.isRead ? 'hidden' : 'visible' }} />
            </Box>
            <Box>
              <Typography fontSize="14px" fontWeight="bold">
                {notification.title}
              </Typography>
              <Typography fontSize="10px" my={1}>
                {new Date(notification.createdAt).toLocaleString()}
              </Typography>
              <Typography fontSize="12px">{notification.body}</Typography>
            </Box>
          </Box>
        </MenuItem>
      ))}

      <Box height={20} />

      <Box display="flex" justifyContent="center">
        <Pagination
          count={content.pagination.totalPages}
          page={content.pagination.page ? content.pagination.page : 1}
          onChange={(_, page) => onChangePagination?.(page)}
        />
      </Box>
    </Box>
  );
};

export default NotificationList;
