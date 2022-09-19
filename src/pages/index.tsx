// React
import { ReactElement, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Components
import { LayoutPlain } from '../common/layout';

import { Box, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';

const EntryPoint = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.data && session.data.user.userToken) {
      router.replace('/app/dashboard');
    } else {
      router.replace('/home');
    }
  }, [session, router]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100%" marginTop={5}>
      <CircularProgress />
    </Box>
  );
};

EntryPoint.getLayout = (page: ReactElement) => {
  return <LayoutPlain>{page}</LayoutPlain>;
};

export default EntryPoint;
