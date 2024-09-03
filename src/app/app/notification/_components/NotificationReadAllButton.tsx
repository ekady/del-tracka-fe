'use client';

import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

import { actionReadAllNotification } from '@/app/_common/actions/notification.action';

const NotificationReadAllButton = () => {
  const [loading, setLoading] = useState(false);

  const readAllNotification = async () => {
    setLoading(true);
    try {
      await actionReadAllNotification();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box my={2}>
      <LoadingButton variant="contained" onClick={readAllNotification} loading={loading}>
        Read All
      </LoadingButton>
    </Box>
  );
};

export default NotificationReadAllButton;
