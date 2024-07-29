import Link from 'next/link';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinkMui from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const AuthResetInvalid = () => (
  <Box>
    <Typography variant="h6" textAlign="center">
      Token invalid or expired
    </Typography>
    <Box height={40} />
    <Box marginTop={2} textAlign="center">
      <Typography variant="subtitle1">Still want to reset your password? </Typography>
      <Link href="/auth/forgot-password">
        <LinkMui>Click Here</LinkMui>
      </Link>
      <Box height={20} />
      <Button LinkComponent={Link} href="/auth/sign-in" fullWidth variant="text" sx={{ mb: 2, textAlign: 'center' }}>
        Back to Sign In
      </Button>
    </Box>
  </Box>
);

export default AuthResetInvalid;
