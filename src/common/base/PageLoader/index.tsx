import { Box, CircularProgress } from '@mui/material';

const PageLoader = () => (
  <Box display="flex" alignItems="center" justifyContent="center" height="100%" minHeight="300px">
    <CircularProgress />
  </Box>
);

export default PageLoader;
