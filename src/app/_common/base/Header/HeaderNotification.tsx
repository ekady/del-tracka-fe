'use client';

import { MouseEvent, useCallback, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import Circle from '@mui/icons-material/Circle';
import Notifications from '@mui/icons-material/Notifications';
import NotificationsOff from '@mui/icons-material/NotificationsOff';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { actionReadNotification } from '@/app/_common/actions/notification.action';
import { TFunctionVoidWithParams } from '@/app/_common/types';
import { INotificationResponse } from '@/app/_common/types/notification.type';

interface IHeaderNotificationProps {
  notifications: INotificationResponse[];
}

const HeaderNotification = ({ notifications }: IHeaderNotificationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRedirect = useCallback(
    async (notification: INotificationResponse) => {
      await actionReadNotification(notification.id);
      if (notification.task?.deletedAt || !notification.webUrl) return;

      router.push(notification.webUrl);
    },
    [router],
  ) as TFunctionVoidWithParams<INotificationResponse>;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const redirectToNotificationPage = useCallback(() => {
    if (pathname !== '/app/notification') router.push('/app/notification');
  }, [pathname, router]);

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
          <Badge color="secondary" variant="dot" invisible={!notifications.length}>
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
        {notifications.map((notification) => (
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

        {notifications.length <= 0 && (
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

export default HeaderNotification;
