import Image from 'next/image';

import { Avatar, Box, Typography } from '@mui/material';

import { convertFilePathToUrl } from '@/common/helper/convert';

export type ProjectTaskCommentProps = {
  name: string;
  date: string;
  comment: string;
  image?: string | null;
};

const ProjectTaskComment = ({ name, date, comment, image }: ProjectTaskCommentProps) => {
  return (
    <Box display="flex" alignItems="star">
      <Box marginRight={2}>
        {!image ? (
          <Avatar />
        ) : (
          <Image
            src={convertFilePathToUrl(image)}
            alt="profile"
            height={40}
            width={40}
            style={{ borderRadius: '50%' }}
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
