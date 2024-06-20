import { Box, Typography } from '@mui/material';

import ButtonRouterBack from '@/app/_common/base/ButtonRouterBack';
import LayoutPlain from '@/app/_common/layout/LayoutPlain';

const Custom404 = () => {
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
        <Typography fontSize={48}>404</Typography>
        <Typography fontSize={20}>No Data Found</Typography>

        <Box my={8} textAlign="center">
          <ButtonRouterBack />
        </Box>
      </Box>
    </LayoutPlain>
  );
};

export default Custom404;
