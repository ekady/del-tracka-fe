'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@mui/material';

const ButtonRouterBack = () => {
  const router = useRouter();

  return (
    <Button color="primary" variant="contained" size="large" onClick={() => router.replace('/')}>
      Back
    </Button>
  );
};

export default ButtonRouterBack;
