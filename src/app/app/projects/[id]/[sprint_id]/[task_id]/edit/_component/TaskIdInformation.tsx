'use client';

import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { copyToClipboard } from '@/app/_common/helper';

interface ITaskIdInformationProps {
  id?: string;
}

const TaskIdInformation = ({ id }: ITaskIdInformationProps) => {
  return (
    <Box marginBottom={3} marginTop={3}>
      <Typography fontWeight="bold">Task Id</Typography>
      <Box display="flex" alignItems="center" justifyContent="flex-start" gap={4}>
        <Typography>#{id ?? '-'}</Typography>
        <IconButton id="demo-positioned-button" aria-haspopup="true" onClick={() => copyToClipboard(`#${id ?? ''}`)}>
          <ContentCopy />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TaskIdInformation;
