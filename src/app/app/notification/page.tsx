import { Metadata } from 'next';

import Link from 'next/link';

import { Box, Button, ButtonGroup } from '@mui/material';

import { IPageParams } from '@/app/_common/types';
import NotificationAllWrapper from '@/app/app/notification/_components/NotificationAllWrapper';
import NotificationUnreadWrapper from '@/app/app/notification/_components/NotificationUnreadWrapper';

export const metadata: Metadata = {
  title: 'Notification',
};

const NotificationPage = async ({ searchParams }: IPageParams) => {
  const isUnreadSection = searchParams?.section === 'unread';

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined primary button group">
          <Button variant={!isUnreadSection ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=all">
            All
          </Button>
          <Button variant={isUnreadSection ? 'contained' : 'outlined'} LinkComponent={Link} href="?section=unread">
            Unread
          </Button>
        </ButtonGroup>
      </Box>

      {isUnreadSection ? (
        <NotificationUnreadWrapper searchParams={searchParams} />
      ) : (
        <NotificationAllWrapper searchParams={searchParams} />
      )}
    </>
  );
};

export default NotificationPage;
