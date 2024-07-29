'use client';

import { useRouter } from 'next/navigation';

import { Box, Button, Typography } from '@mui/material';

import LayoutPlain from '@/app/_common/layout/LayoutPlain';

const CustomError = () => {
  const router = useRouter();

  return (
    <LayoutPlain>
      <Box
        minHeight="90vh"
        height="100%"
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize={48}>Server Error</Typography>
        <Typography fontSize={20}>Something went wrong</Typography>

        <Box my={8} textAlign="center">
          <Button color="primary" variant="contained" size="large" onClick={() => router.replace('/')}>
            Back Home
          </Button>
        </Box>
      </Box>
    </LayoutPlain>
  );
};

export default CustomError;
