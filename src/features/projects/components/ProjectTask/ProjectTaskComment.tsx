import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

import { ImageLoader } from '@/common/base';
import { IFileStream } from '@/common/types';

export interface IProjectTaskCommentProps {
  name: string;
  date: string;
  comment: string;
  image?: IFileStream | string | null;
}

const ProjectTaskComment = ({ name, date, comment, image }: IProjectTaskCommentProps) => {
  const profilePicture =
    typeof image === 'string' ? (
      <Image src={image} alt="profile" height={24} width={24} style={{ borderRadius: '50%' }} />
    ) : (
      image && (
        <ImageLoader
          image={image}
          loaderSize={16}
          disabledReload
          brokenSize={40}
          imageProps={{
            alt: 'profile',
            height: 40,
            width: 40,
            style: { borderRadius: '50%' },
          }}
        />
      )
    );
  return (
    <Box display="flex" alignItems="star">
      <Box marginRight={2}>{!image ? <Avatar /> : profilePicture}</Box>
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
