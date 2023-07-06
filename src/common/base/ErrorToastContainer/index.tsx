import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { copyToClipboard } from '@/common/helper';

export interface ErrorToastContainerProps {
  message: string;
  requestId?: string;
}

const ErrorToastContainer = ({ message, requestId }: ErrorToastContainerProps) => (
  <Box>
    <Typography>{message}</Typography>
    {requestId && (
      <Box display="flex" alignItems="center" gap={1} mt={1} fontSize="12px">
        <Typography fontSize="12px">Trace Id: {requestId}</Typography>
        <IconButton onClick={() => copyToClipboard(requestId)} size="small">
          <ContentCopy sx={{ color: 'white', fontSize: '12px' }} />
        </IconButton>
      </Box>
    )}
  </Box>
);

export default ErrorToastContainer;
