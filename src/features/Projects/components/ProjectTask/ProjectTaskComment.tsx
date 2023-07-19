import { Avatar, Box, Typography } from '@mui/material';

import { ImageLoader } from '@/common/base';
import { IFileStream } from '@/common/types';

export type ProjectTaskCommentProps = {
  name: string;
  date: string;
  comment: string;
  image?: IFileStream | null;
};

const ProjectTaskComment = ({ name, date, comment, image }: ProjectTaskCommentProps) => {
  return (
    <Box display="flex" alignItems="star">
      <Box marginRight={2}>
        {!image ? (
          <Avatar />
        ) : (
          <ImageLoader
            image={image}
            loaderSize={16}
            disabledReload
            imageProps={{
              alt: 'profile',
              height: 40,
              width: 40,
              style: { borderRadius: '50%' },
            }}
          />
        )}
      </Box>
      <Box>
        <Box display="flex" alignItems="center" marginBottom={1}>
          <Typography variant="body1" fontWeight="bold" marginRight={2}>
            {name}
          </Typography>
          <Typography variant="subtitle2">{date}</Typography>
        </Box>
        <Box>{comment}</Box>
      </Box>
    </Box>
  );
};

export default ProjectTaskComment;
