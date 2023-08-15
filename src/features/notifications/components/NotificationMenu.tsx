import { MouseEvent, useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import Circle from '@mui/icons-material/Circle';
import Notifications from '@mui/icons-material/Notifications';
import NotificationsOff from '@mui/icons-material/NotificationsOff';

import { FunctionVoid, FunctionVoidWithParams } from '@/common/types';
import useUnreadNotification from '../hooks/useUnreadNotification';
import { INotificationResponse } from '../interfaces';

const NotificationMenu = () => {
  const router = useRouter();
  const { content, readNotification } = useUnreadNotification();

  const fiveUnreadNotifications = useMemo(() => content.data.filter((_, index) => index < 5) ?? [], [content.data]);

  const handleRedirect = useCallback(
    async (notification: INotificationResponse) => {
      await readNotification({ id: notification.id });
      if (notification.task?.deletedAt || !notification.webUrl) return;

      await router.push(notification.webUrl);
    },
    [readNotification, router],
  ) as FunctionVoidWithParams<INotificationResponse>;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToNotificationPage = useCallback(async () => {
    if (router.pathname !== '/app/notification') await router.push('/app/notification');
  }, [router]) as FunctionVoid;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Badge color="secondary" variant="dot" invisible={!fiveUnreadNotifications.length}>
            <Notifications />
          </Badge>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              padding: 0,
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              maxWidth: '320px',
              width: '100%',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {fiveUnreadNotifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={() => handleRedirect(notification)}
            sx={{ cursor: notification.task?.deletedAt || !notification.webUrl ? 'default' : 'pointer' }}
          >
            <Box display="flex" alignItems="center" gap={1} whiteSpace="normal">
              <Box>
                <Circle color="secondary" sx={{ fontSize: 8 }} />
              </Box>
              <Box>
                <Typography fontSize="14px" fontWeight="bold">
                  {notification.title}
                </Typography>
                <Typography fontSize="12px">{notification.body}</Typography>
              </Box>
            </Box>
          </MenuItem>
        ))}

        {fiveUnreadNotifications.length <= 0 && (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={150} gap={2}>
            <NotificationsOff sx={{ fontSize: 40, color: '#bbb' }} />
            <Typography color="#aaa" fontSize="14px" fontWeight="bold">
              No new notification
            </Typography>
          </Box>
        )}

        <Box marginTop={1}>
          <Button onClick={redirectToNotificationPage} fullWidth>
            See all notification
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationMenu;
