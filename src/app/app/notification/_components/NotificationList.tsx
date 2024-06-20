'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import Circle from '@mui/icons-material/Circle';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { actionReadNotification } from '@/app/_common/actions/notification.action';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IPaginationResponse, TFunctionVoidWithParams } from '@/app/_common/types';
import { INotificationResponse } from '@/app/_common/types/notification.type';

export interface INotificationListProps {
  notifications: IPaginationResponse<INotificationResponse> | null;
}

const NotificationList = ({ notifications }: INotificationListProps) => {
  const router = useRouter();

  const { onPaginationChange } = useTableChange();

  const handleRedirect = useCallback(
    async (notification: INotificationResponse) => {
      if (!notification.isRead) await actionReadNotification(notification.id);
      if (notification.task?.deletedAt || !notification.webUrl) return;

      router.push(notification.webUrl);
    },
    [router],
  ) as TFunctionVoidWithParams<INotificationResponse>;

  return (
    <Box marginLeft={-2}>
      {!notifications?.data?.length && (
        <Paper elevation={0} sx={{ py: 5, textAlign: 'center' }}>
          No new notification
        </Paper>
      )}

      {notifications?.data?.map((notification) => (
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
                {dayjs(notification.createdAt).format('MM/DD/YYYY, HH:mm:ss a')}
              </Typography>
              <Typography fontSize="12px">{notification.body}</Typography>
            </Box>
          </Box>
        </MenuItem>
      ))}

      <Box height={20} />

      {!!notifications?.data?.length && (
        <Box display="flex" justifyContent="center">
          <Pagination
            count={notifications?.pagination?.totalPages}
            page={notifications?.pagination?.page || 1}
            onChange={(_, page) => onPaginationChange({ page: page - 1, pageSize: 10 })}
          />
        </Box>
      )}
    </Box>
  );
};

export default NotificationList;
